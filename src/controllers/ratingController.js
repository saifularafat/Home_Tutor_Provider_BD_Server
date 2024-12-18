const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");
const Rating = require('../models/ratingModel');
const { getRating } = require('../services/ratingService');

const handelCreateRating = async (req, res, next) => {
    try {
        const rating = await Rating.find();
        if (!rating) {
            throw createError(404, 'Rating Not Found')
        }
        return successResponse(res, {
            statusCode: 201,
            message: `Get Rating successfully.`,
            payload: { rating }
        })
    } catch (error) {
        next(error)
    }
}

const handelGetRating = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const ratingData = await getRating(page, limit)

        return successResponse(res, {
            statusCode: 201,
            message: `Return all Rating successfully.`,
            payload: {
                rating: ratingData.rating,
                pagination: {
                    totalPage: ratingData.totalPage,
                    currentPage: ratingData.currentPage,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfBlog: ratingData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetRating,
    handelCreateRating
}