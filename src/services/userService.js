const createError = require('http-errors');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");
const { findWithId } = require('./findWithId');
const { createJsonWebToken } = require('../Helper/jsonwebtoken');
const { jwtResetPasswordKey, clientUrl } = require('../secret');
const sendEmail = require('../Helper/sendEmail');

// find all users
const findUsers = async (search, limit, page) => {
    try {
        const searchRegExp = new RegExp(".*" + search + ".*", "i");
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        }
        // don't show all users password
        const options = { password: 0 }
        const users = await User
            .find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);

        // Total page get in an all users 
        const count = await User.find(filter).countDocuments();

        // search don't mach this search Value than error throw
        if (!users || users.length === 0) throw createError(404, "user not found !");
        return {
            users,
            pagination: {
                totalPage: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            },
        };
    } catch (error) {
        throw error;
    }
}

// find all Tutor
const findTutors = async (search, limit, page) => {
    try {
        const searchRegExp = new RegExp(".*" + search + ".*", "i");
        const filter = {
            isTutor: true,
            $or: [
                { name: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ],
        };
        const options = { password: 0 }
        const tutors = await User
            .find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await User.find(filter).countDocuments();
        if (!tutors || tutors.length === 0) throw createError(404, "Tutor not found !");

        return {
            tutors,
            pagination: {
                totalPage: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            },
        };
    } catch (error) {
        throw error;
    }
}

// single tutor by id
const findTutorById = async (id, options = {}) => {
    try {
        const user = await User.findById(id, options);

        if (!user) throw createError(404, "user not found");
        return user;
    } catch (error) {
        throw error;
    }
}

// single user by id
const findUserById = async (id, options = {}) => {
    try {
        const user = await User.findById(id, options);
        if (!user) throw createError(404, "user not found");
        return user;
    } catch (error) {
        throw error;
    }
}

// deleted user by id
const deleteUserById = async (id, option = {}) => {
    try {
        await findWithId(User, id, option);
        const user = await User.findByIdAndDelete({
            _id: id,
            isAdmin: false
        });
        if (!user) throw createError(404, "user des't this id exist.")
    } catch (error) {
        throw error;
    }
}

//update user by id
const updateUserById = async (userId, req) => {
    try {
        const options = { password: 0 };
        await findWithId(User, userId, options);

        const updateOptions = { new: true, runValidators: true, context: 'query' };
        let updates = {}
        const allowedFields = ['name', 'password', 'phone', 'address', 'gender',]
        for (const key in req.body) {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key];
            }
            else if (key === 'email') {
                throw createError(400, "Email can not be updated.")
            }
        }

        const image = req.file;
        if (image) {
            if (image.size > 1024 * 1024 * 2) {
                throw createError(400, "Image file is too large. It must be less than 2 MB.")
            }
            updates.image = image.buffer.toString('base64')
        }
        // nidBirth update verify
        const nidBirth = req.file;
        if (nidBirth) {
            if (nidBirth.size > 1024 * 1024 * 2) {
                throw createError(400, "Nid/Birth file is too large. It must be less than 2 MB.")
            }
            updates.nidBirth = nidBirth.buffer.toString('base64')
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            updateOptions,
        ).select('-password');
        if (!updatedUser) {
            throw createError(404, "User with this ID dons not exist.")
        }
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

const handelUserAction = async (id, action) => {
    try {
        let update;

        if (action === 'ban') {
            update = { isBanned: true };
        } else if (action === 'unBan') {
            update = { isBanned: false };
        } else {
            throw createError(400, 'Invalid action, Please select Ban and UnBan option.!')
        }
        const updateOption = { new: true, runValidators: true, context: 'query' };
        const updateUser = await User.findByIdAndUpdate(id, update, updateOption).select('-password');
        if (!updateUser) {
            throw createError(
                400,
                `user was not ${action} successfully, Please try again`)
        }
    } catch (error) {
        throw error;
    }
}

// user password update service handel
const updateUserPasswordById = async (userId, oldPassword, newPassword, confirmedPassword) => {
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw createError(400, 'User Email is not found.')
        }

        // Check if new password and confirmed password match
        if (newPassword !== confirmedPassword) {
            throw createError(400, 'New password and confirmed password did not match');
        }
        // compare the password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordMatch) {
            throw createError(401, 'old password is incorrect')
        }
        // Hash the new password
        const updatePassword = await bcrypt.hash(newPassword, 10);

        // update options
        const filter = { _id: userId };
        const updates = { $set: { password: updatePassword } };
        const updateOptions = { new: true };

        const updatedUser = await User.findByIdAndUpdate(
            filter,
            updates,
            updateOptions
        ).select('-password');
        if (!updatedUser) {
            throw createError(404, "User with this ID dons not exist.")
        }
        return updatedUser;
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            throw createError(400, 'Invalid Id')
        }
        throw (error);
    }
}

const forgetPasswordByEmail = async (email) => {
    try {
        const userData = await User.findOne({ email: email });
        if (!userData) {
            throw createError(
                404,
                'Email is incorrect or you have not verified your Email address. Please register First')
        }

        // create jwt token
        const token = createJsonWebToken(
            { email },
            jwtResetPasswordKey,
            "10m")

        // prepare email
        const emailData = {
            email,
            subject: "Forget Your Password Email",
            html: `
        <h2>Hello ${userData?.name}!</h2>
        <p>
            Please click here to <a href="${clientUrl}/api/users/forget-password/${token}" target="_blank">Forget your password</a>.
        </p>
        <p>
            <b style="color: red;">Warning:</b> Please copy the token carefully. Do not share this token with anyone for security reasons.
        </p>
        <p>
            <span style="color: black; font-size: 18px; font-weight: bold;">Token:</span>
            <u style="cursor: pointer; color: blue;">${token}</u>
        </p>
        <p>
         If the link does not work, you can manually copy this token and use it to reset your password.
        </p>
            `
        };

        // send email with nodemailer
        sendEmail(emailData)
        return token;

    } catch (error) {
        throw error;
    }
}

// user reset Password By email service handel
const resetPassword = async (token, newPassword) => {
    try {
        // verify jwt token
        const decoded = jwt.verify(token, jwtResetPasswordKey);
        if (!decoded) {
            throw createError(400, 'Invalid or expired token.')
        }
        // Hash the new password
        const updatePassword = await bcrypt.hash(newPassword, 10);
        // update options
        const filter = { email: decoded.email };
        const updates = { password: updatePassword };
        const updateOptions = { new: true };

        const updatedUser = await User.findOneAndUpdate(
            filter,
            updates,
            updateOptions
        ).select('-password');

        if (!updatedUser) {
            throw createError(400, "Password reset failed.")
        }

    } catch (error) {
        throw (error);
    }
}

module.exports = {
    findUsers,
    findUserById,
    deleteUserById,
    updateUserById,
    handelUserAction,
    updateUserPasswordById,
    forgetPasswordByEmail,
    resetPassword,
    findTutors,
    findTutorById,
}