export interface SubtitleSegment {
    id: number;
    text: string;
    start: number;
    end: number;
}

export interface AudioFile {
    type: "file";
    name: string;
    audioUrl: string;
    subtitles: SubtitleSegment[];
}

export interface Folder {
    type: "folder";
    name: string;
    children: Array<Folder | AudioFile>;
}

export interface FileSystemItem {
    type: "folder" | "file";
    name: string;
    path: string;
}

export interface SubtitleScrollProps {
    subtitles: SubtitleSegment[];
    currentSegment: SubtitleSegment | null;
    onSelect: (seg: SubtitleSegment) => void;
}

export interface FileNavigatorProps {
    path: string[];
    currentFolder: Folder;
    onNavigate: (path: string[]) => void;
    onSelectFile: (file: AudioFile) => void;
}

export interface AudioPlayerProps {
    audioSrc: string;
    subtitles: SubtitleSegment[];
}
