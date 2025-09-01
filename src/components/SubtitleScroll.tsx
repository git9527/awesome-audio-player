import React, { useEffect, useRef } from "react";
import { SubtitleScrollProps } from "../types";

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

const SubtitleScroll: React.FC<SubtitleScrollProps> = ({
                                                           subtitles,
                                                           currentSegment,
                                                           onSelect,
                                                       }) => {
    const subtitleRefs = useRef<(HTMLDivElement | null)[]>([]);

    // 自动滚动到当前字幕
    useEffect(() => {
        if (currentSegment) {
            const idx = subtitles.findIndex((s) => s.id === currentSegment.id);
            const el = subtitleRefs.current[idx];
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [currentSegment, subtitles]);

    return (
        <div className="space-y-3 mt-4 max-h-64 overflow-y-auto border rounded-lg p-2 bg-white">
            {subtitles.map((seg, i) => (
                <div
                    key={seg.id}
                    ref={(el) => (subtitleRefs.current[i] = el)}
                    onClick={() => onSelect(seg)}
                    className={`p-2 rounded-lg cursor-pointer transition ${
                        currentSegment?.id === seg.id
                            ? "bg-blue-100 font-medium"
                            : "hover:bg-gray-100"
                    }`}
                >
          <span className="text-gray-500 italic mr-2">
            [{formatTime(seg.start)}]
          </span>
                    {seg.text}
                </div>
            ))}
        </div>
    );
};

export default SubtitleScroll;
