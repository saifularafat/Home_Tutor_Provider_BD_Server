const createError = require('http-errors');

const User = require("../models/userModel");
const { findWithId } = require('./findWithId');

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
        // name, email, password, image, phone, address
        const allowedFields = ['name', 'password', 'phone', 'address', 'gender',]
        for (const key in req.body) {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key];
            }
            else if (key === 'email') {
                throw createError(400, "Email can not be updated.")
            }
        }
        // image update verify
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

module.exports = {
    findUsers,
    findUserById,
    deleteUserById,
    updateUserById,
    handelUserAction,
    // updateUserPasswordById,
    // forgetPasswordByEmail,
    // resetPassword,
}