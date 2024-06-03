import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest){
    try {
        const { name, imageUrl, lat, lng, lobbyId } = await req.json();

        const user = await db.profile.create({
            data: {
                userId: uuidv4(),
                name,
                lat: +lat,
                lng: +lng,
                imageUrl,
                markers: {
                    create : {
                        lat: +lat,
                        lng: +lng,  
                    }
                },
                lobby: {
                    connect: {
                        id: lobbyId
                    }
                }
            }
        });

        if(!user){
            console.log('[USER_CRIAR]');
            return new NextResponse('Internal Error', { status: 500});
        }
        
        return new NextResponse('Sucesso ao criar o usuário', { status: 200});
    } catch (error) {
        console.log('[USER_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500});
    }
}