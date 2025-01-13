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
    guardianName: {
        type: String,
        required: [true, "Guardian Name is required"],
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
    JobCategory: {
        type: String,
        required: [true, "Tuition Job Category is required"],
    },
    JobSubject: {
        type: String,
        required: [true, "Tuition Job Category is required"],
    },
    tuitionSalary: {
        type: Number,
        required: [true, "Tuition salary is required"],
    },
    tuitionStartMonth: {
        type: String,
        required: [true, "Tuition Start Month is required"],
    },
    comments: {
        type: String,
        required: [true, "Guardian Comment is required"],
        minlength: [5, "The length of user Address can be minimum 5 character"],
    },
    tutorEmail: {
        type: String,
        required: [true, "Tutor Email is required"],
    },
    tutorName: {
        type: String,
        required: [true, "Tutor Name is required"],
    },
    tutorAddress: {
        type: String,
        required: [true, "Tutor Address is required"],
    },
    tutorPhone: {
        type: String,
        required: [true, "Tutor Phone is required"],
    },
    tutorId: {
        type: String,
        required: [true, "Tutor ID is required"],
    },
    isTutorRequest: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const TutorRequest = model("TutorRequests", TutorRequestSchema)

module.exports = TutorRequest;