const createError = require('http-errors');
const slugify = require("slugify")
const TuitionJob = require("../models/tuitionJobModel");

const createTuitionJob = async (tuitionJob) => {
    try {
        const {
            jobLocation,
            jobSalary,
            contactNumber,
            whatsAppNumber,
            tutorGender,
            medium,
            jobCategory,
            perWeek,
            className,
            subject,
            jobComment,
            duration,
            studentGender,
            studentSchool,
            fixedTime,
            description,
            userId,
        } = tuitionJob;

        // Extract the last word from jobLocation
        const words = tuitionJob.jobLocation.trim().split(" ");
        const lastWord = words[words.length - 1].replace(/[^a-zA-Z]/g, ""); 
        const jobCodePart = lastWord.slice(0, 3).toUpperCase();

        const count = await TuitionJob.countDocuments();
        const uniqueNumber = String(count + 1).padStart(4, "0");
        tuitionJob.tuitionCode = `${jobCodePart}-${uniqueNumber}`;

        // Create a new tuition job
        const newTuitionJob = await TuitionJob.create({
            tuitionCode: tuitionJob.tuitionCode,
            jobLocation,
            slug: slugify(jobLocation),
            jobSalary,
            contactNumber,
            whatsAppNumber,
            tutorGender,
            medium,
            jobCategory,
            perWeek,
            className,
            subject,
            jobComment,
            duration,
            studentGender,
            studentSchool,
            fixedTime,
            description,
            userId,
        });

        return newTuitionJob;
    } catch (error) {
        throw error;
    }
};

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
    createTuitionJob,
    getTuitionJobs,
    getSingleTuition,
    updateTuitionJobById,
    deleteTuitionJobById
}