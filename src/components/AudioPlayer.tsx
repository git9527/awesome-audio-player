import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {AudioPlayerProps, SubtitleSegment} from "../types";
import SubtitleScroll from "./SubtitleScroll";

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

    // 监听加载完成 → 自动播放
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

  return (
      <div className="border rounded-lg shadow p-4">
        {/* 波形图 */}
        <div ref={waveformRef} className="w-full mb-4" />

        {/* 控制按钮 */}
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              if (wavesurferRef.current) {
                wavesurferRef.current.playPause();
                setIsPlaying(wavesurferRef.current.isPlaying());
              }
            }}
        >
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>

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
