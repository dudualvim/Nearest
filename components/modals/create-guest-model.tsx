"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogHeader,
    DialogClose
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FileUpload } from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
    userName: z.string().min(1, {
        message: "Nome do usuário é obrigatório."
    }),
    eventName: z.string().min(1, {
        message: "Nome do evento é obrigatório"
    }),
    imageUrl: z.string().optional()
});

export const CreateGuestModel = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "createGuestModel";

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            eventName: "",
            imageUrl: "",
        }
    });

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

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            /**
             * Criar um PROFILE e um LOBBY para ele
             *  */           
            if (latitude !== null && longitude !== null) {
                await axios.post('/api/lobby', {
                    userName: values.userName,
                    eventName: values.eventName,
                    imageUrl: values.imageUrl,
                    lat: latitude,
                    lng: longitude,
                });
            }
            
            onClose()

            form.reset();
          
            router.push(`/lobby`);
            
        } catch(error) {
            onClose()
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }
    
    return (
        <>
            <Dialog open={isModalOpen} onOpenChange={handleClose} >
                    <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Criar uma nova sala
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Criaremos uma sala especial para você e os seus convidados
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
                                    name="userName"
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
                                                placeholder="Seu nome e sobrenome"
                                                {...field}
                                                >
                                                </Input>
                                            </FormControl>
                                            <FormMessage  />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-8 px-6">
                                <FormField 
                                    control={form.control}
                                    name="eventName"
                                    render={({field}) => (
                                        <FormItem>
                                            <div className="flex">
                                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                                    Digite o nome do evento
                                                </FormLabel>
                                                <p className="text-xs ml-2 font-medium text-red-700">Obrigatório</p>
                                            </div>
                                            <FormControl>
                                                <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nome do evento/confraternização/encontro..."
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
                                            Criar
                                        </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </> 
    )
}