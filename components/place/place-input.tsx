"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Place } from "@prisma/client";
import axios from "axios";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { PlaceCards } from "./place-cards";

const formSchema = z.object({
    name: z.string().min(1)
})

interface PlaceInputInterface {
    lobbyId: string
    profileId: string
    places: Place[]
}

export const PlaceInput = ({
    lobbyId,
    profileId,
    places
}: PlaceInputInterface) => {
    const router = useRouter()
    const path = usePathname()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
                  
        try {
            const ret = await axios.post('/api/socket/maps', { textQuery: values.name, lobbyId: lobbyId });
            
            router.push(`${path}` + '/map2')
        } catch (error){
            console.log(error);
        }
    }

   
    return (
        <div className="container">
            <div className="p-3 rounded-md mt-7 bg-white dark:bg-slate-900 dark:text-white">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field })=> (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex md:flex md:flex-row w-full items-center space-x-2">
                                            <Search className="size-6" />
                                            <Input 
                                                disabled={isLoading}
                                                className=" bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 m-2"
                                                placeholder={`Digite o nome do local ou selecione um local recomendado abaixo`}
                                                {...field}
                                            />
                                            <button className="items-center w-full md:w-[100px]  h-10 text-white shadow rounded-lg bg-[#007dfe] dark:bg-slate-900 border-2 hover:border-sky-500 border-sky-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                                                <p className="font-semibold">Pesquisar</p>

                                            </button>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}    
                        />
                    </form>
                </Form>
            </div>

            <PlaceCards profileId={profileId} lobbyId={lobbyId} places={places} />
        </div>
    )
}