import { CreateNewGuestModel } from "@/components/modals/create-new-guest-model";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodeProps {
    params: {
        inviteCode: string;
    };
}

const InviteCodePage = async ({
    params
}: InviteCodeProps) => {
    
    const lobby = await db.lobby.findFirst({
        where:{
            inviteCode: params.inviteCode 
        },
    });

    if (!lobby) {
        return redirect('/');
    }

    const moderator = await db.profile.findFirst({
        where: {
            lobbyId: lobby.id,
            AND: {
                role: "MODERATOR"
            }
        }
    })

    if (!moderator){ 
        return redirect('/')
    }
   
    return (
        <CreateNewGuestModel 
            inviteCode={params.inviteCode}
            lobbyId={lobby.id}
            moderator={moderator}
            event={lobby.name}
        />
    )
}

export default InviteCodePage;