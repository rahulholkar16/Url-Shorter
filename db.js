import { mongoose } from "./utils/ImortExport.js";

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    "origenalUrl": { type: String,  required: true },
    "sortUrl": { type: String, unique: true },
}, { timestamps: true });

export const UrlModel = mongoose.model("url", UrlSchema);