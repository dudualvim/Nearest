import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { setCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function POST(req: Request){
    try {
        const { userName, imageUrl, eventName, lat, lng } = await req.json();

        /**
         * Rota responsável por:
         * Cria um PROFILE
         * Cria o MARKER do usuário
         * Cria um LOBBY para o PROFILE
         * Gera um PIN aleatório para o Lobby
        */

        let verifyPin: boolean = true
        
        let pin = 0
        while(verifyPin){
            pin = Math.floor(10000 + Math.random() * 90000)
    
            const pinExists = await db.lobby.findFirst({
                where: {
                    pin: pin,
                }
            })
            
            if (!pinExists){
                verifyPin = false
            }
        }


        let splittedName = userName.split(" ");
        let image = imageUrl ?? `https://ui-avatars.com/api/?name=${splittedName.join("+")}`

        const lobby = await db.lobby.create({
            data: {
                name: eventName,
                inviteCode: uuidv4(),
                pin: pin,
                profiles: {
                    create: {
                        userId: uuidv4(),
                        name: userName,
                        imageUrl: image,
                        lat: lat,
                        lng: lng,
                        role: MemberRole.MODERATOR,
                        markers: {
                            create: {
                                lat: lat,
                                lng: lng,
                            }
                        }
                    }
                }
            }
        })

        if (!lobby) {
            return new NextResponse("Erro ao criar um lobby", {status: 400});
        }

        const profile = await db.profile.findFirst({
            where: {
                lobbyId: lobby.id,
            }
        })

        if (!profile) {
            return new NextResponse("Erro ao criar o perfil do usuário", {status: 400});
        }
        
        setCookie('userId', profile.userId, { cookies });
        setCookie('lat', profile.lat, { cookies });
        setCookie('lng', profile.lng, { cookies });
        
        return NextResponse.json(lobby);
    } catch (error) {
        console.log(error);
    }
}