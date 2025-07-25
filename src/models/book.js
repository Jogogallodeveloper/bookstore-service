import mongoose from "mongoose";

const  bookSchema = new mongoose.Schema({
   id: {type: mongoose.Schema.Types.ObjectId},
   title: {type: String, Required: true},
   publisher: {Type: String},
   value: { Type: Number},
   pages: {Type: Number},
}, { versionKey: false});

const book = mongoose.model("books", bookSchema);

export default book;