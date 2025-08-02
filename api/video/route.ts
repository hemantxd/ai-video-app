import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { create } from "domain";
import { getServerSession } from "next-auth";
import { transform } from "next/dist/build/swc/generated-native";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        await dbConnect();
        const videos = await Video.find({}).sort({createdAt: -1}).lean()

        if(!videos || videos.length === 0) {
            return NextResponse.json([], {status: 200});
        } else {
            return NextResponse.json(videos, {status: 200});
        }
    } catch (error) {
        return NextResponse.json({error: "Failed to get videos"}, {status: 400});
    }

}

export async function POST(request: NextRequest) {
    try {

        const session = await getServerSession(authOptions)

        if(!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        await dbConnect();


        const body : IVideo = await request.json();
        
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            return NextResponse.json({error: "Missing fields"}, {status: 400});
        }

        const videoData = {
            ...body,
            controls : body?.controls ?? true,
            transformations: {
                height: 1080,
                width: 1920,
                quality: body?.transformations?.quality ?? 100
            }
        }

        const newVideo = await Video.create(videoData);

        return NextResponse.json(newVideo, {status: 201});
    } catch (error) {
        return NextResponse.json({error: "Failed to create video"}, {status: 400});
    }
}
