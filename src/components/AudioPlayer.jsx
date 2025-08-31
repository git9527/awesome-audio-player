import React, { useState, useRef, useEffect } from 'react';


const lessonData = {
  title: 'Lesson 1 - Dialogue',
  audioUrl: '/audio/01.mp3',
  segments: [
    { id: 1, text: '张伟是我的好朋友。', start: 0.0, end: 2.5 },
    { id: 2, text: '他住在学校附近。', start: 2.6, end: 4.2 },
    { id: 3, text: '我们常常一起打篮球。', start: 4.3, end: 6.5 },
    { id: 4, text: '他喜欢读书，也喜欢运动。', start: 6.6, end: 9.0 },
  ],
};

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [currentSegment, setCurrentSegment] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
      if (currentSegment && audio.currentTime > currentSegment.end) {
        const nextIndex = lessonData.segments.findIndex((s) => s.id === currentSegment.id) + 1;
        if (nextIndex < lessonData.segments.length) {
          playSegment(lessonData.segments[nextIndex]);
        } else {
          audio.pause();
          setIsPlaying(false);
          setCurrentSegment(null);
        }
      }
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [currentSegment]);

  const playSegment = (segment) => {
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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-xl font-bold mb-2">{lessonData.title}</h1>
      <audio ref={audioRef} src={lessonData.audioUrl} />

      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="space-y-3 mt-4">
        {lessonData.segments.map((seg) => (
          <div
            key={seg.id}
            onClick={() => playSegment(seg)}
            className={`p-3 rounded-lg cursor-pointer transition hover:bg-gray-100 \${
              currentSegment?.id === seg.id ? 'bg-blue-100' : ''
            }`}
          >
            {seg.text}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
          onClick={togglePlay}
        >
          {isPlaying ? '暂停' : '播放'}
        </button>
      </div>
    </div>
  );
}
