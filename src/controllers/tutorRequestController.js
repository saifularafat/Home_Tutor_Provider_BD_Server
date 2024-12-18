const slugify = require("slugify")
const { successResponse } = require("../Helper/responseController");
const { getTutorRequest } = require("../services/tutorRequestService");

const handelGetTutorRequest = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");
        const filter = {
            $or: [
                { guardianEmail: { $regex: searchRegExp } },
                { guardianPhone: { $regex: searchRegExp } },
                { category: { $regex: searchRegExp } },
                { tutorEmail: { $regex: searchRegExp } },
            ]
        }
        const tutorRequestData = await getTutorRequest(page, limit, filter)
        
        return successResponse(res, {
            statusCode: 201,
            message: `Return all Tutor Request successfully.`,
            payload: {
                tutorRequest: tutorRequestData.tutorRequest,
                pagination: {
                    totalPage: tutorRequestData.totalPage,
                    currentPage: tutorRequestData.currentPage,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfTuition: tutorRequestData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetTutorRequest,
}