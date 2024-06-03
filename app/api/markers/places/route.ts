import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { Marker, Place } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * Rota que obtém todos os marcadores dos locais
 */

type placeMarkers = Marker & {
    place: Place
}

export async function GET(
    req: Request,
    res: NextApiResponseServerIo,
) {
 try {
    // const placeId = req.nextUrl.searchParams.get('placeId');
    const { searchParams } = new URL(req.url);

    const lobbyId = searchParams.get("lobbyId");

    let placeMarkers: placeMarkers[] = [];

    const lobby = await db.lobby.findUnique({
        where: {
            id: lobbyId as string,
        },
        include: {
            place: true
        }
    })

    if(!lobby){
        return new NextResponse("Lobby não existe", {status: 404});
    }
    
    const placeId = lobby.place?.id;

    if(placeId === undefined) {
        return NextResponse.json({
            items: placeMarkers,
        }); 
    } else {
        placeMarkers = await db.marker.findMany({
            where: {
                place: {
                    id: placeId as string,
                }
            },
            include: {
                place: true
            }
        })
    }

    return NextResponse.json({
        items: placeMarkers,
    });
 } catch(error){
    console.log("[MARKERS_PLACES_GET]", error);

    return new NextResponse("Internal Error", {status: 500});
 } 
}