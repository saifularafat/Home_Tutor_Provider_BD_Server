const createError = require('http-errors');
const User = require("../models/userModel");

// find all users
const findUsers = async (search, limit, page) => {
    try {
        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            // isAdmin: { $ne: true },
            // isInstructor: { $ne: true },
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
        if (!users || users.length === 0) { throw createError(404, "user not found !") };

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



module.exports = {
    findUsers,
    findUserById,
    // deleteUserById,
    // updateUserById,
    // handelUserAction,
    // updateUserPasswordById,
    // forgetPasswordByEmail,
    // resetPassword,
}