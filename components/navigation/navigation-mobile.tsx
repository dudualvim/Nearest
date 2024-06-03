import { Lobby } from "@prisma/client"
import { MobileHeader } from "./mobile/navigation-mobile-header"
import { currentProfile } from "@/lib/current-profile";
import { ServerMember } from "../server/server-member";
import { MapInvite } from "../map/map-invite";
import { ModeToggle } from "../mode-toggle";
import { MapChat } from "../map/map-chat";
import { UserLogged } from "../user-logged";
import { MessageSquare, Users } from "lucide-react";
import { MembersMobile } from "./mobile/members-mobile";
import { ChatMobile } from "./mobile/chat-mobile";

interface NavigationMobileInterface {
    lobby: Lobby
}

export const NavigationMobile = async ({
    lobby
}: NavigationMobileInterface) => {
    const profile = await currentProfile();


    return (
        <div className=" flex flex-col h-screen">
            <MobileHeader name={lobby.name}/>
            
            

            <ChatMobile profile={profile} lobbyId={lobby.id}/>
           

            <MembersMobile lobbyId={lobby.id} currentUser={profile} />
            <div className="mt-2 flex flex-1 gap-x-2">
            </div>
            {lobby.result && !(
                <MapInvite lobby={lobby} />
            )}
            <div className="bg-white items-center dark:bg-slate-900 flex p-4 pb-6">
                <UserLogged />
                {profile?.name}
                <div className="right-0">
                    <ModeToggle  />
                </div>
            </div>
        </div>
    )
}