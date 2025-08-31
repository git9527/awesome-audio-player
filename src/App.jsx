import React from "react";
import srtFile from "./subtitles/01.srt?raw";
import { parseSRT } from "./utils/srtParser";
import AudioPlayer from "./components/AudioPlayer";

const segments = parseSRT(srtFile);

const lessonData = {
    title: "Lesson 1 - Dialogue",
    audioUrl: "/audio/01.mp3",
    segments,
};

function App() {
    return (
        <div className="p-4">
            <AudioPlayer lessonData={lessonData} />
        </div>
    );
}

export default App;
