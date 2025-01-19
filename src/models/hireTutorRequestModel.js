const { Schema, model } = require("mongoose");

const HireTutorRequestSchema = new Schema({
    tutorId: {
        type: String,
        required: [true, "Tutor ID is required"],
    },
    tutorEmail: {
        type: String,
        required: [true, "Tutor Email is required"],
    },
    tutorName: {
        type: String,
        required: [true, "Tutor Name is required"],
    },
    tutorImage: {
        type: String,
        required: [true, "Tutor Image is required"],
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
    tutorAddress: {
        type: String,
        required: [true, "Tutor Address is required"],
        minlength: [5, "The length of user Address can be minimum 5 character"],
    },
    jobCategory: {
        type: String,
        required: [true, "Tuition Job Category is required"],
    },
    jobSubject: {
        type: String,
        required: [true, "Tuition subject is required"],
    },
    studentClass: {
        type: String,
        required: [true, "Student class is required"],
    },
    howManyStudent: {
        type: Number,
        required: [true, "How Many Student is required"],
    },
    studentGender: {
        type: String,
        required: [true, "Student Gender is required"],
    },
    tuitionSalary: {
        type: Number,
        required: [true, "Tuition salary is required"],
    },
    tuitionStartMonth: {
        type: String,
        required: [true, "Tuition Start Month is required"],
    },
    studentLocation: {
        type: String,
        required: [true, "Location is required"],
    },
    studentSubLocation: {
        type: String,
        required: [true, "Sub Location is required"],
    },
    tuitionFullAddress: {
        type: String,
        required: [true, "Tuition Address is required"],
    },
    comments: {
        type: String,
        required: [true, "Guardian Comment is required"],
        minlength: [5, "The length of user Address can be minimum 5 character"],
    },
    ParentEmail: {
        type: String,
        required: [true, "Tutor Email is required"],
    },
    parentName: {
        type: String,
        required: [true, "Tutor Name is required"],
    },
    parentAddress: {
        type: String,
        required: [true, "Tutor Address is required"],
    },
    parentPhone: {
        type: String,
        required: [true, "Tutor Phone is required"],
    },
    parentImage: {
        type: String,
        required: [true, "Tutor Phone is required"],
    },
    parentId: {
        type: String,
        required: [true, "Tutor ID is required"],
    },
    isTutorRequest: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const HireTutorRequest = model("HireTutorRequests", HireTutorRequestSchema)

module.exports = HireTutorRequest;