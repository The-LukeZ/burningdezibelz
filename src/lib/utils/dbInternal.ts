import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "$env/static/private";
import { building } from "$app/environment";

/**
 * Connection ready state
 *
 * - 0 = disconnected
 * - 1 = connected
 * - 2 = connecting
 * - 3 = disconnecting
 * - 99 = uninitialized
 */
const mongoConnection = { isConnected: 0 };

export async function dbConnect() {
  if (building) return;

  console.log("DB_URL", DB_URL);
  if (mongoConnection.isConnected === 1) {
    console.log("already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log("using existing connection");
      return;
    }

    await mongoose.disconnect();
  }
  mongoConnection.isConnected = 2;
  await mongoose.connect(DB_URL);
  mongoConnection.isConnected = 1;
  console.log("Connected to MongoDB: ", DB_URL || "/");
}

export async function dbDisconnect() {
  if (NODE_ENV === "development") return;
  if (mongoConnection.isConnected === 0) return;

  mongoConnection.isConnected = 3;
  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log("Disconnected from MongoDB");
}
