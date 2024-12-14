const data = require("../data")
const User = require("../models/userModel")
const TuitionJob = require("../models/tuitionJobModel")
const Blog = require("../models/blogModel")

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

const seedBlogs = async (req, res, next) => {
    try {
        await Blog.deleteMany({})

        const tuition = await Blog.insertMany(data.blogs)
        return res.status(201).json(tuition)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    seedUser,
    seedTuitionJob,
    seedBlogs
}