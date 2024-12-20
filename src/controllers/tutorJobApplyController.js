const { successResponse } = require("../Helper/responseController");

const handelGetTutorJobApply = async (req, res, next) => {
    try {
        return successResponse(res, {
            statusCode: 200,
            message: `tutor job apply is successfully.`,
            payload: {},
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetTutorJobApply,
}