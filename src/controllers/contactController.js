const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");
const Contact = require('../models/contactModel');
const { getContacts } = require('../services/contactService');

const handelGetContacts = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");
        const filter = {
            $or: [
                { contactEmail: { $regex: searchRegExp } },
                { contactName: { $regex: searchRegExp } },
            ]
        }
        const contactData = await getContacts(page, limit, filter)

        return successResponse(res, {
            statusCode: 201,
            message: `Return all contact successfully.`,
            payload: {
                contacts: contactData.contacts,
                pagination: {
                    totalPage: contactData.totalPage,
                    currentPage: contactData.currentPage,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfTuition: contactData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    handelGetContacts,
}