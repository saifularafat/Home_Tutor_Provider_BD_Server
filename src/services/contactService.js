const createError = require('http-errors');
const Contact = require('../models/contactModel');

const getContacts = async (page = 1, limit = 12) => {
    const contacts = await Contact.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!contacts) {
        throw createError(404, 'Contact Not Found')
    }
    const count = await Contact.find().countDocuments();
    return {
        contacts,
        count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
    }
}

const getSingleContact = async (id) => {
    const contact = await Contact
        .findOne({ _id: id })
        .lean();
    if (!contact) {
        throw createError(404, 'contact not found')
    }
    return contact;
}
module.exports = {
    getContacts,
    getSingleContact
}