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

    /**
     * This method is necessary for the extension to be loaded into moosync
     */
    create(): Promise<MoosyncExtensionTemplate>
}

/**
 * Interface defining Moosync extension lifecycle hooks
 */
export interface MoosyncExtensionTemplate {
    /**
     * Method fired when the extension is started
     */
    onStarted?(): Promise<void>

    /**
     * Method fired when the extension is stopped
     */
    onStopped?(): Promise<void>

    /**
     * Method fired when current playing track is changed
     * @param song song which is current playing after change
     */
    onSongChanged?(song: Song): Promise<void>


    /**
     * Method fired when player state changes 
     * @param state player state after change
     */
    onPlayerStateChanged?(state: PlayerState): Promise<void>


    /**
     * Method fired when volume changes
     * @param volume volume after change
     */
    onVolumeChanged?(volume: number): Promise<void>


    /**
     * Method fired when user manually seeks track
     * @param time time to which the track was seeked
     */
    onSeeked?(time: number): Promise<void>


    /**
     * Method fired when song queue changes.
     * @param queue 
     */
    onSongQueueChanged?(queue: SongQueue): Promise<void>


    /**
     * Method fired when preferences corresponding to current extension changes
     * @param param0 can be destructured into key and value which corresponds to changed preference
     */
    onPreferenceChanged?({ key, value }: { key: string, value: any }): Promise<void>
}

/**
 * Sort by name or date. 
 * If asc is true then results will be sorted in ascending otherwise descending
 */
export type sortOptions = { type: 'name' | 'date', asc: boolean }

/**
 * Options for searching songs from Database
 * To search for all tracks with a specific term, surround the term with %. 
 * Eg. if the term is 'aaa', to get all songs containing 'aaa' in the title,
 * put the term as '%aaa%' in 'song.title'. 
 */
export interface SongAPIOptions {
    /**
     * To search tracks by properties in song, specify this property.
     */
    song?: SearchableSong

    /**
     * To search tracks by properties in album, specify this property.
     */
    album?: Album

    /**
     * To search tracks by properties in artists, specify this property.
     */
    artist?: artists

    /**
     * To search tracks by properties in genre, specify this property.
     */
    genre?: Genre

    /**
     * To search tracks by properties in playlist, specify this property.
     */
    playlist?: Playlist

    /**
     * To sort the results, specify this property
     */
    sortBy?: sortOptions

    /**
     * If false, then the exact match of all options will be provided. 
     * If true, then even if a track matches one of the options, it will be returned.
     * In terms of SQL, true will add 'AND' between where queries and false will add 'OR'.
     * 
     * Eg. If song.title is 'aaa' and album.album_name is 'bbb'
     * 
     * In this scenario if inclusive is false, then all tracks having title as 'aaa'
     * AND album_name as 'bbb' will be returned
     * 
     * If inclusive is false then songs having title as 'aaa' OR album_name as 'bbb' will be returned
     */
    inclusive?: boolean
}

/**
 * Options for searching entities like Albums, Artists, Playlists or Genre
 * 
 */
export type EntityApiOptions = {

    /**
     * If false, then the exact match of all options will be provided.
     * If true, then even if an entity matches one of the options, it will be returned.
     * In terms of SQL, true will add 'AND' between where queries and false will add 'OR'.
     *
     * Eg. If album.album_name is 'aaa' and album.album_id is 'bbb'
     *
     * In this scenario if inclusive is false, then all albums having album_name as 'aaa'
     * AND album_id as 'bbb' will be returned
     *
     * If inclusive is false then albums having album_name as 'aaa' OR album_id as 'bbb' will be returned
     */
    inclusive?: boolean
} & ({
    album: Album | boolean
} | {
    artist: artists | boolean
} | {
    genre: Genre | boolean
} | {
    playlist: Playlist | boolean
})

/**
 * Methods to control the audio player in Moosync
 */
export interface playerControls {
    /**
     * Start playing the loaded track
     */
    play(): Promise<void>

    /**
     * Pause the track
     */
    pause(): Promise<void>

    /**
     * Unload the audio from player
     */
    stop(): Promise<void>

    /**
     * Stop current track and load next track in queue
     */
    nextSong(): Promise<void>

    /**
     * Stop current track and load previous track in queue
     */
    prevSong(): Promise<void>
}

export interface extensionAPI {
    /**
     * Get songs from database filtered by provided options
     * @param options filter the results
     */
    getSongs(options: SongAPIOptions): Promise<Song[] | undefined>

    /**
     * Get the current playing track. Undefined if no track is playing
     */
    getCurrentSong(): Promise<Song | undefined>

    /**
     * Get state of music player. Undefined is player is broken and audio can't be loaded
     */
    getPlayerState(): Promise<PlayerState | undefined>

    /**
     * Get volume directly from the audio player
     */
    getVolume(): Promise<number | undefined>

    /**
     * Get current time of the player.
     */
    getTime(): Promise<number | undefined>

    /**
     * Get the queue of tracks
     */
    getQueue(): Promise<SongQueue | undefined>

    /**
     * Fetch preferences by key. If no key is provided, all preferences 
     * co-relating to current extension will be fetched.
     * 
     * @param key key of preference to fetch. keys within complex objects can be separated by .
     * @param defaultValue If the provided key is not found, then default value will be returned.
     */
    getPreferences(key?: string, defaultValue?: any): Promise<any>

    /**
     * Set preference by key.
     * @param key key separated by '.'
     * @param value value to be stored for corresponding key
     */
    setPreferences(key: string, value: any): Promise<void>

    /**
     * Object containing controls for player
     */
    player: playerControls
}