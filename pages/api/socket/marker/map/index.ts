import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    try{ 
        const { lobbyId, markerId } = req.body;

        const lobby = await db.lobby.findUnique({
            where: {
                id: lobbyId as string
            },
            include:{
                nearestPlace: true
            }
            
        });

        if (!lobby) {
            return res.status(404).json({message: "Lobby não encontrado"});
        }

        if (!lobby.nearestPlace) {
            return res.status(404).json({message: "No lobby não há lugares selecionados"});
        }
        
        const updatedLobby = await db.lobby.update({
            where: {
                id: lobbyId as string
            },
            data: {
                nearestPlace: {
                    disconnect: {
                        id: markerId as string
                    }
                },
                result: null
            }
        });

        const returnMapKey = `return:search:map`; // Chave para voltar para a tela de waiting
        
        res?.socket?.server?.io?.emit(returnMapKey);

        return res.status(200).json('Ok!');
    } catch (error) {
        console.log("[LOBBY_UPDATE_ERROR]", error);
        return res.status(500).json({message: "Internal Error"});
    }
}