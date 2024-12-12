const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");
const { getTuitionJobs, getSingleTuition } = require('../services/tuitionJobsService');

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
        const { slug } = req.params;
        const tuition = await getSingleTuition(slug);
        return successResponse(res, {
            statusCode: 200,
            message: `Return a tuition job is successfully.`,
            payload: tuition,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelTuitionJobCreate,
    handelGetsTuitionJob,
    handelGetSingleTuitionJob,
}