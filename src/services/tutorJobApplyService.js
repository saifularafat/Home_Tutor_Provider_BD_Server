const createError = require('http-errors');
const TutorJobApply = require('../models/tutorJobApplyModel');

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
module.exports = {
    getTutorJobApply,
}