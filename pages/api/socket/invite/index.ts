import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { setCookie } from 'cookies-next';
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
){
    try {
        const { name, imageUrl, latitude, longitude } = req.body;
        const { inviteCode } = req.query;

        if(!inviteCode){
            return res.status(404).json({ message: "Invite não criado"});
        }

        let splittedName = name.split(" ");

        let image
        if(!imageUrl) {
            image = `https://ui-avatars.com/api/?name=${splittedName.join("+")}`
        } else {
            image = imageUrl
        }
        
        // Criando um perfil para o usuário
        const profile = await db.profile.create({
            data: {
                userId: uuidv4(),
                name,
                imageUrl: image,
                lat: latitude,
                lng: longitude,
                lobby: {
                    connect: {
                        inviteCode: inviteCode as string
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
            return res.status(404).json({ message: "Perfil não criado"});
        }

        setCookie('userId', profile.userId, { req, res });
        setCookie('lat', profile.lat, { req, res });
        setCookie('lng', profile.lng, { req, res });

        // Funcionando perfeitamente para a inclusão do marcador em tempo real
        const markerKey = `marker:${profile.lobbyId}:markers`; // markerKey
        
        const profileWithMarker = await db.profile.findFirst({
            where: {
                id: profile.id,
            }, 
            include: {
                markers: true,
            }
        })

        if (!profileWithMarker) {
            return res.status(404).json({ message: "Perfil não encontrado"});
        }

        // const profileAndMarkers = `profile:${profile.lobbyId}:markers`;
        const profileKey = `profile:${profile.lobbyId}:addProfile`; //addMarker

        res?.socket?.server?.io?.emit(markerKey, profileWithMarker.markers[0]);
        
        res?.socket?.server?.io?.emit(profileKey, profile);

        return res.status(200).json(profile);
    } catch (error) {
        console.log("[INVITE_POST_ERROR]", error);
        return res.status(500).json({ message: "Internal Error"});
    }
}