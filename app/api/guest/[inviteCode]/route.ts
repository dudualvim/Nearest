import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { setCookie } from 'cookies-next';
import { cookies } from "next/headers";

export async function POST(
    req: Request,
    { params }: { 
        params: { 
            inviteCode: string
        } 
    }
){
    try {
        const { name, latitude, longitude } = await req.json();
        let splittedName = name.split(" ");

        // Criando um perfil para o usuário
        const profile = await db.profile.create({
            data: {
                userId: uuidv4(),
                name,
                imageUrl: `https://ui-avatars.com/api/?name=${splittedName.join("+")}`,
                lat: latitude,
                lng: longitude,
                lobby: {
                    connect: {
                        inviteCode: params.inviteCode
                    }
                },
                markers: {
                    create: {
                        lat: latitude,
                        lng: longitude,
                    }
                }
            }, 
        })

        if (!profile) {
            return new NextResponse("Erro ao criar usuário", {status: 400});
        }

        setCookie('userId', profile.userId, { cookies });
        setCookie('lat', profile.lat, { cookies });
        setCookie('lng', profile.lng, { cookies });
        
        return new NextResponse("OK", {status: 200});
    } catch (error) {
        console.log(error);
    }
}