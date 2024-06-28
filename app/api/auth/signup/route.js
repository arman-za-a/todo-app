import User from "@/models/user";
import validateUser from "@/validations/user";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { hashPassword, generateToken } from "@/utils/auth";
const POST = async request => {
    try {
        await connectDB();
        const data = await request.json();
        const isDataValid = validateUser(data);
        if (!isDataValid) {
            return NextResponse.json({ message: "Your data is invalid" }, { status: 422 });
        };
        const { email, password } = data;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        };
        const hashedPassword = await hashPassword(password);
        await User.create({ ...data, password: hashedPassword });
        const token = generateToken({ email });
        return NextResponse.json(
            { message: "You signed up successfully" }, 
            { status: 201, headers: { "Set-Cookie": token } }
        );
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
export { POST };