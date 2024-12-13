const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
} = require("../middlewares/auth");

const blogRouter = express.Router();


module.exports = blogRouter;