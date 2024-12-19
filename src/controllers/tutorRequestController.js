const { successResponse } = require("../Helper/responseController");
const { getTutorRequest, deleteTutorRequestById, updateTutorRequestById } = require("../services/tutorRequestService");

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

const handelUpdateTutorRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateOptions = { new: true, context: 'query' };
        let updates = {}

        const allowedFields = [
            'category',
            'location',
            'subLocation',
            'guardianPhone',
            'guardianAddress',
            'comments',
        ]
        for (const key in req.body) {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key];
            }
        }
        const updateTutorRequest = await updateTutorRequestById(
            id,
            updates,
            updateOptions,
        )
        return successResponse(res, {
            statusCode: 201,
            message: `Tutor Request Update successfully.`,
            payload: { updateTutorRequest },
        })
    } catch (error) {
        next(error)
    }
}

const handelDeleteTutorRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTutorRequestById(id);

        return successResponse(res, {
            statusCode: 201,
            message: `Tutor Request Delete successfully.`,
            payload: {},
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetTutorRequest,
    handelUpdateTutorRequest,
    handelDeleteTutorRequest,
}