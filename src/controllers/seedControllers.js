const data = require("../data")
const User = require("../models/userModel")
const TuitionJob = require("../models/tuitionJobModel")

const seedUser = async (req, res, next) => {
    try {
        // deleting all existing users data
        await User.deleteMany({})

        // insertIn new user is existing
        const users = await User.insertMany(data.users)

        // success message
        return res.status(201).json(users)
    } catch (error) {
        next(error)
    }
}

const seedTuitionJob = async (req, res, next) => {
    try {
        // deleting all existing users data
        await TuitionJob.deleteMany({})

        // insertIn new user is existing
        const tuition = await TuitionJob.insertMany(data.tuitionJobs)

        // success message
        return res.status(201).json(tuition)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    seedUser,
    seedTuitionJob
}