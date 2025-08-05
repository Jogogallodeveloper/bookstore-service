import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Author name is Required!"]},
    nationality : {type: String}
}, {versionKey: false});

const author = mongoose.model("author", authorSchema);

export {author, authorSchema}