import { BackButton } from "@/components/details/back-button"
import GoogleMapsLink from "@/components/details/google-maps-link"
import WazeLink from "@/components/details/waze-link"
import Graph from "@/components/result/graph"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { Profile } from "@prisma/client"

const DetailPage = async () => {
    const profile = await currentProfile()

    const lobby = await db.lobby.findFirst({
        where: {
            profiles: {
                some: {
                    id: profile?.id
                }
            }
        },
        include: {
            nearestPlace: true,
            profiles: true,
        }
    })

    // Array com os pontos dos usuários do Lobby
    const userPoints: any[] = []

    lobby?.profiles.map((profile: Profile, i: number) => {
        userPoints.push({
            id: i,
            nome: profile.name,
            lat: profile.lat,
            lng: profile.lng,
        })
    })

    const place = await db.place.findFirst({
        where: {
            markers: {
                some: {
                    id: lobby?.nearestPlace?.id
                }
            }
        }
    })


    const json = JSON.parse(lobby?.result as string)
    
    const middlePoint = json['pontoMedio']
    const table = json['locais']

    if(typeof lobby?.nearestPlace?.lat !== 'number'){
        return ('/')
    }

    return (
        <>


            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white text-black dark:text-white dark:bg-slate-900 border-2 dark:border-slate-800 shadow rounded-lg p-6">
                            <BackButton />

                            <p className="font-bold">Endereço do Local</p>
                            <h1>{lobby?.nearestPlace?.address}</h1>
                            <h1>{place?.name}</h1>
                            <p className="font-bold mt-2">Direções</p>
                            
                            {typeof lobby?.nearestPlace?.lat === 'number' && typeof lobby?.nearestPlace?.lng === 'number'
                            && typeof profile?.lat === 'number' && typeof profile?.lng === 'number' && (
                                <>
                                    <GoogleMapsLink
                                        destinationLat={lobby?.nearestPlace?.lat}
                                        destinationLng={lobby?.nearestPlace?.lng}
                                        latitude={profile?.lat}
                                        longitude={profile?.lng}
                                    />
                                    <WazeLink
                                        destinationLat={lobby?.nearestPlace?.lat}
                                        destinationLng={lobby?.nearestPlace?.lng}
                                        latitude={profile?.lat}
                                        longitude={profile?.lng}
                                    />
                                </>
                            )}

                            
                        
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="w-[320px] h-[200px] md:w-[1070px] md:h-[500px] bg-white text-black dark:text-white dark:bg-slate-900 border-2 dark:border-slate-800 shadow rounded-lg p-6">
                            <Graph
                                userPoints={userPoints}
                                nearestPlace={lobby?.nearestPlace}
                                middlePoint={middlePoint}
                            /> 
                        </div>
                    </div>
                    <div className="col-span-full sm:col-span-full">
                        <div className="bg-white text-black dark:text-white dark:bg-slate-900 border-2 dark:border-slate-800 shadow rounded-lg p-6">


                            <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                                    <div className="h-[400px] ">
                                        <table className="min-w-full ">
                                            <thead className="bg-zinc-200 text-black dark:text-white dark:bg-slate-950 ">
                                                <tr>
                                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Nome</th>
                                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Endereço</th>
                                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left">Distância</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {table.map((item: any, i: any) => (
                                                item.endereco === lobby?.nearestPlace?.address ? (
                                                    <tr key={i} className="bg-white text-black dark:text-white dark:bg-slate-950/60 border-2 dark:border-sky-500">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{item.nome}</td>
                                                        <td className="text-sm font-bold px-6 py-4 whitespace-nowrap">{item.endereco}</td>
                                                        <td className="text-sm font-bold px-6 py-4 whitespace-nowrap">{item.distancia}</td>
                                                    </tr>
                                                ) : (
                                                    <tr key={i} className="bg-white text-black dark:text-white dark:bg-slate-950/60 border-b dark:border-sky-500">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.nome}</td>
                                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.endereco}</td>
                                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">{item.distancia}</td>
                                                    </tr>
                                                )
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPage