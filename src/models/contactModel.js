const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    userId: {
        type: String,
    },
    contactName: {
        type: String,
        required: [true, "Name is required"],
    },
    contactEmail: {
        type: String,
        required: [true, "Email is required"],
    },
    message: {
        type: String,
        required: [true, "Contact Messages is required"],
    },
}, { timestamps: true })


const Contact = model("Contacts", contactSchema)

module.exports = Contact;