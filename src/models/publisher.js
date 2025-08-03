import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
    name: {type: String, required: true},
    country : {type: String}
}, {versionKey: false});

const Publisher = mongoose.model("publisher", publisherSchema);

export {Publisher, publisherSchema}