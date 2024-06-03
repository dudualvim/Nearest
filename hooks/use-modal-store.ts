import { Channel, ChannelType, Lobby, Server } from "@prisma/client";
import { create } from "zustand";
 
export type ModalType = "createServer" | "createGuestPin" | "createGuestModel" | "invite" | "editServer" | "members" | "createChannel" | "deleteChannel" | "messageFile";

interface ModalData {
    server?: Server,
    lobby?: Lobby,
    channel?: Channel,
    channelType?: ChannelType,
    apiUrl?: string,
    query?: Record<string, any>,
    pin?: number
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type:ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null, isOpen: false})
}));