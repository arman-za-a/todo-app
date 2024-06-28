import Todo from "@/models/todo";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import { verifyToken } from "@/utils/auth";
import { todoStatuses } from "@/constants/array";
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
        const { todoId } = params;
        if (!isValidObjectId(todoId)) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        const todo = await Todo.findOne({ _id: todoId });
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 });
        };
        const { direction } = await request.json();
        const { status } = todo;
        const statusIndex = todoStatuses.indexOf(status);      
        if (direction !== "next" && direction !== "back") {
            return NextResponse.json({ message: "Invalid direction" }, { status: 422 });
        };
        let newStatus;
        if (direction === "next") {
            newStatus = todoStatuses[statusIndex + 1];
            if (!newStatus) {
                return NextResponse.json({ message: "You can't forward status" }, { status: 422 });
            };
        } else if (direction === "back") {
            newStatus = todoStatuses[statusIndex - 1];
            if (!newStatus) {
                return NextResponse.json({ message: "You can't backward status" }, { status: 422 });
            };
        };
        await Todo.updateOne({ _id: todoId }, { $set: { status: newStatus } });
        return NextResponse.json({ message: "Todo status updated successfully" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "An error occurred in server" }, { status: 500 });
    };
};
export { PATCH };