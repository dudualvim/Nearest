
import {db} from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const initialProfile = async() =>{
    const cookieStore = cookies();
    const userId = cookieStore.get('userId');
    const hasCookie = cookies().has('userId');

    if(!hasCookie){
        const profile = await db.profile.findFirst({
            where:{
                userId: 'a8d4cea8-b7b6-4675-b537-6a46e8a042fe',
            }
        })
        return profile;
    }
    
    const profile = await db.profile.findFirst({
        where:{
            userId: userId?.value,
        }
    })
    return profile;
}