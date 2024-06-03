import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Profile } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

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

    let profiles: Profile[] = [];

   
    profiles = await db.profile.findMany({
        where: {
            lobbyId: lobbyId,
        },
        orderBy: {
            createdAt: "asc",
        }
    })

    return NextResponse.json({
        items: profiles,
    });
 } catch(error){
    console.log("[PROFILES_GET]", error);

    return new NextResponse("Internal Error", {status: 500});
 } 
}