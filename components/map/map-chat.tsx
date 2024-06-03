import { MessageSquare,  } from "lucide-react";
import { SocketIndicator } from "@/components/socket-indicator";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ChatComponent } from "../chat/chat-component";
import { Profile } from "@prisma/client";
import { Button } from "../ui/button";

interface MapChatProps {
    profile: Profile
    lobbyId: string
}

export const MapChat = ({
    profile,
    lobbyId
}: MapChatProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="dark:hover:bg-slate-900 ">
                    <MessageSquare className="h-4 w-4 dark:rotate-0 dark:scale-100" />
                    <p className="p-2">Chat</p>
                    <SocketIndicator />
                </Button>
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
