import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const { name, imageUrl, lat, lng } = await req.json();

        const existingPlace = await db.place.findFirst({
            where: {
                name: name,
            }
        })

        if (existingPlace) {
            await db.marker.create({
                data: {
                    lat: +lat,
                    lng: +lng,
                    placeId: existingPlace.id
                }
            })

            return new NextResponse("O marcador foi criado para o local.", {status: 200})
        } 

        const place = await db.place.create({
            data: {
                name,
                imageUrl,
                markers: {
                    create : {
                        lat: +lat,
                        lng: +lng,  
                    }
                }
            }
        })


        if (!place) {
            return new NextResponse("Place creation error", {status: 500})
        }

        return new NextResponse("O local e o marcador foram criados", {status: 200})
    } catch (error) {
        console.log("[PLACE_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}