"use client";

import { usePlaceQuery } from "@/hooks/use-place-query";
import { usePlaceSocket } from "@/hooks/use-place-socket";
import { Marker, Place, Profile } from "@prisma/client";
import { MarkerItem } from "./marker-item";
import { redirect } from "next/navigation";

/**
 * Obtém todos os marcadores via websocket e envia para o componente MarkerItem 
 */

type MarkerWithPlace = Marker & {
        place: Place | null
}

interface MarkerPlaceProps {
    apiUrl: string,
    paramKey: "lobbyId" | "placeId",
    paramValue: string,
    nearestPlace: MarkerWithPlace,
    lobbyId: string,
    profiles: Profile[]
}

export const MarkerPlaceMap = ({
    apiUrl,
    paramKey,
    paramValue,
    nearestPlace,
    lobbyId,
    profiles
}: MarkerPlaceProps) => {
    const queryKey = `place:${lobbyId}`;
    const lobbyKey = `place:${lobbyId}:markers`;
    const updateKey = `place:${lobbyId}:remove`;

    const {
        data
    } = usePlaceQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });

    usePlaceSocket({ queryKey, lobbyKey, updateKey });

    if (!(nearestPlace.place)){
        redirect('/');
    }

    return (
        <>
            {profiles?.map((profile,i) => (
                 <MarkerItem 
                    key={i}
                    type={"profile"}
                    title={profile.name}
                    lat = {profile.lat}
                    lng = {profile.lng}
                />
            ))}
            
            {nearestPlace && 
                <MarkerItem 
                    key={nearestPlace.id}
                    type={"place"}
                    image={nearestPlace.place.imageUrl as string}
                    title={nearestPlace.place.name}
                    lat = {nearestPlace.lat}
                    lng = {nearestPlace.lng}
                />
            }
        </>
    );
}