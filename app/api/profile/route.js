import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { verifyPassword, verifyToken } from "@/utils/auth";
import { validateName, validatePassword } from "@/validations/user";
const PATCH = async request => {
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
        const { firstname, lastname, password } = await request.json();
        const isDataValid = validatePassword(password) && validateName(firstname) && validateName(lastname);
        if (!isDataValid) {
            return NextResponse.json({ message: "Your data is invalid" }, { status: 422 } );
        };
        const isPasswordVerified = await verifyPassword(password, user.password);
        if (!isPasswordVerified) {
            return NextResponse.json({ message: "Password is incorrect" }, { status: 422 });
        };
        await User.updateOne({ _id: user.id }, { $set: { firstname, lastname } });
        return NextResponse.json({ message: "Your profile edited successfully" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
export { PATCH };