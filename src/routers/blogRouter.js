const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
} = require("../middlewares/auth");
const { handelGetBlogs } = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get('/', handelGetBlogs)

module.exports = blogRouter;