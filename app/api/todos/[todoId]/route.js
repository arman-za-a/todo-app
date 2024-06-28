import Todo from "@/models/todo";
import validateTodo from "@/validations/todo";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { verifyToken } from "@/utils/auth";
const GET = async (request, { params }) => {
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
        const { todoId } = params;
        if (!isValidObjectId(todoId)) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        const todo = await Todo.findOne({ _id: todoId }, "title status");
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        return NextResponse.json(todo, { status: 200 });
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
const PATCH = async (request, { params }) => {
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
        const data = await request.json();
        const isDataValid = validateTodo(data);
        if (!isDataValid) {
            return NextResponse.json({ message: "Todo data is not valid" }, { status: 422 });
        };
        const { todoId } = params;
        if (!isValidObjectId(todoId)) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        const todo = await Todo.findOne({ _id: todoId });
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        const { title, status } = data;
        await Todo.updateOne({ _id: todoId }, { $set: { title, status } });
        return NextResponse.json({ message: "Todo edited successfully" }, { status: 201 });       
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });  
    };
};
const DELETE = async (request, { params }) => {
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
        const { todoId } = params;
        if (!isValidObjectId(todoId)) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        const todo = await Todo.findOne({ _id: todoId });
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        await Todo.deleteOne({ _id: todoId });
        return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
export { GET, PATCH, DELETE };