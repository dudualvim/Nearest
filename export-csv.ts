import fs from 'fs';
import csv from 'csv-parser';

type Local = {
    Nome: string,
    Endereço: string,
    Latitude: number,
    Longitude: number,
    Categoria: string
}

export const exportCsv = () => {
    let locais: Local[] = []

    fs.createReadStream('lugares_bsb.csv').pipe(csv())
      .on('data', (row) => {
        console.log(locais)
        locais.push(row)
    })

    return locais
}