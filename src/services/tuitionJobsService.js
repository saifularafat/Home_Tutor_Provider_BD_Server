const createError = require('http-errors');
const TuitionJob = require("../models/tuitionJobModel");

const getTuitionJobs = async (page = 1, limit = 5, filter = {}) => {
    const tuitionJob = await TuitionJob.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!tuitionJob) {
        throw createError(404, 'Tuition Job Not Found')
    }
    const count = await TuitionJob.find(filter).countDocuments();

    return {
        tuitionJob,
        count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
    }
}

module.exports = {
    getTuitionJobs,

}