interface Album {
    cover : string
    id: number
    title: string
}

interface Artist{
    id:number
    name:string
    
}

export interface Song{
    album: Album;
    artist: Artist;
    duration: number;
    id: number;
    title:string;
}