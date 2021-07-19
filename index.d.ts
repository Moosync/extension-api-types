import { Song, SongQueue, PlayerState } from "./models";

export const EXTENSION_ENTRY_POINT = 'moosync_extension_entry'
export interface ExtensionData {
    extensionDescriptors: ExtensionFactory[]
}

export interface ExtensionFactory {
    // Return an instance of the plugin
    create(data?: any): Promise<MoosyncExtensionTemplate>
}

export interface MoosyncExtensionTemplate {
    onStarted?(): void
    onSongChanged?(song: Song): void
    onPlayerStateChanged?(state: PlayerState): void
    onVolumeChanged?(state: number): void
    onSongQueueChanged?(queue: SongQueue): void
}

declare function getAllSongs(): Promise<Song>