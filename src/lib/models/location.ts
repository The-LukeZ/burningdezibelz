import { Model, model, Schema } from "mongoose";

const locationSchema = new Schema<DBModels.Location>({
  name: { type: String, required: true, text: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
});

locationSchema.index({ name: 1, address: 1, city: 1, postalCode: 1, province: 1, country: 1 }, { unique: true });

let Location: Model<DBModels.Location>;
try {
  Location = model<DBModels.Location>("Location");
} catch {
  Location = model<DBModels.Location>("Location", locationSchema, "locations");
}

export { locationSchema, Location };
