import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { Subtitle, AudioPlayerProps } from "../types/subtitles";
import { Rewind, Play, Pause, FastForward } from "lucide-react";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, subtitles }) => {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [currentSegment, setCurrentSegment] = useState<Subtitle | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const subtitleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 初始化 WaveSurfer
  useEffect(() => {
    if (!waveformRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#3b82f6", // 蓝色进度条
      cursorColor: "#111",
      height: 80,
      interact: true,
    });

    ws.load(audioSrc);

    // 音频加载完成
    ws.on("ready", () => {
      setDuration(ws.getDuration());
    });

    // 播放进度更新
    ws.on("audioprocess", (t) => {
      setCurrentTime(t);

      const seg = subtitles.find((s) => t >= s.start && t < s.end);
      if (seg && seg.id !== currentSegment?.id) {
        setCurrentSegment(seg);
      }
    });

    ws.on("finish", () => {
      setIsPlaying(false);
    });

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audioSrc, subtitles]);

  // 自动滚动字幕
  useEffect(() => {
    if (currentSegment) {
      const index = subtitles.findIndex((s) => s.id === currentSegment.id);
      const el = subtitleRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentSegment]);

  const playSegment = (segment: Subtitle) => {
    if (!wavesurferRef.current) return;
    setCurrentSegment(segment);
    wavesurferRef.current.seekTo(segment.start / duration);
    wavesurferRef.current.play();
    setIsPlaying(true);
  };

  // 播放/暂停
  const togglePlay = () => {
    if (!wavesurferRef.current) return;
    if (isPlaying) {
      wavesurferRef.current.pause();
      setIsPlaying(false);
    } else {
      wavesurferRef.current.play();
      setIsPlaying(true);
    }
  };

  // 前进 / 后退 15 秒
  const skipTime = (seconds: number) => {
    if (!wavesurferRef.current) return;
    const newTime = wavesurferRef.current.getCurrentTime() + seconds;
    wavesurferRef.current.setTime(
        Math.min(Math.max(newTime, 0), duration)
    );
  };

  return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
        {/* 波形图 */}
        <div ref={waveformRef} className="w-full"></div>

        {/* 时间信息 */}
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* 字幕滚动区 */}
        <div className="space-y-3 mt-4 max-h-64 overflow-y-auto border rounded-lg p-2">
          {subtitles.map((seg, i) => (
              <div
                  key={seg.id}
                  ref={(el) => (subtitleRefs.current[i] = el)}
                  onClick={() => playSegment(seg)}
                  className={`p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
                      currentSegment?.id === seg.id ? "bg-blue-100" : ""
                  }`}
              >
            <span className="text-gray-500 italic mr-2">
              [{formatTime(seg.start)}]
            </span>
                {seg.text}
              </div>
          ))}
        </div>

        {/* 控制按钮 */}
        <div className="mt-6 flex justify-center items-center gap-6">
          <button
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => skipTime(-15)}
          >
            <Rewind size={24} />
          </button>

          <button
              className="p-4 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
              onClick={togglePlay}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>

          <button
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => skipTime(15)}
          >
            <FastForward size={24} />
          </button>
        </div>
      </div>
  );
};

export default AudioPlayer;
