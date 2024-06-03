import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MemberRole } from "@prisma/client";
import { PlaceInput } from "@/components/place/place-input";
import WaitMessageGuest from "@/components/wait/wait-message-guest";

interface MapPageProps {
    params: {
        lobbyId: string
    }
}

const MapPage = async ({
    params
}: MapPageProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect('/');
    }

    const lobby = await db.lobby.findFirst({
        where: {
            profiles: {
                some: {
                    id: profile.id
                }
            }
        },
        include: {
            place: true
        }
    })

    if(!lobby) {
        return redirect('/');
    }

    const places = await db.place.findMany()

    return (
        <div className="container">
            {/* Se for o HOST, mostre a barra de pesquisa */}
            {profile.role === MemberRole.MODERATOR && (
                <PlaceInput 
                    lobbyId={params.lobbyId}
                    profileId={profile.id}
                    places={places}
                />
            )}
            {/* Se for GUEST, mostre a tela de espera */}
            {profile.role === MemberRole.GUEST && (
                <WaitMessageGuest/>
            )}
        </div>
    )
}

export default MapPage;