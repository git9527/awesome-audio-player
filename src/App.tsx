import React, { useState } from "react";

import FileNavigator from "./components/FileNavigator";
import AudioPlayer from "./components/AudioPlayer";
import { FileSystemItem, SubtitleSegment } from "./types";
import { parseSRT } from "./utils/srtParser";

const App: React.FC = () => {
    const [currentPath, setCurrentPath] = useState("/"); // 默认在根目录
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [subtitles, setSubtitles] = useState<SubtitleSegment[]>([]);

    // 选择音频文件
    const handleSelectFile = (file: FileSystemItem) => {

        const audioUrl = "https://biti.cdn.zhangsn.me/audio/grade-6" + decodeURIComponent(file.path);
        setAudioUrl(audioUrl);

        // 推断对应的 srt 文件路径
        const subtitleUrl = audioUrl.replace(/\.[^.]+$/, ".srt");
        fetch(subtitleUrl)
            .then((res) => res.text())
            .then((text) => setSubtitles(parseSRT(text)))
            .catch(() => setSubtitles([]));
    };

    return (
        <div className="flex flex-col h-screen">
            {/* 顶部：文件导航 */}
            <div className="h-2/5 border-b overflow-y-auto">
                <FileNavigator
                    currentPath={currentPath}
                    onNavigate={setCurrentPath}
                    onSelectFile={handleSelectFile}
                />
            </div>

            {/* 底部：播放器 + 字幕 */}
            <div className="flex-1 flex flex-col">
                {audioUrl ? (
                    <>
                        <div className="border-b">
                            <AudioPlayer audioSrc={audioUrl} subtitles={subtitles} />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        请选择一个音频文件
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
