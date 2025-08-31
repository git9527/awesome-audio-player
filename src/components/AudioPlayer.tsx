import React, { useEffect, useRef, useState } from "react";

import { Subtitle, AudioPlayerProps } from "../types/subtitles";

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, subtitles }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

  // 更新时间
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  // 匹配当前字幕
  useEffect(() => {
    const idx = subtitles.findIndex(
        (s) => currentTime >= s.start && currentTime <= s.end
    );
    setCurrentIndex(idx === -1 ? null : idx);
  }, [currentTime, subtitles]);

  // 自动滚动到当前字幕
  useEffect(() => {
    if (currentLineRef.current) {
      currentLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex]);

  // 点击字幕跳转
  const handleClick = (start: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = start;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
      <div className="p-4 max-w-2xl mx-auto">
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
        <div className="flex items-center space-x-4 mb-2">
          <button
              onClick={togglePlay}
              className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isPlaying ? "暂停" : "播放"}
          </button>
          <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        </div>
        <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            step={0.1}
            onChange={handleProgressChange}
            className="w-full mb-4"
        />

        {/* 可滚动字幕区域 */}
        <div className="h-64 overflow-y-auto border p-2 rounded">
          {subtitles.map((s: Subtitle, i) => (
              <div
                  key={s.id}
                  ref={i === currentIndex ? currentLineRef : null}
                  className={`p-2 rounded cursor-pointer ${
                      i === currentIndex ? "bg-yellow-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleClick(s.start)}
              >
                {s.text}
              </div>
          ))}
        </div>
      </div>
  );
};

export default AudioPlayer;
