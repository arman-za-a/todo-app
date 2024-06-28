import User from "@/models/user";
import validateUser from "@/validations/user";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { verifyPassword, generateToken } from "@/utils/auth";
const POST = async request => {
    try {
        await connectDB();
        const data = await request.json();
        const isDataValid = validateUser(data);
        if (!isDataValid) {
            return NextResponse.json({ message: "Your data is invalid" }, { status: 422 });
        };
        const { email, password } = data;
        const user  = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        };
        const isPasswordVerified = await verifyPassword(password, user.password);
        if (!isPasswordVerified) {
            return NextResponse.json({ message: "Email or password is incorrect" }, { status: 422 });
        };
        const token = generateToken({ email });
        return NextResponse.json(
            { message: "You signed in successfully" }, 
            { status: 200, headers: { "Set-Cookie": token } }
        );
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
export { POST };