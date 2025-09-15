import mongoose from "mongoose";

export async function connect() {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined in environment variables.");
            throw new Error("MONGO_URI is not defined in environment variables.");
        }

        // Check if already connected
        if (mongoose.connections[0].readyState === 1) {
            console.log("Already connected to MongoDB");
            return mongoose.connections[0];
        }

        // Disconnect if in a connecting state
        if (mongoose.connections[0].readyState === 2) {
            await mongoose.disconnect();
        }

        console.log(`Connecting to MongoDB Atlas...`);
        
        // Connect to MongoDB with optimized settings for serverless
        await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
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
