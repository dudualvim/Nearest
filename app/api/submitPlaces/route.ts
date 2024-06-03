import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // const { placeId, lobbyId } = req.body;
        // console.log('[Place]',placeId);
        // console.log('[Lobby]',lobbyId);
        console.log('teste');
        return NextResponse.json('ok');
    } catch (error) {
        console.log('[SUBMIT PLACES ERROR]', error);
        return new NextResponse('Internal Error', { status: 500});
    }
}