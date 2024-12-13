const createError = require('http-errors');
const slugify = require("slugify")
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

const getSingleTuition = async (id) => {
    const tuition = await TuitionJob
        .findOne({ _id: id })
        .lean();
    if (!tuition) {
        throw createError(404, 'tuition job not found')
    }
    return tuition;
}

const updateTuitionJobById = async (id, updates, updateOptions) => {
    try {
        const updatedTuitionJob = await TuitionJob.findOneAndUpdate(
            { _id: id },
            updates,
            updateOptions,
        )
        if (!updatedTuitionJob) {
            throw createError(404, "Updating Tuition Job was not possible.")
        }
        return updatedTuitionJob;
    } catch (error) {
        throw error;
    }
}

const deleteTuitionJobById = async (id) => {
    try {
        const tuitionJob = await TuitionJob.findOneAndDelete({ _id: id });
        if (!tuitionJob) {
            throw createError(404, 'No tuition job found.')
        }
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getTuitionJobs,
    getSingleTuition,
    updateTuitionJobById,
    deleteTuitionJobById
}