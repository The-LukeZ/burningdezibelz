import { Model, model, Schema } from "mongoose";

const concertSchema = new Schema<DBModels.Concert>({
  name: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  location: { type: Schema.Types.ObjectId, required: true },
});

let Concert: Model<DBModels.Concert>;
try {
  Concert = model<DBModels.Concert>("Concert");
} catch {
  Concert = model<DBModels.Concert>("Concert", concertSchema, "concerts");
}

export { concertSchema, Concert };
