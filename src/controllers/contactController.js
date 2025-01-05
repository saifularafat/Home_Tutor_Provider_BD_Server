const { successResponse } = require("../Helper/responseController");
const Contact = require('../models/contactModel');
const { getContacts, getSingleContact, deleteContactById, createContact } = require('../services/contactService');


const handelContactCreate = async (req, res, next) => {
    try {
        const {
            userId,
            contactName,
            contactEmail,
            message,
        } = req.body;

        const contactData = {
            userId,
            contactName,
            contactEmail,
            message,
        }
        const newContact = await createContact(contactData);

        return successResponse(res, {
            statusCode: 200,
            message: "Your email is create successfully",
            payload: { newContact },
        })
    } catch (error) {
        next(error)
    }
}

const handelGetContacts = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;

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
                    totalNumberOfContact: contactData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}


const handelGetSingleContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getSingleContact(id);
        return successResponse(res, {
            statusCode: 200,
            message: `Return contact is successfully.`,
            payload: contact,
        })
    } catch (error) {
        next(error)
    }
}


const handelDeleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteContactById(id);

        return successResponse(res, {
            statusCode: 200,
            message: "Contact is deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelContactCreate,
    handelGetContacts,
    handelGetSingleContact,
    handelDeleteContact,
}