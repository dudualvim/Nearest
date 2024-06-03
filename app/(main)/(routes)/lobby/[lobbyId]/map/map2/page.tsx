import { MapGuestReturn } from "@/components/map/map-guest-return";
import { MapWrapper } from "@/components/map/map-wrapper";
import { MarkerPlaceMap } from "@/components/map/marker-place-map";
import { RemovePlace } from "@/components/map/remove-place";
import { ResultNearestPlace } from "@/components/map/result-nearest-place";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

const Map2 = async () => {
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
            place: true,
            profiles: true,
            nearestPlace: true
        }
    })

    if(!lobby) {
        return redirect('/');
    }

    if (!lobby.result){
        redirect(`/lobby/${lobby.id}/map`)
    }

    let isPlaceSelected: boolean = false;

    if (lobby.place !== undefined) {
        isPlaceSelected = true;
    }

    const nearestPlace = await db.marker.findFirst({
        where: {
            id: lobby?.nearestPlace?.id
        },
        include: {
            place: true
        }
    })

    if (!nearestPlace){
        redirect(`/lobby/${lobby.id}/map`)
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0">
            {/**
             * TODO: Atualizar o centro do mapa para o local escolhido automaticamente
             * Ajustar o zoom dinamicamente também!
             * 
             */}
            <MapWrapper
                profileLat = {profile.lat}
                profileLng = {profile.lng}
                lat = {nearestPlace.lat}
                lng = {nearestPlace.lng}
            >
                {/* Para usar os usuários em tempo real, deve-se utilizar este:
                <MarkerMap 
                    apiUrl="/api/markers"
                    lobbyId={lobby.id}
                    paramKey="lobbyId"
                    paramValue={lobby.id}
                    profile={profile}
                /> */}

                <ResultNearestPlace />

                {profile.role === MemberRole.GUEST && (
                    <MapGuestReturn/>
                )}
            

                <MarkerPlaceMap 
                    apiUrl="/api/markers/places"
                    paramKey="lobbyId"
                    paramValue={lobby.id}
                    lobbyId={lobby.id}
                    nearestPlace={nearestPlace}
                    profiles={lobby.profiles}
                />
                {profile.role === MemberRole.MODERATOR && (
                    <RemovePlace
                        lobbyId={lobby.id}
                        markerId={nearestPlace?.id}
                        apiUrl={'/api/socket/marker/map'} 
                    />
                )}

                
                
            </MapWrapper>   
        </div>
    )
}

export default Map2