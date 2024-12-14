const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
} = require("../middlewares/auth");
const { 
    handelGetBlogs, 
    handelGetSingleBlog,
 } = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get('/', handelGetBlogs)

blogRouter.get('/:slug',
     handelGetSingleBlog)

module.exports = blogRouter;