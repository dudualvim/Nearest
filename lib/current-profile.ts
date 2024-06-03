import { db } from "@/lib/db";
import { getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";

export const currentProfile = async () => {
    const userId = getCookie('userId', { cookies });

    if (!userId) {        
        return null
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: userId,
        }
    });


    return profile;
}