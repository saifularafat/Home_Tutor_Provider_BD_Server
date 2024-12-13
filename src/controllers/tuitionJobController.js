const createError = require('http-errors');
const slugify = require("slugify")
const { successResponse } = require("../Helper/responseController");
const {
    getTuitionJobs,
    getSingleTuition,
    updateTuitionJobById,
    deleteTuitionJobById,
} = require('../services/tuitionJobsService');

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

const handelGetsTuitionJob = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            $or: [
                { tuitionCode: { $regex: searchRegExp } },
                { jobLocation: { $regex: searchRegExp } },
            ]
        }

        const tuitionJobData = await getTuitionJobs(page, limit, filter)

        return successResponse(res, {
            statusCode: 201,
            message: `Return all Tuition Jobs successfully.`,
            payload: {
                tuitionJobs: tuitionJobData.tuitionJob,
                pagination: {
                    totalPage: tuitionJobData.totalPage,
                    currentPage: tuitionJobData.currentPage,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfTuition: tuitionJobData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}

const handelGetSingleTuitionJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tuition = await getSingleTuition(id);
        return successResponse(res, {
            statusCode: 200,
            message: `Return a tuition job is successfully.`,
            payload: tuition,
        })
    } catch (error) {
        next(error)
    }
}

const handelUpdateTuitionJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateOptions = { new: true, context: 'query' };
        let updates = {}

        const allowedFields = [
            'jobLocation',
            'jobSalary',
            'contactNumber',
            'whatsAppNumber',
            'tutorGender',
            'medium',
            'jobCategory',
            'perWeek',
            'className',
            'subject',
            'jobComment',
            'duration',
            'studentGender',
            'studentSchool',
            'fixedTime',
            'description'
        ]
        for (const key in req.body) {
            if (allowedFields.includes(key)) {
                if (key === 'jobLocation') {
                    updates.slug = slugify(req.body[key]);
                }
                updates[key] = req.body[key];
            }
        }
        const updateTuition = await updateTuitionJobById(
            id,
            updates,
            updateOptions,
        )

        return successResponse(res, {
            statusCode: 200,
            message: "Tuition Job was update successfully",
            payload: { updateTuition },
        })
    } catch (error) {
        next(error)
    }
}

const handelDeleteTuitionJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTuitionJobById(id);

        return successResponse(res, {
            statusCode: 200,
            message: "tuition job deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelTuitionJobCreate,
    handelGetsTuitionJob,
    handelGetSingleTuitionJob,
    handelUpdateTuitionJob,
    handelDeleteTuitionJob
}