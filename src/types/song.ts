export interface Song{
    id: string
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    duration: number; // Confirmar
    album?: string;
}