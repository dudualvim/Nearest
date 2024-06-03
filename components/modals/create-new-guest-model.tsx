"use client";

import * as z from "zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
import queryString from "query-string";
import { FileUpload } from "@/components/file-upload";
import { Lobby, Profile } from "@prisma/client";


interface InviteCodeProps {
    inviteCode: string,
    lobbyId: string,
    moderator: Profile,
    event: string,
}

export const CreateNewGuestModel = ({
    inviteCode,
    lobbyId,
    moderator,
    event
}: InviteCodeProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const router = useRouter();
    const origin = useOrigin();

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              setErro(`Erro ao obter a localização: ${error.message}`);
            }
          );
        } else {
          setErro('Geolocalização não suportada pelo seu navegador.');
        }
      }, []);

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "O nome do usuário é obrigatório"
        }),
        imageUrl: z.string().optional()
    });
    
    const form = useForm({
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (latitude !== null && longitude !== null) {
                const url = queryString.stringifyUrl({
                    url: `/api/socket/invite`,
                    query: {
                        inviteCode: inviteCode
                    }
                })
                
                await axios.post(url, {
                    name: values.name,
                    imageUrl: values.imageUrl,
                    longitude,
                    latitude
                });
                
                form.reset();
                router.push(`${origin}/lobby/${lobbyId}/map`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(!isMounted){
        return null;
    }
    
    return ( 
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Grupo criado por {moderator.name}
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {event}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}> 
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                                
                            <FormField 
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload 
                                                endpoint="lobbyImage"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage  />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <div className="space-y-8 px-6">
                            
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex">
                                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                Digite o seu nome
                                            </FormLabel>
                                            <p className="text-xs ml-2 font-medium text-red-700">Obrigatório</p>
                                        </div>
                                        <FormControl>
                                            <Input
                                            disabled={isLoading}
                                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                            placeholder="Seu nome"
                                            {...field}
                                            >
                                            </Input>
                                        </FormControl>
                                        <FormMessage  />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                                    <Button variant="primary" disabled={isLoading}>
                                        Entrar
                                    </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}