import { useSocket } from "@/components/providers/socket-provider"
import { Marker, Place } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type PlaceSocketProps = {
    queryKey: string,
    lobbyKey: string,
    updateKey: string,
}

type MarkerWithPlaces = Marker & {
    place: Place
}

export const usePlaceSocket = ({
    queryKey,
    lobbyKey,
    updateKey
}: PlaceSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if(!socket) {
            return;
        }

        socket.on(lobbyKey, (markers: MarkerWithPlaces[]) => {
            markers.forEach((marker: MarkerWithPlaces) => {
                queryClient.setQueryData([queryKey], (oldData: any) => {
                    if(!oldData || !oldData.pages || oldData.pages.length === 0){ 
                        return {
                            pages: [{
                                items: [marker],
                            }]
                        }
                    }
    
                    const newData = [...oldData.pages];
    
                    newData[0] = {
                        ...newData[0],
                        items: [
                            marker,
                            ...newData[0].items,
                        ]
                    };
    
                    return {
                        ...oldData,
                        pages: newData,
                    };
                });
            })
        });
        
        socket.on(updateKey, () => {
            queryClient.resetQueries({queryKey: [queryKey], exact: true})
        });

        return () => {
            socket.off(queryKey);
            socket.off(lobbyKey);
            socket.off(updateKey);
        }
    }, [queryClient, queryKey, updateKey, lobbyKey, socket]);
}