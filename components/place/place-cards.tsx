'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Place } from "@prisma/client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface PlaceCardsProps {
    lobbyId: string
    profileId: string
    places: Place[]
}

export const PlaceCards = ({
    lobbyId,
    profileId,
    places
}: PlaceCardsProps) => {
    const router = useRouter()
    const path = usePathname()

    const click = async ( place: Place ) => {
        try {
            const ret = await axios.post('/api/socket/maps', { textQuery: place.name, lobbyId: lobbyId });
            
            router.push(`${path}` + '/map2')
        } catch (error){
            console.log(error);
        }
    }

    return (
        <div className="p-3 rounded-md border-none mt-7 bg-white dark:bg-slate-900 dark:text-white">
            <Accordion type="single" defaultValue="item-1" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="w-full">
                        <div className="w-full">
                            Locais recomendados
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-none">
                        <ScrollArea className="w-full h-[500px]">
                            <div className="p-2 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4">
                                    {places.map((place: Place) => (
                                        <div 
                                            onClick={() => click(place)}
                                            key={place.id} 
                                            className="text-center hover:shadow-md hover:border-opacity-0 cursor-pointer">
                                            <div className="shadow rounded-lg dark:hover:border-[#007dfe] text-gray-900 bg-white dark:bg-slate-900 border-2 hover:border-[#007dfe] dark:border-slate-800 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ">
                                                <div className="text-center py-16 px-4 ">
                                                    <h5 className="md:text-lg font-bold t dark:text-white">{place.name}</h5>
                                                </div>
                                            </div>                                            
                                        </div>
                                    ))}
                            </div>
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}