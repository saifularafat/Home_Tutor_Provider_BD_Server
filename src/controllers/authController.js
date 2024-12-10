const createError = require("http-errors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const { successResponse } = require("../Helper/responseController");
const { createJsonWebToken } = require("../Helper/jsonwebtoken");
const { jsonAccessKey } = require("../secret");
const { setAccessTokenCookie } = require("../Helper/cookies");
// const { jsonAccessKey, jsonRefreshKey } = require("../secret");
// const { setAccessTokenCookie, setRefreshTokenCookie } = require("../Helper/cookies");

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw createError(
                404,
                " User does not exist with this Email. Please Register first"
            )
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw createError(
                401,
                " Email/Password did not match!"
            )
        }
        if (user.isBanned) {
            throw createError(
                403,
                "You are Banned. Please contact Authority"
            )
        }

        // token, cookie without image
        const userInfo = {
            _id: user?._id,
            email: user?.email,
            password: user?.password,
            name: user?.name,
            phone: user?.phone,
            address: user?.address,
            isAdmin: user?.isAdmin,
            isTutor: user?.isTutor,
            isParent: user?.isParent,
            isCoaching: user?.isCoaching,
            isBanned: user?.isBanned,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
        }
        // create token
        const accessToken = createJsonWebToken(
            { user: userInfo },
            jsonAccessKey,
            '1h')

        // set up local cookie stor token in the HTTP cookie
        setAccessTokenCookie(res, accessToken)

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return successResponse(res, {
            statusCode: 200,
            message: "user logged in successfully",
            payload: { user: userWithoutPassword }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleLogin,
}