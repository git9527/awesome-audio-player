import React, { useEffect, useState } from "react";
import { Subtitle } from "./types/subtitles";

import { parseSRT } from "./utils/srtParser";
import AudioPlayer from "./components/AudioPlayer.js";

const App: React.FC = () => {
    const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

    useEffect(() => {
        fetch("/subtitles/01.srt") // 🔹 确保文件放在 public/subtitles/lesson1.srt
            .then((res) => res.text())
            .then((text) => {
                setSubtitles(parseSRT(text));
            });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">逐句音频播放器</h1>
            <AudioPlayer audioSrc="/audio/01.mp3" subtitles={subtitles} />
        </div>
    );
};

export default App;
