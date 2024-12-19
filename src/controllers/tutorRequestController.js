const { successResponse } = require("../Helper/responseController");
const { getTutorRequest, deleteTutorRequestById, updateTutorRequestById, createTutorRequest, getSingleTutorRequest } = require("../services/tutorRequestService");


const handelTutorRequestCreate = async (req, res, next) => {
    try {
        const {
            guardianId,
            guardianEmail,
            category,
            location,
            subLocation,
            guardianPhone,
            guardianAddress,
            comments,
            tutorEmail,
            tutorId,
        } = req.body;

        const tutorRequestData = {
            guardianId,
            guardianEmail,
            category,
            location,
            subLocation,
            guardianPhone,
            guardianAddress,
            comments,
            tutorEmail,
            tutorId,
        }
        const newTutorRequest = await createTutorRequest(tutorRequestData);

        return successResponse(res, {
            statusCode: 200,
            message: "New tutor request successfully",
            payload: { newTutorRequest },
        })
    } catch (error) {
        next(error)
    }
}

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

const handelGetSingleTutorRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tutorRequest = await getSingleTutorRequest(id);
        return successResponse(res, {
            statusCode: 200,
            message: `tutor request is successfully.`,
            payload: tutorRequest,
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
    handelTutorRequestCreate,
    handelGetTutorRequest,
    handelGetSingleTutorRequest,
    handelUpdateTutorRequest,
    handelDeleteTutorRequest,
}