"use client";

import { Profile, MemberRole } from "@prisma/client";
import { ShieldAlert, ShieldCheck, Users } from "lucide-react";
import { useProfileQuery } from "@/hooks/use-profile-query";
import { useProfileSocket } from "@/hooks/use-profile-socket";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";


interface MembersMobileProps{
    lobbyId: string,
    currentUser: Profile
}

const roleIconMap = {
    [MemberRole.GUEST]: null, 
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-amber-500"/>, 
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500"/>, 
}

const MAX_SHOWN_USERS = 3;

export const MembersMobile = ({
    lobbyId
}: MembersMobileProps) => {

    const queryKey = `profile:${lobbyId}`;
    const profileKey = `profile:${lobbyId}:addProfile`; // Mesmo do /api/socket/invite
    const apiUrl = "/api/lobby/profiles";
    const paramKey = "lobbyId";
    const paramValue = lobbyId;

    const {
        data 
    } = useProfileQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    })

    useProfileSocket({ queryKey, profileKey });

    var hasMoreUsers
    var users: Profile[] = []

    if (data?.pages) {
        
        data.pages.map((group) => {
            group.items.map((profile: Profile) => {
                users.push(profile)
            })
        })
    }

    hasMoreUsers = users.length > MAX_SHOWN_USERS

    return (  
        <Sheet>
            <SheetTrigger asChild>
                <div className="rounded-md bg-white dark:bg-slate-900 flex m-2 items-center p-4 ">
                    <Users className="size-6 m-2"/>
                    <p className="font-medium">Participantes</p>
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="dark:bg-slate-900 p-0 flex gap-0 border-none">
                <div className="w-full">
                    <div className="text-md flex h-12 font-semibold px-3  items-center border-neutral-200 dark:border-slate-800 border-b-2">
                        <p className="font-semibold text-md text-black dark:text-white">
                            Participantes 
                        </p>
                    </div>
                    <ScrollArea className=" h-full w-full rounded-md border p-4">
                    <ul className="max-w-md ">
                        {users.map((profile: Profile) => (
                            <li key={profile.id} className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 ">
                                    <div className="flex-shrink-0">
                                        <img alt={profile.name} src={profile.imageUrl} className="rounded-full size-10 mt-2 ml-2 gap-x-2"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {profile.name}
                                        </p>
                                    </div>
                                    {profile.role === "MODERATOR" && (

                                        <div className="inline-flex mr-2">
                                            <Badge variant={"nearest"}>Anfitrião</Badge>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}     
                    </ul>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>

    )
}