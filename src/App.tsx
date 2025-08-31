import React from "react";
import srtFile from "./subtitles/01.srt?raw";
import { parseSRT } from "./utils/srtParser";
import AudioPlayer from "./components/AudioPlayer.js";

const segments = parseSRT(srtFile);

const App: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">逐句音频播放器</h1>
            <AudioPlayer audioSrc="/audio/01.mp3" subtitles={segments} />
        </div>
    );
};

export default App;
