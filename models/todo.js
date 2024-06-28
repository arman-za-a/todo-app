import { Schema, model, models, Types } from "mongoose";
import { todoStatuses } from "@/constants/array";
const todoSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: todoStatuses,
        default: "todo"
    }
});
const Todo = models.Todo || model("Todo", todoSchema);
export default Todo;