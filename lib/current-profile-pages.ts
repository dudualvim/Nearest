import { db } from "@/lib/db";
import { getCookie, hasCookie } from 'cookies-next';
import { cookies } from "next/headers";


export const currentProfilePages = async () => {
    'use server';
    const userId = getCookie('userId', { cookies });
    
    if (!userId) {
        const profile = await db.profile.findUnique({
            where: {
                userId: "a8d4cea8-b7b6-4675-b537-6a46e8a042fe",
            }
        });
        
        return profile;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: userId,
        }
    });

    return profile;
}