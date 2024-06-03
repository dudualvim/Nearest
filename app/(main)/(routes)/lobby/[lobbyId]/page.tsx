
import WaitMessage from "@/components/wait/wait-message";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface LobbyIdPage {
    params: {
        lobbyId: string,
    }
}

const LobbyIdPage = async ({
    params
}: LobbyIdPage) => {
    const profile = await currentProfile();

    const places = await db.place.findMany();

    const lobby = await db.lobby.findFirst({
        where:{ 
            id: params.lobbyId
        },
        include: {
            place: true
        }
    });

    if(!profile){
        return redirect('/');
    }

    if(!lobby){
        return redirect('/');
    }

    return (
        <div className="content-center w-screen items-center">
            <WaitMessage/>
        </div>
    )
}


export default LobbyIdPage;