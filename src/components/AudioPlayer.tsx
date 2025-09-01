import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { AudioPlayerProps, SubtitleSegment } from "../types";
import SubtitleScroll from "./SubtitleScroll";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, subtitles }) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSegment, setCurrentSegment] = useState<SubtitleSegment | null>(null);

    useEffect(() => {
        if (!waveformRef.current) return;

        // 初始化 WaveSurfer
        const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#ddd",
            progressColor: "#4f46e5",
            cursorColor: "#111",
            height: 100,
        });

        wavesurfer.load(audioSrc);
        wavesurferRef.current = wavesurfer;

        // 自动播放
        wavesurfer.on("ready", () => {
            wavesurfer.play();
            setIsPlaying(true);
        });

        // 监听播放进度 → 更新字幕
        wavesurfer.on("audioprocess", (time: number) => {
            const seg = subtitles.find((s) => time >= s.start && time <= s.end);
            if (seg && seg.id !== currentSegment?.id) {
                setCurrentSegment(seg);
            }
        });

        return () => {
            wavesurfer.destroy();
        };
    }, [audioSrc, subtitles]);

    // 点击字幕 → 跳转播放
    const handleSubtitleClick = (seg: SubtitleSegment) => {
        if (wavesurferRef.current) {
            wavesurferRef.current.setTime(seg.start);
            wavesurferRef.current.play();
            setIsPlaying(true);
        }
    };

    // 后退 15 秒
    const handleRewind = () => {
        if (wavesurferRef.current) {
            const newTime = Math.max(0, wavesurferRef.current.getCurrentTime() - 15);
            wavesurferRef.current.setTime(newTime);
        }
    };

    // 前进 15 秒
    const handleForward = () => {
        if (wavesurferRef.current) {
            const duration = wavesurferRef.current.getDuration();
            const newTime = Math.min(duration, wavesurferRef.current.getCurrentTime() + 15);
            wavesurferRef.current.setTime(newTime);
        }
    };

    return (
        <div className="border rounded-lg shadow p-4">
            {/* 波形图 */}
            <div ref={waveformRef} className="w-full mb-4" />

            {/* 控制按钮 */}
            <div className="flex items-center justify-center space-x-6 mb-4">
                <button
                    onClick={handleRewind}
                    className="p-2 rounded-full hover:bg-gray-200"
                    title="后退15秒"
                >
                    <SkipBack size={28} />
                </button>

                <button
                    onClick={() => {
                        if (wavesurferRef.current) {
                            wavesurferRef.current.playPause();
                            setIsPlaying(wavesurferRef.current.isPlaying());
                        }
                    }}
                    className="p-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
                    title={isPlaying ? "暂停" : "播放"}
                >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>

                <button
                    onClick={handleForward}
                    className="p-2 rounded-full hover:bg-gray-200"
                    title="前进15秒"
                >
                    <SkipForward size={28} />
                </button>
            </div>

            {/* 字幕 */}
            <SubtitleScroll
                subtitles={subtitles}
                currentSegment={currentSegment}
                onSelect={handleSubtitleClick}
            />
        </div>
    );
};

export default AudioPlayer;
