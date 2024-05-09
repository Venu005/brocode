import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  try {
    if (connection.isConnected) {
      console.log("DB already connected");
    }
    const db = await mongoose.connect(process.env.MONGO_URI!);
    connection.isConnected = db.connections[0].readyState;
    console.log("Databasae connecected successfully");
  } catch (error) {
    console.log("Database connection error");
    process.exit(1);
  }
}
