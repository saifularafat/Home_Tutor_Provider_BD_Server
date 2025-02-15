const data = require("../data")
const User = require("../models/userModel")
const TuitionJob = require("../models/tuitionJobModel")
const HireTutorRequest = require("../models/hireTutorRequestModel")
const Blog = require("../models/blogModel")
const Rating = require("../models/ratingModel")
const TutorJobApply = require("../models/tutorJobApplyModel")
const Contact = require("../models/contactModel")

const seedUser = async (req, res, next) => {
    try {
        await User.deleteMany({})

        const users = await User.insertMany(data.users)
        return res.status(201).json(users)
    } catch (error) {
        next(error)
    }
}

const seedTuitionJob = async (req, res, next) => {
    try {
        await TuitionJob.deleteMany({})

        const tuition = await TuitionJob.insertMany(data.tuitionJobs)
        return res.status(201).json(tuition)
    } catch (error) {
        next(error)
    }
}

const seedHireTutorRequest = async (req, res, next) => {
    await HireTutorRequest.deleteMany({})
    try {
        const tutorRequest = await HireTutorRequest.insertMany(data.hireTutorRequest)
        return res.status(201).json(tutorRequest);
    } catch (error) {
        next(error)
    }
}

const seedTutorJobApply = async (req, res, next) => {
    await TutorJobApply.deleteMany({})
    try {
        const jobApply = await TutorJobApply.insertMany(data.tutorJobApply)
        return res.status(201).json(jobApply);
    } catch (error) {
        next(error)
    }
}

const seedBlogs = async (req, res, next) => {
    try {
        await Blog.deleteMany({})

        const blog = await Blog.insertMany(data.blogs)
        return res.status(201).json(blog)
    } catch (error) {
        next(error)
    }
}

const seedRating = async (req, res, next) => {
    try {
        await Rating.deleteMany({})

        const rating = await Rating.insertMany(data.ratings)
        return res.status(201).json(rating)
    } catch (error) {
        next(error)
    }
}

const seedContact = async (req, res, next) => {
    try {
        await Contact.deleteMany({})

        const contact = await Contact.insertMany(data.contacts)
        return res.status(201).json(contact)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    seedUser,
    seedTuitionJob,
    seedHireTutorRequest,
    seedTutorJobApply,
    seedBlogs,
    seedRating,
    seedContact,
}