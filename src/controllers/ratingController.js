const { successResponse } = require("../Helper/responseController");
const { getRating, createRating } = require('../services/ratingService');

const handelCreateRating = async (req, res, next) => {
    try {
        const {
            guardianId,
            guardianEmail,
            rating,
            review
        } = req.body;

        const ratingData = {
            guardianId,
            guardianEmail,
            rating,
            review
        }
        const newRating = await createRating(ratingData);

        return successResponse(res, {
            statusCode: 201,
            message: `create rating successfully.`,
            payload: { newRating }
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