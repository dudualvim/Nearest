import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { RemovePlace } from "./remove-place"
import { DetailPageButton } from "./detail-page"

export const ResultNearestPlace = async () => {
    const profile = await currentProfile()

    const lobby = await db.lobby.findFirst({
        where: {
            profiles: {
                some: {
                    userId: profile?.userId
                }
            }
        },
        include: {
            profiles: true,
            nearestPlace: true
        }
    })

    if(!lobby) {
        redirect('/')
    }

    if(!lobby.profiles) {
        redirect('/')
    }
        
    const nearestPlace = lobby.nearestPlace

    if(!nearestPlace){
        redirect('/')
    }

    return (
        <>
        <div className=" fixed bottom-5 left-1/2 transform -translate-x-1/2 mt-2 flex flex-col content-baseline gap-x-2 rounded-md backdrop-blur-md dark:bg-slate-900/70  bg-white/70 p-4">
            <div className=" flex justify-center gap-2">
            
                <div className=" grid justify-items-center bg-zinc-100 dark:bg-slate-950 rounded-md p-2 mb-2">
                    <p className="font-bold">Local encontrado!</p>
                    <h1>{nearestPlace.address}</h1>
                </div>
                   
            </div>

            <div className="flex justify-center gap-2">
                {profile?.role === 'MODERATOR' && (
                    <RemovePlace 
                        lobbyId={lobby.id}
                        markerId={nearestPlace.id}
                        apiUrl={'/api/socket/marker/map'}
                    />
                )}

                <DetailPageButton />
            </div>
        </div>
        </>
    )
}