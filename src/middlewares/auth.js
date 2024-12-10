const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jsonAccessKey } = require("../secret");

const isLoggedIn = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw createError(401, 'Access token not found.Please Log in..!')
        }
        const decoded = jwt.verify(accessToken, jsonAccessKey)
        if (!decoded) {
            throw createError(401, 'Invalid access token. Please login Again.!')
        }
        req.user = decoded.user;
        next();
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    isLoggedIn,
}