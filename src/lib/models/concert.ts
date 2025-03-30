import { model, Schema } from "mongoose";

const concertSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  location: { type: Schema.Types.ObjectId, required: true },
});

/**
 * @type {import("mongoose").Model}
 */
let Concert;
try {
  Concert = model("Concert");
} catch {
  Concert = model("Concert", concertSchema, "concerts");
}

export { concertSchema, Concert };
