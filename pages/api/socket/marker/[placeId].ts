import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { Marker, Place } from "@prisma/client";
import { NextApiRequest } from "next";

/**
 * Rota que obtém todos os marcadores dos locais
 */

type MarkerWithPlaces = Marker & {
    place: Place
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
 try {
    const { placeId, lobbyId } = req.query;

    let placeMarkers: MarkerWithPlaces[] = [];

    placeMarkers = await db.marker.findMany({
        where: {
            place: {
                id: placeId as string,
            }
        },
        include: {
            place: true
        }
    });

    const lobby = await db.lobby.update({
        where: {
            id: lobbyId as string
        },
        data: {
            place: {
                connect: {
                    id: placeId as string
                }
            }
        },
    });

    const lobbyKey = `place:${lobbyId}:markers`;

    res?.socket?.server?.io?.emit(lobbyKey, placeMarkers);

    return res.status(200).json(placeMarkers);
 } catch(error){
    console.log("[MARKERS_PLACES_GET]", error);
    return res.status(500).json({ message: "Internal Error"});
 } 
}