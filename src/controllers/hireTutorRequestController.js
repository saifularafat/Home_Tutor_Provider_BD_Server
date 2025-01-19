const { successResponse } = require("../Helper/responseController");
const { 
    getTutorRequest, 
    deleteTutorRequestById, 
    updateTutorRequestById, 
    createTutorRequest, 
    getSingleTutorRequest,
    handelTutorHireAction } = require("../services/hireTutorRequestService");


const handelTutorRequestCreate = async (req, res, next) => {
    try {
        const {
            tutorId,
            tutorEmail,
            tutorName,
            tutorImage,
            tutorPhone,
            tutorAddress,
            jobCategory,
            jobSubject,
            studentClass,
            howManyStudent,
            studentGender,
            tuitionSalary,
            tuitionStartMonth,
            studentLocation,
            studentSubLocation,
            tuitionFullAddress,
            comments,
            ParentEmail,
            parentName,
            parentAddress,
            parentPhone,
            parentImage,
            parentId,
        } = req.body;

        const tutorRequestData = {
            tutorId,
            tutorEmail,
            tutorName,
            tutorImage,
            tutorPhone,
            tutorAddress,
            jobCategory,
            jobSubject,
            studentClass,
            howManyStudent,
            studentGender,
            tuitionSalary,
            tuitionStartMonth,
            studentLocation,
            studentSubLocation,
            tuitionFullAddress,
            comments,
            ParentEmail,
            parentName,
            parentAddress,
            parentPhone,
            parentImage,
            parentId,
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
                { parentId: { $regex: searchRegExp } },
                { ParentEmail: { $regex: searchRegExp } },
                { parentName: { $regex: searchRegExp } },
                { parentPhone: { $regex: searchRegExp } },
                { jobCategory: { $regex: searchRegExp } },
                { tutorPhone: { $regex: searchRegExp } },
                { tutorName: { $regex: searchRegExp } },
                { tutorEmail: { $regex: searchRegExp } },
                { tutorId: { $regex: searchRegExp } },
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
            'jobCategory',
            'jobSubject',
            'studentClass',
            'howManyStudent',
            'tuitionSalary',
            'tuitionStartMonth',
            'studentLocation',
            'studentSubLocation',
            'tuitionFullAddress',
            'parentPhone',
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

// * tutor hire with parent apply approve and pending by ID wait admin
const handelManageTutorHireApproveAndPendingById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const action = req.body.action;

        await handelTutorHireAction(id, action);

        return successResponse(res, {
            statusCode: 200,
            message: `Tutor hire were ${action} successfully`,
            payload: {},
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
    handelManageTutorHireApproveAndPendingById,
    handelDeleteTutorRequest,
}