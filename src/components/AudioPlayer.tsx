import React, { useRef, useState, useEffect } from "react";
import { Subtitle, AudioPlayerProps } from "../types/subtitles";
import { Rewind, Play, Pause, FastForward } from "lucide-react"; // 图标库

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, subtitles }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSegment, setCurrentSegment] = useState<Subtitle | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 百分比
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const subtitleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 自动滚动字幕
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

  // 拖动进度条
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(parseFloat(e.target.value));
  };

  // 前进 / 后退 15 秒
  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    let newTime = audio.currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <audio ref={audioRef} src={audioSrc} />

        {/* 时间 + 进度条 */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>
          <input
              type="range"
              className="flex-1"
              value={progress}
              min="0"
              max="100"
              step="0.1"
              onChange={handleSeek}
          />
          <span className="text-sm text-gray-600">{formatTime(duration)}</span>
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

        {/* 播放控制区 */}
        <div className="mt-6 flex justify-center items-center gap-6">
          <button
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => skipTime(-15)}
          >
            <Rewind size={24} /> {/* 后退 15 秒 */}
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
            <FastForward size={24} /> {/* 前进 15 秒 */}
          </button>
        </div>
      </div>
  );
};

export default AudioPlayer;
