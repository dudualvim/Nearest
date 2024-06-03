import { db } from "@/lib/db";
import { Marker } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * Rota que obtém todos os marcadores para serem desenhados no Maps
 */

export async function GET(
    req: Request
) {
 try {
    const { searchParams } = new URL(req.url);

    const lobbyId = searchParams.get("lobbyId");

    let markers: Marker[] = [];

    markers = await db.marker.findMany({
        where: {
            profile: {
                lobbyId: lobbyId as string,
            },
        },
        include: {
            profile: true,
        }
    })

    return NextResponse.json({
        items: markers,
    });
 } catch(error){
    console.log("[MARKERS_GET]", error);

    return new NextResponse("Internal Error", {status: 500});
 } 
}