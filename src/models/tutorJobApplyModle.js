const { Schema, model } = require("mongoose");

const TutorJobApplySchema = new Schema({
    tutorId: {
        type: String,
        required: [true, "Tutor ID is required"],
    },
    tutorEmail: {
        type: String,
        required: [true, "Tutor Email is required"],
    },
    currentLocation: {
        type: String,
        required: [true, "Tutor current location is required"],
    },
    tutorPhone: {
        type: String,
        required: [true, "Tutor phone is required"],
        validate: {
            validator: function (v) {
                return /^(\+8801|8801|01)[3-9]\d{8}$/.test(v);
            },
            message: "Please enter a valid phone number"
        },
    },
    tutorWhatsappNumber: {
        type: String,
        required: [true, "Tutor Whatsapp Number is required"],
    },
    jobId: {
        type: String,
        required: [true, "Job ID is required"],
    },
    jobEmail: {
        type: String,
        required: [true, "Job Email is required"],
    },
}, { timestamps: true })

const TutorJobApply = model("TutorJobApply", TutorJobApplySchema)

module.exports = TutorJobApply;