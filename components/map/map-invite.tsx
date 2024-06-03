'use client'
import { useModal } from "@/hooks/use-modal-store";
import { Lobby } from "@prisma/client";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";

interface MapInvite {
    lobby: Lobby,
}

export const MapInvite = ({
    lobby
}: MapInvite) => {
    const { onOpen } = useModal();

    return (
        <Button onClick={() => onOpen('invite', { lobby })} className=" dark:hover:bg-slate-900 bg-transparent border-0" variant="outline" size="icon">
            <Share2 className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100" />       
        </Button>
    );
}