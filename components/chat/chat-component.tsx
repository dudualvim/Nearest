import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { db } from "@/lib/db";
import { Profile } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChatComponentProps {
    profile: Profile,
    lobbyId: string,
}

export const ChatComponent = async ({
    profile,
    lobbyId
}: ChatComponentProps) => {    
    if (!profile){
        return redirect('/');
    }

    const lobby = await db.lobby.findUnique({
        where: {
            id: lobbyId,
        }
    });

    if (!lobby){
        return redirect('/');
    }

    return ( 
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-none p-0 gap-0 dark:text-white flex flex-col h-screen">
            <ChatHeader 
                name={lobby.name}
                lobbyId={lobby.id}
                type="lobby"
           />
             <ChatMessages 
                name={lobby.name}
                profile={profile}
                lobbyId={lobby.id}
                apiUrl="/api/messages"
                socketUrl="/api/socket/messages"
                socketQuery={{
                    lobbyId: lobby.id,
                }}
                paramKey="lobbyId"
                paramValue={lobby.id}
                type="lobby"
            />
        
            <ChatInput 
                name={lobby.name}
                type="lobby"
                apiUrl="/api/socket/messages"
                query={{
                    lobbyId: lobby.id,
                    profile: profile.id
                }}
            /> 
        </div>
    );
}