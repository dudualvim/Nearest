import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";

interface ChatHeaderProps {
    lobbyId: string,
    name: string,
    type: "lobby" | "conversation",
    imageUrl?: string,
}

export const ChatHeader = ({
    lobbyId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    return (
        <div className="text-md flex h-12 font-semibold px-3  items-center border-neutral-200 dark:border-slate-800 border-b-2">
            
            {type === "lobby" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"/>
            )} 
            {type === "conversation" && (
                <UserAvatar
                    src={imageUrl}
                    className="h-8 w-8 md:h-8 md:w-8 mr-2"
                />
            )}
            <p className="font-semibold text-md text-black dark:text-white">
                Evento: {name}
            </p>
        </div>
    )
}