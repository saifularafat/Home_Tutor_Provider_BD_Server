const createError = require('http-errors');
const TutorJobApply = require('../models/tutorJobApplyModel');

const createTutorJobApply = async (tutorJobApplyData) => {
    try {
        const newTutorJobApply = await TutorJobApply.create(tutorJobApplyData);
        return newTutorJobApply;
    } catch (error) {
        throw error;
    }
}

const getTutorJobApply = async (page = 1, limit = 5, filter = {}) => {
    const tutorJobApplies = await TutorJobApply.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!tutorJobApplies) {
        throw createError(404, 'Tutor Job Apply Not Found')
    }
    const count = await TutorJobApply.find(filter).countDocuments();

    return {
        tutorJobApplies,
        count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
    }
}

const getSingleTutorJobApply = async (id) => {
    try {
        const jobApply = await TutorJobApply
            .findOne({ _id: id })
            .lean();
        if (!jobApply) {
            throw createError(404, 'No tutor Job Apply found.')
        }
        return jobApply;
    } catch (error) {
        throw error;
    }
}

const updateTutorJobApplyById = async (id, updates, updateOptions) => {
    try {
        const updatedTutorJobApply = await TutorJobApply.findOneAndUpdate(
            { _id: id },
            updates,
            updateOptions,
        )
        if (!updatedTutorJobApply) {
            throw createError(404, "Updating Tutor Job Apply was not possible.")
        }
        return updatedTutorJobApply;
    } catch (error) {
        throw error;
    }
}

const handelJobApplyAction = async (id, action) => {
    try {
        let update;

        if (action === 'approve') {
            update = { isJobApply: true };
        } else if (action === 'pending') {
            update = { isJobApply: false };
        } else {
            throw createError(400, 'Invalid action, Please select Approve and Pending option.!')
        }
        const updateOption = { new: true, runValidators: true, context: 'query' };
        const updateJobApply = await TutorJobApply.findByIdAndUpdate(id, update, updateOption);
        if (!updateJobApply) {
            throw createError(
                400,
                `user was not ${action} successfully, Please try again`)
        }
    } catch (error) {
        throw error;
    }
}

const deleteTutorJobApplyById = async (id) => {
    try {
        const jobApply = await TutorJobApply.findOneAndDelete({ _id: id });
        if (!jobApply) {
            throw createError(404, 'No tutor job apply found.')
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTutorJobApply,
    getTutorJobApply,
    getSingleTutorJobApply,
    updateTutorJobApplyById,
    handelJobApplyAction,
    deleteTutorJobApplyById
}