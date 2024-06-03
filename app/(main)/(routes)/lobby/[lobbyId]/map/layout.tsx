import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const LobbyIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lobbyId: string };
}) => {

    const lobby = await db.lobby.findUnique({
        where: {
            id: params.lobbyId,
        }
    })

    if (!lobby){
        return redirect('/');
    }

    return (
        <>   
            {children}
        </>
    );
}

export default LobbyIdLayout;