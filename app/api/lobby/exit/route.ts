import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { deleteCookie, hasCookie } from "cookies-next";
import { currentProfile } from "@/lib/current-profile";

export async function DELETE(
    req: Request
){
    try {
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Profile não existe", {status: 400});
        }

        await db.profile.delete({
            where: {
                id: profile.id as string
            }

        })

        if(hasCookie('userId') && hasCookie('lat') &&  hasCookie('lng') ){
            deleteCookie('userId');
            deleteCookie('lat');
            deleteCookie('lng');
        }
        
        return new NextResponse("Perfil excluído com sucesso.", {status: 200});
    } catch (error) {
        console.log("[EXIT_ERROR]", error);
        return new NextResponse("Erro ao sair do lobby", {status: 500});
    }

}