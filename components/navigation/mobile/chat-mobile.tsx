import { MessageSquare,  } from "lucide-react";
import { SocketIndicator } from "@/components/socket-indicator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChatComponent } from "@/components/chat/chat-component";
import { Profile } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface ChatMobileProps {
    profile: Profile
    lobbyId: string
}

export const ChatMobile = ({
    profile,
    lobbyId
}: ChatMobileProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="rounded-md  bg-white dark:bg-slate-900 flex m-2 items-center p-4 ">
                    <MessageSquare className="size-6 m-2"/>
                    <p className="font-medium mr-2">Chat</p>
                    <SocketIndicator />
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="border-none p-0 flex gap-0">
                <div className="w-full ">
                    <ChatComponent
                        profile={profile}
                        lobbyId={lobbyId}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}
