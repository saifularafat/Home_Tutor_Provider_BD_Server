const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    userEmail: {
        type: String,
        required: [true, "User Name is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5, 
    },
    review: {
        type: String,
        default: null,
    },

}, { timestamps: true })


const Rating = model("Ratings", ratingSchema)

module.exports = Rating;