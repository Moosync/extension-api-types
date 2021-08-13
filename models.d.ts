export interface Album {
  album_id?: string
  album_name?: string
  album_coverPath?: string
  album_song_count?: number
  album_artist?: string
  year?: number
}

export interface artists {
  artist_id?: string
  artist_name?: string
  artist_mbid?: string
  artist_coverPath?: string
  artist_song_count?: number
}

export interface Genre {
  genre_id?: string
  genre_name?: string
  genre_song_count?: number
}

export interface Playlist {
  playlist_id?: string
  playlist_name?: string
  playlist_coverPath?: string
  playlist_songs?: Song[]
  playlist_song_count?: number
}


export interface Song {
  _id: string
  path?: string
  size?: number
  title: string
  song_coverPath?: string
  album?: Album
  artists?: string[]
  date?: string
  year?: number
  genre?: string[]
  lyrics?: string
  releaseType?: string[]
  bitrate?: number
  codec?: string
  container?: string
  duration: number
  sampleRate?: number
  hash?: string
  inode?: string
  deviceno?: string
  url?: string
  playbackUrl?: string
  type: 'LOCAL' | 'YOUTUBE' | 'SPOTIFY'
}

export interface SearchableSong {
  _id?: string
  path?: string
  title?: string
  url?: string
  playbackUrl?: string
  type?: 'LOCAL' | 'YOUTUBE' | 'SPOTIFY'
}

export type PlayerState = 'PLAYING' | 'PAUSED' | 'STOPPED' | 'LOADING'

export interface SongQueue {
  data: { [id: string]: Song }
  order: { id: string, songID: string }[]
  index: number
}