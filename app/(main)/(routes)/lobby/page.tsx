import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

const Lobby = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect('/')
    }

    const lobby = await db.lobby.findFirst({
        where: {
            profiles: {
                some: {
                    id: profile?.id
                }
            }
        } 
    })

    if(lobby) {
        return redirect(`/lobby/${lobby.id}/map`);
    } 
}

export default Lobby;