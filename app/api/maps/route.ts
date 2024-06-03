import { db } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as fs from 'fs';
import haversine from "@/algoritmo";

interface Locais {
    markerId: string,
    nome: string,
    latitude: number,
    longitude: number,
}

interface Usuarios {
    userId: string,
    latitude: number,
    longitude: number
}


export async function POST(req: Request, res: NextResponse){
    try {
        const { textQuery, lobbyId } = await req.json();
        const apiUrl = 'https://places.googleapis.com/v1/places:searchText';        
        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.iconMaskBaseUri, places.photos',
        };

        const locais: Locais[] = [];


        /**
         * 1 - Montar o array de usuários
         */

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

        /**
         * 2 - Verifica se existe o local na nossa base de dados
         * 3 - Se tiver o local na base de dados, não precisa consumir a API do Maps
         *     3.5 - Monta o array dos marcadores do local pesquisado]
         * 4 - Se não existir, consuma a API do Maps
         *      - Grava os dados no BD
         *      - Armazena o output da API em JSON
         *      - Monta o array dos marcadores do local pesquisado
         */
        
        const place = await db.place.findFirst({
            where: {
                name: textQuery
            }
        })

        if(!place){
            const ret = (await axios.post(apiUrl, {textQuery}, { headers })).data;
            const jsonData = JSON.stringify(ret, null, 2);
            fs.writeFileSync(`${textQuery.trim()}.json`, jsonData, 'utf8');
            
            let id = uuidv4();

            const place_created = await db.place.create({
                data: {
                    id: id,
                    name: textQuery,
                }
            });

             // Acessa o array "places" dentro do objeto único do JSON
            for (const key in ret){
                // Acessar cada objeto dentro do array "places"
                for (const obj of ret[key]){
                    // Posso obter a lat e lng com isso:
                    const marker = await db.marker.create({
                        data: {
                            lat: obj['location']['latitude'],
                            lng: obj['location']['longitude'],
                            address: obj['formattedAddress'],
                            placeId: id,
                        }
                    })

                    const plc = {
                        markerId: marker.id,
                        nome: textQuery,
                        latitude: obj['location']['latitude'],
                        longitude: obj['location']['longitude'],
                    }

                    locais.push(plc);
                }
            }      
            
        } else {
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
                    nome: place.name,
                    endereco: value.address,
                    latitude: value.lat,
                    longitude: value.lng,
                }
    
                locais.push(spot);
            })

        }

        /**
         * 
         * 5 - Chamar o algoritmo de haversine
         * 6 - Obter o melhor local e marcar ele no Maps.
         */

        console.log('---- Locais ----', locais)

        console.log('---- Usuarios ----', usuarios)

        const retorno = haversine(locais, usuarios)
  
        await db.lobby.update({
            where: {
                id: lobbyId
            },
            data:{
                nearestPlace: {
                    connect: {
                        id: retorno[0]['markerId']
                    }
                },
                result: JSON.stringify(retorno)
            }
        })

        // return new NextResponse('O marcador selecionado é: ' + markerId);
        return NextResponse.json(retorno)
        
        // Armazenei a response em um arquivo JSON para fazer testes
        // const ret = (await axios.post(apiUrl, { textQuery }, { headers })).data;
        // const jsonData = JSON.stringify(ret, null, 2);
        // fs.writeFileSync('output.json', jsonData, 'utf8');
        
        // return NextResponse.json(place);
    } catch (error) {
        console.log('[ROUTE.TS - ERRO]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}