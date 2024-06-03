"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import { toast, useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    pin: z.number().optional(),
})

export default function Search() {
    const router = useRouter()
    const origin = useOrigin()
    const form = useForm()
    const { toast } = useToast()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const lobby = await axios.post('/api/pin', values);
            
            if(lobby['data'].inviteCode){
                router.push(`${origin}/invite/${lobby['data'].inviteCode}`);
            } else {
                toast({
                    title: "A sala virtual não foi encontrada",
                    description: 'Verifique se o PIN foi digitado corretamente'
                })
            }
        } catch (error) {
            toast({
                title: "A sala virtual não foi encontrada",
                description: 'Verifique se o PIN foi digitado corretamente'
            })
        }
    }
    
    return (
            <div className=" mt-10 px-5 sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className=" bg-white py-10 rounded-lg px-5 shadow">
                    <div className="mt-1">
                        <div  className="space-y-8">
                            <div className="space-y-8 px-6">
                            <Form {...form}> 
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                       
                            <FormField 
                                control={form.control}
                                name="pin"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-2 focus-visible:ring-blue-600 transition text-black focus-visible:ring-offset-0"
                                                placeholder="Digite o PIN da Sala"
                                                {...field}
                                                >
                                            </Input>
                                        </FormControl>
                                        <FormMessage  />
                                    </FormItem>
                                )}
                            />

                        
                        <button className="w-full h-10 shadow rounded-lg text-white bg-[#007dfe] dark:bg-slate-900 border-2 hover:border-sky-500 border-sky-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                                    <p className="font-bold">Entrar</p>
                        </button>   
                        
                    </form>
                </Form>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>


                
    )
}