import * as tencentClient from 'tencentcloud-sdk-nodejs-asr';
import fs from 'fs';
import path from 'path';

export async function generateSRT(audioFilePath: string, engineModelType: string = "16k_en") {
  const client = new tencentClient.asr.v20190614.Client({
    credential: {
      secretId: process.env.TENCENTCLOUD_SECRET_ID!,
      secretKey: process.env.TENCENTCLOUD_SECRET_KEY!,
    },
    region: "ap-shanghai",
    profile: {
      httpProfile: {
        endpoint: "asr.tencentcloudapi.com",
      },
    },
  });

  const audioData = await fs.readFileSync(audioFilePath);

  //audio length must less than 5MB
  if (audioData.length > 5 * 1024 * 1024) {
    throw new Error("Audio file size exceeds 5MB limit");
  }

  const params = {
    "EngineModelType": engineModelType, // 中文 16k_zh，英文 16k_en
    "ChannelNum": 1,
    "ResTextFormat": 2, // 1 代表返回带时间戳的文本
    "SourceType": 1,
    "Data": audioData.toString('base64'),
    "DataLen": audioData.length,
  };

  const data = await client.CreateRecTask(params);
  const taskId = data.Data.TaskId;

  let result;
  while (true) {
    result = await client.DescribeTaskStatus({ TaskId: taskId });
    if (result.Data.Status === 2) { // 任务完成
      break;
    } else if (result.Data.Status === 3) { // 任务失败
      throw new Error("Transcription task failed");
    }
    await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒后重试
  }

  const textResult = result.Data.Result;

  /**
   * [0:1.300,0:2.660]  A.
   * [0:2.660,0:4.980]  School subjects.
   * [0:4.980,0:7.640]  Viewing and listening.
   * [0:8.820,0:14.020]  Lisa green goes to a middle school in London.
   * [0:14.180,0:17.280]  This is her timetable.
   * [0:18.760,0:22.440]  A two listen and think.
   * [0:23.700,0:26.180]  Time for class.
   * [0:26.700,0:30.320]  What lesson is Lisa having?
   * [0:40.000,0:44.000]  Let's do some exercises. Here we go.
   * [0:44.000,0:48.000]  Put your hands on your head. Turn left and right.
   * [0:48.000,0:50.200]  Do this eight times.
   */

    const lines = textResult.split('\n');
    let srt = '';
    let index = 1;
    for (const line of lines) {
        const match = line.match(/\[(\d+):(\d+\.\d+),(\d+):(\d+\.\d+)\]\s+(.*)/);
        if (match) {
            const startTime = "00:" + match[1] + ':' + match[2];
            const endTime = "00:" + match[3] + ':' + match[4];
            const text = match[5].trim();

            srt += `${index}\n`;
            srt += `${startTime} --> ${endTime}\n`;
            srt += `${text}\n\n`;
            index++;
        }
    }

  return srt;
}

function walkDirSync(dir, fileList = []) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            walkDirSync(fullPath, fileList);
        } else {
            fileList.push(fullPath);
        }
    }

    return fileList;
}

const files = walkDirSync(process.env.TARGET_AUDIO_DIR);

for (const filePath of files) {
    if (filePath.endsWith('.mp3')) {
        // if .srt already exists, skip
        const srtPath = filePath.replace('.mp3', '.srt');
        if (fs.existsSync(srtPath)) {
            console.log(`SRT already exists for ${path.basename(filePath)}, skipping.`);
            continue;
        }
        generateSRT(filePath).then(srt => {
            fs.writeFileSync(srtPath, srt);
            console.log(`Generated SRT for ${path.basename(filePath)}`);
        }).catch(err => {
            console.error(`Error processing ${path.basename(filePath)}:`, err);
        });
    }
}
