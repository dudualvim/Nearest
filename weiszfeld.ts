interface Local {
    markerId: string;
    nome: string;
    endereco: string;
    latitude: number;
    longitude: number;
}

interface Usuario {
    userId: string;
    latitude: number;
    longitude: number;
}

const haversine = (locais: Local[], usuarios: Usuario[]) => {
    const raioTerra = 6371; // Raio médio da Terra em quilômetros

    const locaisProvaveis: any[] = []

    // Função para calcular a distância usando a fórmula de Haversine
    const calcularDistanciaHaversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
        const deltaLat = toRadians(lat2 - lat1);
        const deltaLon = toRadians(lon2 - lon1);
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return raioTerra * c;
    };

    // Função para calcular o ponto médio ponderado usando o algoritmo de Weiszfeld
    const calcularPontoMedioWeiszfeld = (usuarios: Usuario[], tolerancia = 1e-6, maxIteracoes = 1000): { latitude: number, longitude: number } => {
        const n = usuarios.length;
        let P = {
            latitude: usuarios.reduce((sum, user) => sum + user.latitude, 0) / n,
            longitude: usuarios.reduce((sum, user) => sum + user.longitude, 0) / n
        };

        for (let iter = 0; iter < maxIteracoes; iter++) {
            let numLat = 0, numLon = 0, denom = 0;

            for (const user of usuarios) {
                const distancia = calcularDistanciaHaversine(P.latitude, P.longitude, user.latitude, user.longitude) || 1e-10; // Evitar divisão por zero
                numLat += (user.latitude / distancia);
                numLon += (user.longitude / distancia);
                denom += (1 / distancia);
            }

            const P_prev = { ...P };
            P.latitude = numLat / denom;
            P.longitude = numLon / denom;

            // Verificar convergência
            if (calcularDistanciaHaversine(P.latitude, P.longitude, P_prev.latitude, P_prev.longitude) < tolerancia) {
                break;
            }
        }

        return P;
    };

    // Encontrar o ponto médio usando Weiszfeld
    const pontoMedio = calcularPontoMedioWeiszfeld(usuarios);

    // Encontrar o local mais próximo ao ponto médio
    let localMaisProximo = null;
    let distanciaMaisCurta = Number.POSITIVE_INFINITY;

    for (const local of locais) {
        const distancia = calcularDistanciaHaversine(pontoMedio.latitude, pontoMedio.longitude, local.latitude, local.longitude);
        if (distancia < distanciaMaisCurta) {
            distanciaMaisCurta = distancia;
            localMaisProximo = local;
        }

        const cProv = {
            nome: local.nome,
            endereco: local.endereco,
            distancia: distancia
        }

        locaisProvaveis.push(cProv)
    }

    // Calcular a distância do local mais próximo para todos os usuários do lobby
    const distanciasUsuarios: { userId: string, distancia: number }[] = [];

    for (const usuario of usuarios) {
        const distancia = calcularDistanciaHaversine(localMaisProximo.latitude, localMaisProximo.longitude, usuario.latitude, usuario.longitude);
        distanciasUsuarios.push({
            userId: usuario.userId,
            distancia: parseFloat(distancia.toFixed(2))
        });
    }

    return {
        localMaisProximo: localMaisProximo,
        pontoMedio: pontoMedio,
        distanciasUsuarios: distanciasUsuarios,
        locais: locaisProvaveis
    };
};

export default haversine;
