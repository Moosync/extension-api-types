import { Song, SongQueue, PlayerState, Genre, Album, artists, Playlist, SearchableSong } from "./models";

export const EXTENSION_ENTRY_POINT = 'moosync_extension_entry'
export interface ExtensionData {
    extensionDescriptors: ExtensionFactory[]
}

export interface Checkbox {
    key: string
    title: string
    enabled: boolean
}

export interface PathGroup {
    path: string
    enabled: boolean
}

export type ExtensionPreferenceGroup = {
    key: string
    title: string
    description: string
} & ({
    type: 'CheckboxGroup'
    items: Checkbox[]
} | {
    type: 'EditText'
    default: string
} | {
    type: 'FilePicker'
    default: string
} | {
    type: 'DirectoryGroup'
    default: PathGroup[]
})

export interface ExtensionFactory {
    // Return an instance of the plugin
    registerPreferences?(): Promise<ExtensionPreferenceGroup[]>
    create(): Promise<MoosyncExtensionTemplate>
}

export interface ExtensionFactory {
    // Return an instance of the plugin
    create(): Promise<MoosyncExtensionTemplate>
}

export interface MoosyncExtensionTemplate {
    onStarted?(): void
    onStopped?(): void
    onSongChanged?(song: Song): void
    onPlayerStateChanged?(state: PlayerState): void
    onVolumeChanged?(state: number): void
    onSeeked?(time: number): void
    onSongQueueChanged?(queue: SongQueue): void
    onPreferenceChanged?({ key, value }: { key: string, value: any }): void
}

export type sortOptions = { type: 'name' | 'date', asc: boolean }

export interface SongAPIOptions {
    song?: SearchableSong
    album?: Album
    artist?: artists
    genre?: Genre
    playlist?: Playlist
    sortBy: sortOptions
    inclusive?: boolean
}

export type EntityApiOptions = { inclusive?: boolean } & ({
    album: Album | boolean
} | {
    artist: artists | boolean
} | {
    genre: Genre | boolean
} | {
    playlist: Playlist | boolean
})

export interface playerControls {
    play(): Promise<void>
    pause(): Promise<void>
    stop(): Promise<void>
    nextSong(): Promise<void>
    prevSong(): Promise<void>
}

export interface extensionAPI {
    getSongs(options: SongAPIOptions): Promise<Song[] | undefined>
    getCurrentSong(): Promise<Song | undefined>
    getPlayerState(): Promise<PlayerState | undefined>
    getVolume(): Promise<number | undefined>
    getTime(): Promise<number | undefined>
    getQueue(): Promise<SongQueue | undefined>
    getPreferences(key?: string, defaultValue?: any): Promise<any>
    setPreferences(key: string, value: any): Promise<void>
    player: playerControls
}