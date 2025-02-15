const { successResponse } = require("../Helper/responseController");
const { getRating, createRating, deleteRatingById } = require('../services/ratingService');

const handelCreateRating = async (req, res, next) => {
    try {
        const {
            userEmail,
            rating,
            review
        } = req.body;

        const ratingData = {
            userEmail,
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
        const limit = parseInt(req.query.limit) || 12;

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
                    totalNumberOfRating: ratingData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}

const handelDeleteRating = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteRatingById(id);
        return successResponse(res, {
            statusCode: 201,
            message: `Delete were rating successfully.`,
        }
        )
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetRating,
    handelCreateRating,
    handelDeleteRating
}