import { db } from "@/lib/db";
import { ServerMember } from "../server/server-member";

interface ParticipantsProps {
    lobbyId: string
}

export const MapParticipants = async ({
    lobbyId
}: ParticipantsProps) => {

    const lobbies = await db.lobby.findUnique({
        where: {
            id: lobbyId,
        },
        include: {
            profiles: true
        }
    });

    const profiles = lobbies?.profiles;

    return (
        <div className="absolute top-[50%] -translate-y-[50%] right-2 flex flex-col gap-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                {!!profiles?.length && (
                    <div className="mb-2">
                        <div className="space-y-[2px]">
                            <ServerMember
                                lobbyId={lobbyId}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}