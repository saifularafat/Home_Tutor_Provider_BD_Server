const createError = require("http-errors");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const { successResponse } = require("../Helper/responseController");
const { createJsonWebToken } = require("../Helper/jsonwebtoken");
const { jsonAccessKey, jsonRefreshKey } = require("../secret");
const { setAccessTokenCookie, setRefreshTokenCookie } = require("../Helper/cookies");

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
            '1m')
        // set up local cookie stor token in the HTTP cookie
        setAccessTokenCookie(res, accessToken)

        // create Refresh jwt token
        const refreshToken = createJsonWebToken(
            { user: userInfo },
            jsonRefreshKey,
            "7d");
        // set up local cookie refresh token in the HTTP cookie
        setRefreshTokenCookie(res, refreshToken)

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

const handleLogout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return successResponse(res, {
            statusCode: 200,
            message: "user logged out successfully"
        })
    } catch (error) {
        next(error)
    }
}

const handleRefreshToken = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        // old refresh token and jwtRefreshKey check the token 
        const decodedToken = jwt.verify(oldRefreshToken, jsonRefreshKey);
        if (!decodedToken) {
            throw createError(
                401,
                'Invalid refresh token. Please login again.'
            )
        }

        // again JWT token create 
        const accessToken = createJsonWebToken(
            { user: decodedToken.user },
            jsonAccessKey,
            "1m");
        // set up local cookie stor token in the HTTP cookie
        setAccessTokenCookie(res, accessToken)
        return successResponse(res, {
            statusCode: 200,
            message: "user refresh Token successfully"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleLogin,
    handleLogout,
    handleRefreshToken,
}