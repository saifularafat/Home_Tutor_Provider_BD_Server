const { Schema, model } = require("mongoose");

const TutorRequestSchema = new Schema({
    guardianId: {
        type: String,
        required: [true, "Guardian ID is required"],
    },
    guardianEmail: {
        type: String,
        required: [true, "Guardian Email is required"],
    },
    category: {
        type: String,
        required: [true, "Tuition Category is required"],
    },
    location: {
        type: String,
        required: [true, "Guardian location is required"],
    },
    subLocation: {
        type: String,
        required: [true, "Guardian location is required"],
    },
    guardianPhone: {
        type: String,
        required: [true, "Guardian phone is required"],
        validate: {
            validator: function (v) {
                return /^(\+8801|8801|01)[3-9]\d{8}$/.test(v);
            },
            message: "Please enter a valid phone number"
        },
    },
    guardianAddress: {
        type: String,
        required: [true, "Guardian Address is required"],
        minlength: [5, "The length of user Address can be minimum 5 character"],
    },
    comments: {
        type: String,
        required: [true, "Guardian Comment is required"],
        minlength: [5, "The length of user Address can be minimum 5 character"],
    },    
    tutorId: {
        type: String,
        required: [true, "Tutor ID is required"],
    },
    tutorEmail: {
        type: String,
        required: [true, "Tutor Email is required"],
    },
}, { timestamps: true })

const TutorRequest = model("TutorRequests", TutorRequestSchema)

module.exports = TutorRequest;