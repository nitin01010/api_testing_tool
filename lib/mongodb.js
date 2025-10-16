import mongoose from "mongoose";
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect("mongodb+srv://nitinsachdeva0202_db_user:53ugNUvgf294jnKU@cluster0.ink3uig.mongodb.net/apiHistory").then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
