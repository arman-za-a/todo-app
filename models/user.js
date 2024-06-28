import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }
});
const User = models.User || model("User", userSchema);
export default User;