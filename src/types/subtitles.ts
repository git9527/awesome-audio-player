export interface Subtitle {
    id: number;
    start: number;
    end: number;
    text: string;
}

export interface AudioPlayerProps {
    audioSrc: string;
    subtitles: Subtitle[];
}
