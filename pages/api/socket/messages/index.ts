import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
    ) {
        if (req.method !== "POST"){
            return res.status(405).json({error: "method not allowd"});
        }
        
        try {
            const {  content, fileUrl } = req.body;
            const { lobbyId, profile } = req.query;

            if (!lobbyId) {
                return res.status(400).json({ error: "Lobby ID missing"});
            }

            if (!content) {
                return res.status(400).json({ error: "Content missing"});
            }
            
            const message = await db.message.create({
                data:{
                    content,
                    fileUrl,
                    lobbyId: lobbyId as string,
                    profileId: profile as string,
                }, 
                include: {
                    profile: true  
                }
            });

            const lobbyKey = `chat:${lobbyId}:messages`;

            res?.socket?.server?.io?.emit(lobbyKey, message);

            return res.status(200).json(message);
            
        } catch (error) {
            console.log("[MESSAGES_POST]", error);
            return res.status(500).json({ message: "Internal Error"});
        }
}