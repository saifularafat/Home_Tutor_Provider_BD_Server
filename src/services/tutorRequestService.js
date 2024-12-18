const createError = require('http-errors');
const slugify = require("slugify");
const TutorRequest = require('../models/tutorRequestModel');


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

module.exports = {
    getTutorRequest,
}