import { mongoose } from "./utils/ImortExport.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "name": { type: String, required: true },
    "email": { type: String, unique: true, required: true },
    "password": { type: String, required: true },
    "userHistory": [{ type: Schema.Types.ObjectId, ref: "history" }]
})

const UrlSchema = new Schema({
    "origenalUrl": { type: String,  required: true },
    "sortUrl": { type: String, unique: true },
}, { timestamps: true });

export const UrlModel = mongoose.model("url", UrlSchema);