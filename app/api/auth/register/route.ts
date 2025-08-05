import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


// steps:
// get data from frontend
// validation
// existing user check
// create user in db
// return success response

export async function POST(request: NextRequest) {
    try {
        const {email, password} = await request.json();
        if(!email || !password) {
            return NextResponse.json({error: "Missing Email or Password"}, {status: 400});
        }
        await dbConnect();
        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
        const newUser = new User({email, password});
        await newUser.save();
        return NextResponse.json({message: "User created successfully"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Failed to create user"}, {status: 400});
    }
}
