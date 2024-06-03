import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { db } from "@/lib/db";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import haversine from "@/algoritmo";
import h from "@/weiszfeld";

interface GooglePlace {
    name: string;
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    icon: string;
}

interface GooglePlacesResponse {
    results: GooglePlace[];
    next_page_token?: string;
}

interface Locais {
    markerId: string,
    nome: string,
    endereco: string,
    latitude: number,
    longitude: number,
}

interface Usuarios {
    userId: string,
    latitude: number,
    longitude: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
){
    try {
        const { textQuery, lobbyId } = req.body;

        const apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        const headers = {
            'Content-Type': 'application/json',
        };

        const locais: Locais[] = [];

        const usuarios: Usuarios[] = [];

        const users = await db.profile.findMany({
            where: {
                lobby:{
                    id: lobbyId,
                }
            }
        })

        users.forEach((value) => {
            const us = {
                userId: value.userId,
                latitude: value.lat,
                longitude: value.lng,
            }

            usuarios.push(us);
        })
        
        let allResults: GooglePlace[] = [];
        let nextPageToken: string | undefined = undefined;

        do {
                const params = {
                    query: textQuery,
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
                    pagetoken: nextPageToken,
                };

                const response = await axios.get(apiUrl, { params, headers });
                const data: GooglePlacesResponse = response.data;

                allResults = allResults.concat(data.results);
                nextPageToken = data.next_page_token;

                if (nextPageToken) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
        } while (nextPageToken);
        
        const place = await db.place.findFirst({
            where: {
                name: textQuery
            }
        })

        if(!place){
            
            const place_created = await db.place.create({
                data: {
                    id: uuidv4(),
                    name: textQuery,
                }
            });

            for (const obj of allResults) {
                const marker = await db.marker.create({
                    data: {
                        lat: obj.geometry.location.lat,
                        lng: obj.geometry.location.lng,
                        address: obj.formatted_address,
                        placeId: place_created.id,
                    }
                });

                locais.push({
                    markerId: marker.id,
                    nome: textQuery,
                    endereco: obj.formatted_address,
                    latitude: obj.geometry.location.lat,
                    longitude: obj.geometry.location.lng,
                });
            }
        } else {

            for (const obj of allResults) {

                const m = await db.marker.findFirst({
                    where:{
                        lat: obj.geometry.location.lat,
                        lng: obj.geometry.location.lng,
                        address: obj.formatted_address,
                    }
                })

                if(!m) {
                    var marker = await db.marker.create({
                        data: {
                            lat: obj.geometry.location.lat,
                            lng: obj.geometry.location.lng,
                            address: obj.formatted_address,
                            placeId: place.id,
                        }
                    });

                    locais.push({
                        markerId: marker.id,
                        nome: textQuery,
                        endereco: obj.formatted_address,
                        latitude: obj.geometry.location.lat,
                        longitude: obj.geometry.location.lng,
                    });

                } else {
                    locais.push({
                        markerId: m.id,
                        nome: textQuery,
                        endereco: m.address as string,
                        latitude: m.lat,
                        longitude: m.lng,
                    });
                }
        
            }

            const markers = await db.marker.findMany({
                where:{
                    place:{
                        id: place.id
                    }
                }
            })

            markers.forEach((value) => {
                const spot = {
                    markerId: value.id,
                    endereco: value.address,
                    nome: place.name,
                    latitude: value.lat,
                    longitude: value.lng,
                }
    
                locais.push(spot);
            })

        }

        console.log('---- Locais ----', locais)

        console.log('---- Usuarios ----', usuarios)
        
        const r = h(locais, usuarios)
        
        console.log('--- weiszfeld --- ')
        console.log(r)

        await db.lobby.update({
            where: {
                id: lobbyId
            },
            data:{
                nearestPlace: {
                    connect: {
                        id: r['localMaisProximo']['markerId']
                    }
                },
                result: JSON.stringify(r)
            }
        })

        const mapKey = `redirect:map`; // Chave para redirecionamento do mapa
        
        res?.socket?.server?.io?.emit(mapKey);

        return res.status(200).json('Ok!');
    } catch (error) {
        console.log("[REDIRECT_TO_MAP]", error);
        return res.status(500).json({ message: "Internal Error"});
    }
} 