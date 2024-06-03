import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message, Profile } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type MessageWithProfile = Message & {
    profile: Profile
}

export async function GET(
    req: Request
) {
 try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const lobbyId = searchParams.get("lobbyId");

    if (!profile) {
        return redirect('/');
    }

    if (!lobbyId) {
        return new NextResponse("Lobby ID missing", {status: 400});
    }

    let messages: MessageWithProfile[] = [];
    
        
    messages = await db.message.findMany({
        where: {
            lobbyId
        },
        include: {
            profile: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return NextResponse.json({
        items: messages
    });
 } catch(error){
    console.log("[MESSAGES_GET]", error);

    return new NextResponse("Internal Error", {status: 500});
 } 
}