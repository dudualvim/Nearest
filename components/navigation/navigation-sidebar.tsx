
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { UserLogged } from "@/components/user-logged";
import { MapChat } from "../map/map-chat";
import { MapInvite } from "../map/map-invite";
import Link from "next/link";
import { ServerMember } from "../server/server-member";
import { MobileToggle } from "../mobile-toggle";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect('/');
    }

    const lobby = await db.lobby.findFirst({
        where: {
            profiles: {
                some: {
                    id: profile.id,
                }
            }
        }
    })

    if(!lobby){
        return 'errado'
    }

    const users = await db.profile.findMany({
        where:{
            lobbyId: lobby.id
        }
    })

    return (
        <nav className="relative z-50 top-0 py-2.5 backdrop-blur-md dark:bg-slate-950/70  bg-white/70 shadow-md">
            
            <div className="flex flex-wrap justify-between px-4 mx-auto">
                <MobileToggle 
                    lobby={lobby}
                />
                <Link href="#" className="flex align-start items-center">
                    <img src="https://nearest-rwbc.vercel.app/_next/image?url=%2Fimages%2FNearest.png&w=96&q=75" className="h-6 mr-3 sm:h-9" alt="Nearest Logo"></img>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Nearest</span>
                </Link>
                
                <div className="hidden md:flex items-center lg:order-2">
                    <div className="hidden mt-2 mr-4 sm:inline-block">
                        <span></span>
                    </div>
                    {lobby.pin}
                    <div className="mt-2 flex flex-1 gap-x-2">
                        <ServerMember lobbyId={lobby.id} currentUser={profile} />
                    </div>
                    {lobby.result && !(
                        <MapInvite lobby={lobby} />
                    )}
                    <ModeToggle  />
                    <div className=" md:flex md:space-x-10">
                        <MapChat profile={profile} lobbyId={lobby.id}/>
                    </div>
                    <UserLogged />
                    <button data-collapse-toggle="mobile-menu-2" type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2" aria-expanded="true">
                        
                    </button>
                </div>
            </div>
        </nav>
    )
}