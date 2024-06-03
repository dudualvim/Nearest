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
            const {  content } = req.body;
            const { profileId } = req.query;

            const profile = await db.profile.findUnique({
                where: {
                    id: profileId as string,
                }
            });

            if (!profile) {
                return res.status(401).json({ error: "Unauthorized"});
            }

            if (!content) {
                return res.status(400).json({ error: "Content missing"});
            }
            
            const marker = await db.marker.create({
                data:{
                    lat: content.lat,
                    lng: content.lng,
                    profileId: profile.id,
                }, 
                include: {
                    profile: true,
                }
            });

            const markerKey = `marker:${marker.id}:spots`;

            console.log(markerKey);

            res?.socket?.server?.io?.emit(markerKey, marker);

            return res.status(200).json(marker);
            
        } catch (error) {
            console.log("[MARKER_POST]", error);
            return res.status(500).json({ message: "Internal Error"});
        }
}