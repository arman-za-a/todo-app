import mongoose from "mongoose";
const connectDB = async () => {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongodb");
    };
};
export { connectDB };