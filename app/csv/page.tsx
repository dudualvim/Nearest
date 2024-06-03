import fs from 'fs';
import csv from 'csv-parser';
import { db } from '@/lib/db';

type Local = {
    Nome: string,
    Endereço: string,
    Latitude: number,
    Longitude: number,
    Categoria: string
}

const CSV = () => {
    
    const locais: Local[] = []
    
    
    function loadCSV(){
        fs.createReadStream('lugares_bsb.csv').pipe(csv())
        .on('data', (row) => {
            locais.push(row)
        }).on('end', () => {
            //console.log(locais);
            loadBD(locais);
        });       
    }

    loadCSV()
    console.log(locais)
    
    async function loadBD(locais: Local[]){
        for(const local of locais){
            try{ 
                // Verificar se já existe local com o nome
                const place = await db.place.findFirst({
                    where:{
                        name: local.Nome
                    }
                })
                
                if(place){
                    // Se sim, insere um novo marker
                    await db.marker.create({
                        data: {
                            placeId: place?.id,
                            address: local.Endereço,
                            lat: +local.Latitude,
                            lng: +local.Longitude,
                        }
                    })
                } else {
                     // Se não, cria o local e o marker
                    await db.place.create({
                        data: {
                            name: local.Nome,
                            markers:{
                                create: {
                                    address: local.Endereço,
                                    lng: +local.Longitude,
                                    lat: +local.Latitude
                                }
                            }
                        },
                    })
                }             
                
            } catch(error) {
                console.log('criação de um novo place', error)
            }
        } 
    }

    

    return (
        <h1>Importar CSV</h1>
    )
}

export default CSV