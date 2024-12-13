const createError = require('http-errors');
const slugify = require("slugify")
const { successResponse } = require("../Helper/responseController");
const { getBlogs } = require('../services/blogService');

const handelGetBlogs = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            $or: [
                { title: { $regex: searchRegExp } },
                { category: { $regex: searchRegExp } },
                { subject: { $regex: searchRegExp } },
                { authorName: { $regex: searchRegExp } },
            ]
        }

        const blogData = await getBlogs(page, limit, filter)

        return successResponse(res, {
            statusCode: 201,
            message: `Return all Blog successfully.`,
            payload: {
                blogs: blogData.blogs,
                pagination: {
                    totalPage: blogData.totalPage,
                    currentPage: blogData.currentPage,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfBlog: blogData.count
                }
            },
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelGetBlogs,
}