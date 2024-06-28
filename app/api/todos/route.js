import User from "@/models/user";
import Todo from "@/models/todo";
import validateTodo from "@/validations/todo";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { verifyToken } from "@/utils/auth";
import { todoStatuses } from "@/constants/array";
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
        let todos = {};
        for (const status of todoStatuses) {
            todos[status] = await Todo.find({ user: user._id, status }, "title");
        };
        return NextResponse.json(todos, { status: 200 });
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
const POST = async request => {
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
        const data = await request.json();
        const isDataValid = validateTodo(data);
        if (!isDataValid) {
            return NextResponse.json({ message: "Todo data is not valid" }, { status: 422 });
        };
        const { title, status } = data;
        await Todo.create({ user: user._id, title, status });
        return NextResponse.json({ message: "Todo added successfully" }, { status: 201 });
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
export { GET, POST };