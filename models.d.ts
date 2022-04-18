export interface Album {
  album_id?: string
  album_name?: string
  album_coverPath_high?: string
  album_coverPath_low?: string
  album_song_count?: number
  album_artist?: string
  year?: number
}

export interface Artists {
  artist_id: string
  artist_name?: string
  artist_mbid?: string
  artist_coverPath?: string
  artist_song_count?: number
}

export interface Genre {
  genre_id: string
  genre_name: string
  genre_song_count: number
}

export interface Playlist {
  playlist_id: string
  playlist_name: string
  playlist_coverPath: string | undefined
  playlist_song_count?: number
  playlist_path?: string
  icon?: string
  isRemote?: boolean
}

export type PlayerTypes = "LOCAL" | "YOUTUBE" | "SPOTIFY" | "URL"

export interface Song {
  _id: string
  path?: string
  size?: number
  title: string
  song_coverPath_low?: string
  song_coverPath_high?: string
  album?: Album
  artists?: Artists[]
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
  date_added: number
  providerExtension?: string
  icon?: string
  type: PlayerTypes
}

export interface SearchableSong {
  _id?: string
  path?: string
  title?: string
  url?: string
  playbackUrl?: string

  // MD5 hash
  hash?: string

  type?: "LOCAL" | "YOUTUBE" | "SPOTIFY"

  // Will return all songs provided by this extension
  extension?: boolean
}

export type PlayerState = "PLAYING" | "PAUSED" | "STOPPED" | "LOADING"

/**
 * Interface representing Queue of tracks
 */
export interface SongQueue {
  /**
   * Data is a dictionary with unique songs. Song here won't be repeated
   */
  data: { [id: string]: Song }

  /**
   * Order is an array with songID corresponding to {@link SongQueue#data}
   * Items may be repeated
   */
  order: { id: string; songID: string }[]

  /**
   * Index of current playing song from {@link SongQueue#order}
   */
  index: number
}
