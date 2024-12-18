const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");
const Rating = require('../models/ratingModel');

const handelGetRating = async (req, res, next) => {
    try {
        const rating = await Rating.find();
        if (!rating) {
            throw createError(404, 'Rating Not Found')
        }
        return successResponse(res, {
            statusCode: 201,
            message: `Get Rating successfully.`,
            payload: {rating}
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetRating,
}