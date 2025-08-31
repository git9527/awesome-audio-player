import React, { useRef, useState, useEffect } from "react";
import { Subtitle, AudioPlayerProps } from "../types/subtitles";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, subtitles }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSegment, setCurrentSegment] = useState<Subtitle | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 存 refs，方便逐句滚动
  const subtitleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentSegment) {
      const index = subtitles.findIndex((s) => s.id === currentSegment.id);
      const el = subtitleRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentSegment, subtitles]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);

      if (currentSegment && audio.currentTime > currentSegment.end) {
        const nextIndex = subtitles.findIndex((s) => s.id === currentSegment.id) + 1;
        if (nextIndex < subtitles.length) {
          playSegment(subtitles[nextIndex]);
        } else {
          audio.pause();
          setIsPlaying(false);
          setCurrentSegment(null);
        }
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [currentSegment, subtitles]);

  const playSegment = (segment: Subtitle) => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentSegment(segment);
    audio.currentTime = segment.start;
    audio.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <audio ref={audioRef} src={audioSrc} />

        {/* 进度条 */}
        <div className="w-full bg-gray-200 h-2 rounded mt-4">
          <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
          />
        </div>

        {/* 时间 */}
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* 可滚动字幕区 */}
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

        {/* 播放控制 */}
        <div className="mt-6 flex justify-center">
          <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
              onClick={togglePlay}
          >
            {isPlaying ? "暂停" : "播放"}
          </button>
        </div>
      </div>
  );
};

export default AudioPlayer;
