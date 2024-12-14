const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    blogCode: {
        type: String,
    },
    title: {
        type: String,
        required: [true, "Blog title is required"],
        minlength: [
            7,
            "The length of  tuition location can be minimum 7 character"
        ],
    },
    slug: {
        type: String,
        required: [true, "blog title Slug is required"],
        lowercase: true,
        unique: true,
    },
    image: {
        type: Buffer,
        contentType: String,
        required: [true, "Blog image is required"],
    },
    medium: {
        type: String,
        required: [true, "Blog Medium is required"],
    },
    category: {
        type: String,
        required: [true, "Blog category is required"],
    },
    subject: {
        type: String,
        required: [true, "Blog subject is required"],
    },
    studentHelp: {
        type: String,
        required: [true, "Student helper is required"],
    },
    description: {
        type: String,
        required: [true, "Blog is required"],
    },
    authorName: {
        type: String,
        required: [true, "Blog is required"],
    },
    authorEducationLevel: {
        type: String,
        required: [true, "Blog is required"],
    },
    authorStudySubject: {
        type: String,
        required: [true, "Blog is required"],
    },
    authorProfession: {
        type: String,
        required: [true, "Blog is required"],
    },
    userId: {
        type: String,
        required: [true, "User id is required"],
    },

}, { timestamps: true })


const Blog = model("Blogs", blogSchema)

module.exports = Blog;