const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { successResponse } = require("../Helper/responseController");
const { findUsers, findUserById, deleteUserById, updateUserById, handelUserAction, updateUserPasswordById, forgetPasswordByEmail, resetPassword, findTutors } = require("../services/userService");
const User = require('../models/userModel');
const { createJsonWebToken } = require("../Helper/jsonwebtoken");
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

// ^ get all tutor 
const handelGetTutor = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const { tutors, pagination } = await findTutors(search, limit, page);

        return successResponse(res, {
            statusCode: 200,
            message: "Tutor were returned successfully",
            payload: {
                tutors: tutors,
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
        if (!image) {
            throw createError(400, "Image file is required!")
        }
        // check the image size 
        if (image && image.size > 1024 * 1024 * 2) {
            throw createError(400, "Image file is too large. It must be less than 2 MB.")
        }
        const imageBufferString = image.buffer.toString('base64');
        const userExist = await checkUserExists(email);
        if (userExist) {
            throw createError(409, 'User with this email already exist. Please lon in ')
        }

        // Generate a unique userId
        const latestUser = await User.findOne().sort({ createdAt: -1 });
        const uniqueNumber = latestUser && latestUser.userId
            ? String(parseInt(latestUser.userId.split('-')[1]) + 1).padStart(5, '00100')
            : '00001';
        const userId = `HTPBD-${uniqueNumber}`;
        
        const user = {
            userId,
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
            '1h')
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

// ^ new user activate
const handelActivateUsersAccount = async (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) throw createError(404, 'Token not found!')

        try {
            const decoded = jwt.verify(token, jsonActivationKey)

            if (!decoded) throw createError(401, 'unable to verify user!')
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

// ~ user update by id
const handelUpdateUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUser = await updateUserById(id, req);
        return successResponse(res, {
            statusCode: 200,
            message: "user update successfully",
            payload: { updateUser },
        })
    } catch (error) {
        next(error)
    }
}

// * user ban and unBan by ID wait admin
const handelManageUserBanAndUnBanById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const action = req.body.action;

        await handelUserAction(id, action);

        return successResponse(res, {
            statusCode: 200,
            message: `user were ${action} successfully`,
            payload: {},
        })
    } catch (error) {
        next(error)
    }
}

// ! user Password update by ID
const handelUpdatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmedPassword } = req.body;
        const userId = req.params.id;

        const updatedUser = await updateUserPasswordById(
            userId,
            oldPassword,
            newPassword,
            confirmedPassword
        );
        return successResponse(res, {
            statusCode: 200,
            message: "Your password is updated successfully",
            payload: { user: updatedUser }
        })
    } catch (error) {
        next(error)
    }
}

// ! Forget Password By Email
const handelForgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const token = await forgetPasswordByEmail(email)

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to your ${email} for resting in the password`,
            payload: token,
        })
    } catch (error) {
        next(error)
    }
}

// ! Reset Password by token
const handelResetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;

        await resetPassword(token, newPassword);

        return successResponse(res, {
            statusCode: 200,
            message: "Password reset successfully",
            // payload: {}
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetUsers,
    handelGetUserById,
    handelProcessRegister,
    handelActivateUsersAccount,
    handelUpdateUserByID,
    handelDeleteUserById,
    handelManageUserBanAndUnBanById,
    handelUpdatePassword,
    handelForgetPassword,
    handelResetPassword,
    handelGetTutor,
}