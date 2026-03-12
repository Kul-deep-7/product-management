import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productType: {
      type: String,
      required: true,
      enum: ["Foods", "Electronics", "Clothes", "Beauty-Products", "Other"],
      default: "Foods",
    },
    quantityStock: {
      type: Number,
      required: true,
      default: 0,
    },
    mrp: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String
      },
    ],
    exchangeEligibility: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    published: {
      type: Boolean,
      default: false,
    },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    }
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)

export default Product