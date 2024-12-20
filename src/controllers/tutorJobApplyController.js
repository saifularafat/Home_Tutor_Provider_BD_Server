const { successResponse } = require("../Helper/responseController");
const {
    getTutorJobApply,
    getSingleTutorJobApply,
    updateTutorJobApplyById,
    deleteTutorJobApplyById,
    createTutorJobApply
} = require("../services/tutorJobApplyService");


const handelTutorJobApplyCreate = async (req, res, next) => {
    try {
        const {
            tutorId,
            tutorEmail,
            currentLocation,
            tutorPhone,
            tutorWhatsappNumber,
            jobId,
            jobEmail,
        } = req.body;

        const tutorJobApplyData = {
            tutorId,
            tutorEmail,
            currentLocation,
            tutorPhone,
            tutorWhatsappNumber,
            jobId,
            jobEmail,
        }
        const newTutorJobApply = await createTutorJobApply(tutorJobApplyData);

        return successResponse(res, {
            statusCode: 200,
            message: "New tutor job apply successfully",
            payload: { newTutorJobApply },
        })
    } catch (error) {
        next(error)
    }
}

const handelGetTutorJobApply = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");
        const filter = {
            $or: [
                { tutorPhone: { $regex: searchRegExp } },
                { tutorId: { $regex: searchRegExp } },
                { jobId: { $regex: searchRegExp } },
                { tutorEmail: { $regex: searchRegExp } },
            ]
        }
        const jobApplyData = await getTutorJobApply(page, limit, filter)
        return successResponse(res, {
            statusCode: 201,
            message: `Return tutor Job apply successfully.`,
            payload: {
                tutorJobApplies: jobApplyData.tutorJobApplies,
                pagination: {
                    totalPage: jobApplyData.totalPage,
                    currentPage: jobApplyData.currentPage,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfTuition: jobApplyData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}

const handelGetSingleTutorJobApply = async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobApply = await getSingleTutorJobApply(id);
        return successResponse(res, {
            statusCode: 200,
            message: `tutor job Apply is successfully.`,
            payload: jobApply,
        })
    } catch (error) {
        next(error)
    }
}

const handelUpdateTutorJobApply = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateOptions = { new: true, context: 'query' };
        let updates = {}

        const allowedFields = [
            'currentLocation',
            'tutorPhone',
            'tutorWhatsappNumber',
        ]
        for (const key in req.body) {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key];
            }
        }
        const updateTutorRequest = await updateTutorJobApplyById(
            id,
            updates,
            updateOptions,
        )
        return successResponse(res, {
            statusCode: 201,
            message: `Tutor Job Apply Update successfully.`,
            payload: { updateTutorRequest },
        })
    } catch (error) {
        next(error)
    }
}

const handelDeleteTutorJobApply = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTutorJobApplyById(id);

        return successResponse(res, {
            statusCode: 201,
            message: `Tutor job apply delete successfully.`,
            payload: {},
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelTutorJobApplyCreate,
    handelGetTutorJobApply,
    handelGetSingleTutorJobApply,
    handelUpdateTutorJobApply,
    handelDeleteTutorJobApply
}