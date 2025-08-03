import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publisher: { type: String },
  value: { type: Number },
  pages: { type: Number },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: true
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "publisher",
    required: true
  }
}, { versionKey: false });

const book = mongoose.model("Book", bookSchema, "bookStore");

export default book;
