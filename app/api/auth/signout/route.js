import { NextResponse } from "next/server";
import { serialize } from "cookie";
const GET = async () => {
    return NextResponse.json(   
        { message: "You signed out successfully" }, 
        { status: 200, headers: { "Set-Cookie": serialize("token", "", { path: "/", maxAge: 0 }) } 
    });
};
export { GET };