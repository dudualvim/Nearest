"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import axios from "axios";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "../emoji-picker";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1),
    imageUrl: z.string().min(1),
    lat: z.string().min(1),
    lng: z.string().min(1),
})

export const PlaceForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
            lat: '0',
            lng: "0",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try {
            await axios.post('/api/place', values);
            toast.success('O local foi inserido com sucesso');
        } catch (error) {
            console.log(error);
            toast.error(`${error}`);
       }
    }

    return (
        <div className="h-72 w-96 justify-center">
            <Card >
                <CardHeader>
                    <CardTitle>Cadastrar um local</CardTitle>
                    <CardDescription>Adicione um local</CardDescription>
                </CardHeader>
                <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField 
                                    control={form.control}
                                    name="name"
                                    render={({ field })=> (
                                        <FormItem>
                                            <FormLabel>
                                               Nome
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative p-4 pb-6">
                                                    <Input 
                                                        disabled={isLoading}
                                                        className="py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 "
                                                        placeholder={`Digite o nome do local`}
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}    
                                />
                                <FormField 
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field })=> (
                                        <FormItem>
                                            <FormLabel>
                                                Imagem
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative p-4 pb-6">
                                                    <Input 
                                                        disabled={isLoading}
                                                        className="py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 "
                                                        placeholder={`Digite o nome do local`}
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}    
                                />
                                <FormField 
                                    control={form.control}
                                    name="lat"
                                    render={({ field })=> (
                                        <FormItem>
                                            <FormLabel>
                                                Latitude
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative p-4 pb-6">
                                                    <Input 
                                                        disabled={isLoading}
                                                        className="py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 "
                                                        placeholder={`Digite a longitude do local`}
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}    
                                />
                                <FormField 
                                    control={form.control}
                                    name="lng"
                                    render={({ field })=> (
                                        <FormItem>
                                            <FormLabel>
                                                Longitude
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative p-4 pb-6">
                                                    <Input 
                                                        disabled={isLoading}
                                                        className="py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 "
                                                        placeholder={`Digite a latitude do local`}
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}    
                                />
                                <Button type="submit" className="flex-1" variant="primary">
                                    Enviar
                                </Button>
                            </form>
                        </Form>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
            <Toaster richColors />
        </div>
    )
}