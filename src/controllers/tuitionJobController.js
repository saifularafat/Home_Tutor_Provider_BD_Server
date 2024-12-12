const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");

const handelTuitionJobCreate = async (req, res, next) => {
    try {

        return successResponse(res, {
            statusCode: 200,
            message: "New tuition job create successfully",
            payload: {},
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelTuitionJobCreate,

}