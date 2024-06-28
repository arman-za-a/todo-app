import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { verifyToken } from "@/utils/auth";
const GET = async request => {
    try {
        await connectDB();
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "You are not signed in" }, { status: 401 });
        };
        const verifiedToken = verifyToken(token);
        if (!verifiedToken) {
            return NextResponse.json({ message: "You are not signed in" }, { status: 401 });
        };
        const { email } = verifiedToken;
        const user = await User.findOne({ email });
        return NextResponse.json(user, { status: 200 });
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
export { GET };