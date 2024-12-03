const { successResponse } = require("../Helper/responseController");
const { findUsers, findUserById } = require("../services/userService");

// ! get all users 
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

// ! get single users by id
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

module.exports = {
    handelGetUsers,
    handelGetUserById
}