import mongoose from "mongoose";

export async function connect() {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined in environment variables.");
            throw new Error("MONGO_URI is not defined in environment variables.");
        }

        // Check if already connected
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to MongoDB");
            return;
        }

        console.log(`Connecting to MongoDB Atlas...`);
        
        // Connect to MongoDB with optimized settings for production
        await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
        });

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log(" MONGODB CONNECTED SUCCESSFULLY");
        });

        connection.on("error", (err) => {
            console.error(" MongoDB connection error:", err);
        });

    } catch (error) {
        console.error(" Something went wrong while connecting to MongoDB:", error);
        throw error;
    }
}
