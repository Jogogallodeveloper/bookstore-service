import mongoose from "mongoose";
import { authorSchema } from "./author.js";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publisher: { type: String },
  value: { type: Number },
  pages: { type: Number },
  author: authorSchema
}, { versionKey: false });

const book = mongoose.model("Book", bookSchema, "livraria");

export default book;
