import { Song } from "./models";

export interface Extension {
    extensionDescriptors: ExtensionDescriptor[]
}

export interface ExtensionDescriptor {
    extensionPointId: string,
    factory: ExtensionFactory,
}

export interface ExtensionFactory {
    extensionName: string
    extensionDescription: string

    // Return an instance of the plugin
    create(data?: any): Promise<ExtensionTemplate>
}

export interface ExtensionTemplate {
    onSongChanged(song: Song)
}

export interface ExtensionItem {
    id: string
    name: string
    desc: string
    instance: ExtensionTemplate
}

export interface global {
    getAllSongs(): Promise<Song[]>
}