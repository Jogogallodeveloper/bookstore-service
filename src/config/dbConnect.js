import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default async function connectToDatabase() {
  const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${password}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    return mongoose.connection; // <-- aqui retornamos a conexão direta
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
}


//export default connectToDatabase;
