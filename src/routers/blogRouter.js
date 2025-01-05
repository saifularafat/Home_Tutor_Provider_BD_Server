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
    handelManageBlogApproveAndPendingById,
} = require("../controllers/blogController");
const { userImageUpload } = require("../middlewares/uploadFile");
const { validatorBlog } = require("../validators/blog");

const blogRouter = express.Router();

blogRouter.post('/',
    validatorBlog,
    runValidation,
    // isLoggedIn,
    handelCreateBlog)

blogRouter.get('/', handelGetBlogs)

blogRouter.get('/:id([0-9a-fA-F]{24})',
    handelGetSingleBlog)

blogRouter.put('/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    handelUpdateBlog)

blogRouter.put("/manage-blog/:id([0-9a-fA-F]{24})",
    // isLoggedIn,
    // isAdmin,
    handelManageBlogApproveAndPendingById
);

blogRouter.delete('/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    handelDeleteBlog)

module.exports = blogRouter;