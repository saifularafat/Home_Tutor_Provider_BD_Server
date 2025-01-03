const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");
const {
    handelGetBlogs,
    handelGetSingleBlog,
    handelUpdateBlog,
    handelDeleteBlog,
    handelCreateBlog,
} = require("../controllers/blogController");
const { userImageUpload } = require("../middlewares/uploadFile");
const { validatorBlog } = require("../validators/blog");

const blogRouter = express.Router();

blogRouter.post('/',
    userImageUpload.single("image"),
    validatorBlog,
    runValidation,
    isLoggedIn,
    handelCreateBlog)

blogRouter.get('/', handelGetBlogs)

blogRouter.get('/:id([0-9a-fA-F]{24})',
    handelGetSingleBlog)

blogRouter.put('/:id([0-9a-fA-F]{24})',
    userImageUpload.single("image"),
    isLoggedIn,
    handelUpdateBlog)

blogRouter.delete('/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    handelDeleteBlog)

module.exports = blogRouter;