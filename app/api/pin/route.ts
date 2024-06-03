import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const { pin } = await req.json();

        var lobbyPin: number = +pin;   



        const lobby = await db.lobby.findFirst({
            where: {
                pin: lobbyPin,
            }
        })

        if(lobby){
            return NextResponse.json({
                inviteCode: lobby.inviteCode
            })
        }

     
        return new NextResponse("Lobby não encontrado", {status: 500})
    } catch (error) {
        console.log("[PLACE_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}