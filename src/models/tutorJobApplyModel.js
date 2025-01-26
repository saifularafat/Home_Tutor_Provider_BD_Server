const { Schema, model } = require("mongoose");

const TutorJobApplySchema = new Schema({
    tutorId: {
        type: String,
        required: [true, "Tutor ID is required"],
    },
    tutorName: {
        type: String,
        required: [true, "Tutor Name is required"],
    },
    tutorEmail: {
        type: String,
        required: [true, "Tutor Email is required"],
    },
    tutorAddress: {
        type: String,
        required: [true, "Tutor Address is required"],
    },
    tutorCurrentLocation: {
        type: String,
        required: [true, "Tutor current location is required"],
    },
    tutorDescription: {
        type: String,
        required: [true, "Tutor description is required"],
    },
    tutorDemeanSalary: {
        type: String,
        required: [true, "Tutor demean salary is required"],
    },
    tutorPhone: {
        type: String,
        required: [true, "Tutor phone number is required"],
        validate: {
            validator: function (v) {
                return /^(\+8801|8801|01)[3-9]\d{8}$/.test(v);
            },
            message: "Please enter a valid phone number"
        },
    },
    tutorWhatsappNumber: {
        type: String,
        required: [true, "Tutor whatsapp number is required"],
    },
    jobId: {
        type: String,
        required: [true, "Job ID is required"],
    },
    jobEmail: {
        type: String,
        required: [true, "Job Email is required"],
    },
    jobSubject: {
        type: String,
        required: [true, "Job subject is required"],
    },
    jobClass: {
        type: String,
        required: [true, "Job class is required"],
    },
    jobMedium: {
        type: String,
        required: [true, "Job medium is required"],
    },
    jobSalary: {
        type: String,
        required: [true, "Job salary is required"],
    },
    jobPerWeek: {
        type: String,
        required: [true, "Job per week is required"],
    },
    jobAddress: {
        type: String,
        required: [true, "Job address is required"],
    },
    jobPhone: {
        type: String,
        required: [true, "Job phone number is required"],
    },
    jobWhatsappNumber: {
        type: String,
        required: [true, "Job whatsapp number is required"],
    },
    jobSchoolName: {
        type: String,
        required: [true, "Job school name is required"],
    },
    isJobApply: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const TutorJobApply = model("TutorJobApplies", TutorJobApplySchema)

module.exports = TutorJobApply;