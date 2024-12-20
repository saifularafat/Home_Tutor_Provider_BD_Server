const { successResponse } = require("../Helper/responseController");
const { getTutorJobApply } = require("../services/tutorJobApplyService");

const handelGetTutorJobApply = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");
        const filter = {
            $or: [
                { tutorPhone: { $regex: searchRegExp } },
                { tutorId: { $regex: searchRegExp } },
                { jobId: { $regex: searchRegExp } },
                { tutorEmail: { $regex: searchRegExp } },
            ]
        }
        const jobApplyData = await getTutorJobApply(page, limit, filter)
        console.log('object', jobApplyData);
        return successResponse(res, {
            statusCode: 201,
            message: `Return tutor Job apply successfully.`,
            payload: {
                tutorJobApplies: jobApplyData.tutorJobApplies,
                pagination: {
                    totalPage: jobApplyData.totalPage,
                    currentPage: jobApplyData.currentPage,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfTuition: jobApplyData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetTutorJobApply,
}