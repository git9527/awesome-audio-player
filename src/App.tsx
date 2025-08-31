import React from "react";
import srtFile from "./subtitles/01.srt?raw";
import { parseSRT } from "./utils/srtParser";
import AudioPlayer from "./components/AudioPlayer.js";

const segments = parseSRT(srtFile);

const lessonData = {
    title: "Lesson 1 - Dialogue",
    audioUrl: "/audio/01.mp3",
    segments,
};

export default function App() {
    return <AudioPlayer lessonData={lessonData} />;
}
