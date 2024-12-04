const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");
const { findUsers, findUserById, deleteUserById } = require("../services/userService");
const User = require('../models/userModel');

// ^ get all users 
const handelGetUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const { users, pagination } = await findUsers(search, limit, page);

        return successResponse(res, {
            statusCode: 200,
            message: "users were returned successfully",
            payload: {
                users: users,
                pagination: pagination,
            },
        })
    } catch (error) {
        next(error)
    }
}

// ~ get single users by id
const handelGetUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const option = { password: 0 };

        const user = await findUserById(id, option);

        return successResponse(res, {
            statusCode: 200,
            message: "users were returned successfully",
            payload: { user },
        })
    } catch (error) {
        next(error)
    }
}

// ! delete user by id
const handelDeleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const option = { password: 0 };

        await deleteUserById(id, option);

        return successResponse(res, {
            statusCode: 200,
            message: "user were deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}

// ? new user create
const handelProcessRegister = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, gender, image, nidBirth } = req.body;

        const userExist = await User.exists({ email: email });
        if (userExist) {
            throw createError(409, 'User with this email already exist. Please lon in ')
        }

        const user = {
            name,
            email,
            password,
            phone,
            address,
            gender,
            image,
            nidBirth
        }
        return successResponse(res, {
            statusCode: 200,
            message: "user was create successfully",
            payload: { user }
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    handelGetUsers,
    handelGetUserById,
    handelDeleteUserById,
    handelProcessRegister
}