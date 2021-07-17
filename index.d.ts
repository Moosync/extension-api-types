import { Song } from "./models";

export const EXTENSION_ENTRY_POINT = 'moosync_extension_entry'
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
    onStarted?(): void
    onSongChanged?(song: Song): void
}

export interface ExtensionItem {
    id: string
    name: string
    desc: string
    instance: MoosyncExtensionTemplate
}