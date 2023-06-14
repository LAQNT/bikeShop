const mongoose = require("mongoose");

// Mongoose Schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }
);


// Mongoose Model
const userModel = mongoose.model("products", productSchema);

// Export Module
module.exports = userModel;