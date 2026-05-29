import mongoose, { Query } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});

export const Product = mongoose.model('ProductGraphQL', productSchema);