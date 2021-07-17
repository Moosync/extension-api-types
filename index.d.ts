import { Song } from "./models";

export interface ExtensionData {
    extensionDescriptors: ExtensionDescriptor[]
}

export interface ExtensionDescriptor {
    extensionName: string
    extensionDescription: string
    extensionPointId: string,
    factory: ExtensionFactory,
}

export interface ExtensionFactory {
    // Return an instance of the plugin
    create(data?: any): Promise<MoosyncExtensionTemplate>
}

export interface MoosyncExtensionTemplate {
    onSongChanged(song: Song)
}

export interface ExtensionItem {
    id: string
    name: string
    desc: string
    instance: MoosyncExtensionTemplate
}

export interface global {
    getAllSongs(): Promise<Song[]>
}