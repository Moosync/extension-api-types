import { Logger } from "winston";
import { Song, SongQueue, PlayerState } from "./models";

export type logger = Logger

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

export interface extensionAPI {
    getAllSongs(): Promise<Song[] | undefined>
    getCurrentSong(): Promise<Song | undefined>
    getPlayerState(): Promise<PlayerState | undefined>
    getVolume(): Promise<number | undefined>
    getTime(): Promise<number | undefined>
    getQueue(): Promise<SongQueue | undefined>
    getPreferences(key?: string, defaultValue?: any): Promise<any>
    setPreferences(key: string, value: any): Promise<void>
}