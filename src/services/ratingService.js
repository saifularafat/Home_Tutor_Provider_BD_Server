const createError = require('http-errors');
const slugify = require("slugify");
const Blog = require('../models/blogModel');
const Rating = require('../models/ratingModel');

const createRating = async (ratingData) => {
    try {
        // Create a new Rating
        const newRating = await Rating.create(ratingData);
        return newRating;
    } catch (error) {
        throw error;
    }
}

const getRating = async (page = 1, limit = 8) => {
    const rating = await Rating.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!rating) {
        throw createError(404, 'Rating Not Found')
    }
    const count = await Rating.find().countDocuments();
    return {
        rating,
        count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
    }
}

const deleteRatingById = async (id) => {
    try {
        const rating = await Rating.findOneAndDelete({ _id: id });
        if (!rating) throw createError(404, 'This rating Id is not found.')
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createRating,
    getRating,
    deleteRatingById
}