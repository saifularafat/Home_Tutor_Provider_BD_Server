const createError = require('http-errors');
const TutorRequest = require('../models/tutorRequestModel');

const createTutorRequest = async (tutorRequestData) => {
    try {
        const newTutorRequest = await TutorRequest.create(tutorRequestData);
        return newTutorRequest;
    } catch (error) {
        throw error;
    }
}

const getTutorRequest = async (page = 1, limit = 5, filter = {}) => {

    const tutorRequest = await TutorRequest.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!tutorRequest) {
        throw createError(404, 'Tutor Request Not Found')
    }
    const count = await TutorRequest.find(filter).countDocuments();

    return {
        tutorRequest,
        count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
    }
}

const getSingleTutorRequest = async (id) => {
    try {
        const tutorRequest = await TutorRequest
            .findOne({ _id: id })
            .lean();
        if (!tutorRequest) {
            throw createError(404, 'No tutor request found.')
        }
        return tutorRequest;
    } catch (error) {
        throw error;
    }
}

const updateTutorRequestById = async (id, updates, updateOptions) => {
    try {
        const updatedTutorRequest = await TutorRequest.findOneAndUpdate(
            { _id: id },
            updates,
            updateOptions,
        )
        if (!updatedTutorRequest) {
            throw createError(404, "Updating Tutor Request was not possible.")
        }
        return updatedTutorRequest;
    } catch (error) {
        throw error;
    }
}

const handelTutorHireAction = async (id, action) => {
    try {
        let update;

        if (action === 'approve') {
            update = { isTutorRequest: true };
        } else if (action === 'pending') {
            update = { isTutorRequest: false };
        } else {
            throw createError(400, 'Invalid action, Please select Approve and Pending option.!')
        }
        const updateOption = { new: true, runValidators: true, context: 'query' };
        const updateJobApply = await TutorRequest.findByIdAndUpdate(id, update, updateOption);
        if (!updateJobApply) {
            throw createError(
                400,
                `user was not ${action} successfully, Please try again`)
        }
    } catch (error) {
        throw error;
    }
}

const deleteTutorRequestById = async (id) => {
    try {
        const tutorRequest = await TutorRequest.findOneAndDelete({ _id: id });
        if (!tutorRequest) {
            throw createError(404, 'No tutor request found.')
        }
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createTutorRequest,
    getTutorRequest,
    getSingleTutorRequest,
    updateTutorRequestById,
    handelTutorHireAction,
    deleteTutorRequestById
}