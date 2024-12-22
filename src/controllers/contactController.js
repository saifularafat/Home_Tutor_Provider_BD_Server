const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");

const handelGetContacts = async (req, res, next) => {
    try {


        return successResponse(res, {
            statusCode: 201,
            message: `Return contact successfully.`,
            payload: {}
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    handelGetContacts,
}