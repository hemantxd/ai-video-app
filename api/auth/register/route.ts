import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await dbConnect();
    } catch (error) {
        console.log(error);
    }
}

// 1:09:20