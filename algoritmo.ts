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

const haversine = (locais: Locais[], usuarios: Usuarios[]) => {
    const media_latitude = usuarios.reduce((acc, user) => acc + user.latitude, 0) / usuarios.length;
    const media_longitude = usuarios.reduce((acc, user) => acc + user.longitude, 0) / usuarios.length;
    const raio_terra = 6371; // Raio médio da Terra em quilômetros

    console.log(`\nA media da Latitude: ${media_latitude}\nA media da Longitude: ${media_longitude}\n`);

    const locaisProvaveis: any[] = []

    let local_mais_proximo = null;
    let distancia_mais_curta = Number.POSITIVE_INFINITY;

    for (const local of locais) {
        const { latitude: latitude_local, longitude: longitude_local } = local;

        // Cálculo da distância usando a fórmula de Haversine
        const delta_lat = toRadians(latitude_local - media_latitude);
        const delta_lon = toRadians(longitude_local - media_longitude);
        const a = Math.sin(delta_lat / 2) ** 2 + Math.cos(toRadians(media_latitude)) * Math.cos(toRadians(latitude_local)) * Math.sin(delta_lon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distancia = raio_terra * c;

        const cProv = {
            nome: local.nome,
            endereco: local.endereco,
            distancia: distancia
        }

        locaisProvaveis.push(cProv)

        // Verifica se a distância atual é menor do que a distância mais curta encontrada até agora
        if (distancia < distancia_mais_curta) {
            distancia_mais_curta = distancia;
            local_mais_proximo = local;
        }
    }

    // Calcular a distância do local mais próximo para todos os usuários do lobby
    const retorno: any[] = []

    const markerId = local_mais_proximo?.markerId

    const local_proximo = {
        markerId: markerId
    }

    retorno.push(local_proximo)

    const distancias: any[] = []

    for (const usuario of usuarios) {
        let x1 = usuario.latitude
        let x2 = local_mais_proximo?.latitude
        
        let y1 = usuario.longitude
        let y2 = local_mais_proximo?.longitude

        if (x2 && y2){
            let dLat = toRadians(x2 - x1)
            let dLon = toRadians(y2 - y1)

            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(x1)) * Math.cos(toRadians(x2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            
            const d = raio_terra * c;

            distancias.push({
                userId: usuario.userId,
                distancia: d.toFixed(2)
            })
        }

    }

    retorno.push(distancias)
    retorno.push(locaisProvaveis)

    // Função auxiliar para converter graus em radianos
    function toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    return retorno
}

export default haversine;
