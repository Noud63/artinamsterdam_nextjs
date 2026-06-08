import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("dbConnect called");

  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log("Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new connection");

    cached.promise = mongoose.connect(MONGODB_URI); // don't await here - we'll await it below and cache the result
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect