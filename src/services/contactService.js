const createError = require('http-errors');
const Contact = require('../models/contactModel');

const createContact = async (contactData) => {
    try {
        const newContact = await Contact.create(contactData);
        return newContact;
    } catch (error) {
        throw error;
    }
}

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

const deleteContactById = async (id) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: id });
        if (!contact) {
            throw createError(404, 'No contact found.')
        }
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createContact,
    getContacts,
    getSingleContact,
    deleteContactById
}