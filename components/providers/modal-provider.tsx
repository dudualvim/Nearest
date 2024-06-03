"use client";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { MessageFileModel } from "@/components/modals/message-file-model";
import { CreateGuestModel } from "@/components/modals/create-guest-model";
import { CreateGuestPin } from "@/components/modals/create-guest-pin";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
            <CreateGuestPin />
            <InviteModal />
            <MessageFileModel />
            <CreateGuestModel />
        </>
    )
}