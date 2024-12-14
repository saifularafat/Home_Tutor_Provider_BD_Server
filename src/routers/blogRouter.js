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
    handelUpdateBlog,
 } = require("../controllers/blogController");
const { userImageUpload } = require("../middlewares/uploadFile");

const blogRouter = express.Router();

blogRouter.get('/', handelGetBlogs)

blogRouter.get('/:slug',
     handelGetSingleBlog)

blogRouter.put('/:id([0-9a-fA-F]{24})',
    userImageUpload.single("image"),
     handelUpdateBlog)

module.exports = blogRouter;