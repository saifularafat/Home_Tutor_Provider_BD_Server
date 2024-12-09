const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { successResponse } = require("../Helper/responseController");
const { findUsers, findUserById, deleteUserById } = require("../services/userService");
const User = require('../models/userModel');
const { createJsonWebToken } = require('../Helper/jsonWebToken');
const { jsonActivationKey, clientUrl } = require('../secret');
const sendEmail = require('../Helper/sendEmail');
const checkUserExists = require('../Helper/checkUserExists');

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
        const { name, email, password, phone, address, gender } = req.body;
        const image = req.file;
        // check the image filed 
        if (!image) {
            throw createError(400, "Image file is required!")
        }
        // check the image size 
        if (image.size > 1024 * 1024 * 2) {
            throw createError(400, "Image file is too large. It must be less than 2 MB.")
        }
        const imageBufferString = image.buffer.toString('base64');
        const userExist = await checkUserExists(email);

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
            image: imageBufferString,
        }
        // create token
        const token = createJsonWebToken(
            user,
            jsonActivationKey,
            '30m')

        // prepare user Email
        const emailData = {
            email,
            subject: "Account Activation Email",
            html: `
            <h2>Hello ${name} !</h2>
            <p>Please Click Here to <a href="${clientUrl}/api/users/activate/${token}"
                target="_blank" style='color: green'> Active Your Account</a>
             </p>
            `
        }
        // send email with nodemailer
        await sendEmail(emailData);

        return successResponse(res, {
            statusCode: 200,
            message: `please go to your ${email} for completing your registration process`,
            payload: { token }
        })
    } catch (error) {
        next(error)
    }
}

// ? new user create
const handelActivateUsersAccount = async (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) throw createError(404, 'Token not found!')

        try {
            const decoded = jwt.verify(token, jsonActivationKey)

            if (!decoded) throw createError(401, 'unable to verify user!')

            // const userExists = await User.exists({ email: decoded?.email });
            const userExists = await checkUserExists(decoded?.email);
            if (userExists) {
                throw createError(409, "user email already exists. Please Sign in!")
            }

            await User.create(decoded);

            return successResponse(res, {
                statusCode: 201,
                message: "user was registered successfully ",
            })
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw createError(401, "Token is Expired")
            } else if (error.name === "JsonWebTokenError") {
                throw createError(401, "Invalid Token")
            } else {
                throw error
            }
        }

    } catch (error) {
        next(error)
    }
}


module.exports = {
    handelGetUsers,
    handelGetUserById,
    handelDeleteUserById,
    handelProcessRegister,
    handelActivateUsersAccount,
}