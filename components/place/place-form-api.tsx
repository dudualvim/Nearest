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
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1)
})

export const PlaceFormApi = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

        const request = {
            textQuery: values.name,
            fields: ['displayName', 'location', 'businessStatus'],
            includedType: 'restaurant',
            region: 'br',
            useStrictTypeFiltering: false,
        };
    
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