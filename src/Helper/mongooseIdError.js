const createError = require("http-errors")
const { mongoose } = require("mongoose")

const mongooseIdError = (error) => {
    try {
        if (error instanceof mongoose.Error.CastError) {
            throw createError(400, 'Invalid Id')
        }
    } catch (error) {

    }
}
module.exports = mongooseIdError;