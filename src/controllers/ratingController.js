const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");

const handelGetRating = async (req, res, next) => {
    try {
        return successResponse(res, {
            statusCode: 201,
            message: `New Rating is create successfully.`,
            payload: {}
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetRating,
}