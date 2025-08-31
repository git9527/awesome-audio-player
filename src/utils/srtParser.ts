export interface Segment {
    id: number;
    text: string;
    start: number;
    end: number;
}

/**
 * 将 SRT 文本解析为 Segment 数组
 */
export function parseSRT(srtText: string): Segment[] {
    const lines = srtText.split(/\r?\n/);
    const segments: Segment[] = [];
    let i = 0;

    while (i < lines.length) {
        // 跳过序号行
        const indexLine = lines[i++].trim();
        if (!indexLine) continue;

        // 时间行
        const timeLine = lines[i++]?.trim();
        if (!timeLine) continue;

        const match = timeLine.match(
            /(\d\d:\d\d:\d\d,\d\d\d) --> (\d\d:\d\d:\d\d,\d\d\d)/
        );
        if (!match) continue;

        const start = toSeconds(match[1]);
        const end = toSeconds(match[2]);

        // 文本（可能多行）
        let text = "";
        while (i < lines.length && lines[i].trim() !== "") {
            text += lines[i++] + " ";
        }
        text = text.trim();

        if (text) {
            segments.push({
                id: segments.length + 1,
                text,
                start,
                end,
            });
        }
        i++;
    }

    return segments;
}

/**
 * 将 00:00:30,280 转换成秒数
 */
function toSeconds(timeStr: string): number {
    const [h, m, rest] = timeStr.split(":");
    const [s, ms] = rest.split(",");
    return (
        parseInt(h) * 3600 +
        parseInt(m) * 60 +
        parseInt(s) +
        parseInt(ms) / 1000
    );
}
