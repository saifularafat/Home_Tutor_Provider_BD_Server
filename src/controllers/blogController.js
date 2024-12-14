const createError = require('http-errors');
const { successResponse } = require("../Helper/responseController");
const { getBlogs, getSingleBlog, updateBlogById, deleteBlogById, createBlog } = require('../services/blogService');

const handelCreateBlog = async (req, res, next) => {
    try {
        const {
            title,
            medium,
            category,
            subject,
            studentHelp,
            description,
            authorName,
            authorEducationLevel,
            authorStudySubject,
            authorProfession,
            userId,
        } = req.body;

        const image = req.file;
        if (!image) {
            throw createError(400, "Image file is required!")
        }
        // check the image size 
        if (image.size > 1024 * 1024 * 2) {
            throw createError(400, "Image file is too large. It must be less than 2 MB.")
        }
        const imageBufferString = image.buffer.toString('base64');

        const blogData = {
            title,
            image: imageBufferString,
            medium,
            category,
            subject,
            studentHelp,
            description,
            authorName,
            authorEducationLevel,
            authorStudySubject,
            authorProfession,
            userId,
        }
        const blog = await createBlog(blogData);
        return successResponse(res, {
            statusCode: 201,
            message: `New blog is create successfully.`,
            payload: {blog}
        })
    } catch (error) {
        next(error)
    }
}

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

const handelGetSingleBlog = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const blog = await getSingleBlog(slug);
        return successResponse(res, {
            statusCode: 201,
            message: `Return Blog successfully.`,
            payload: { blog }
        }
        )
    } catch (error) {
        next(error)
    }
}

const handelUpdateBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateBlog = await updateBlogById(id, req);

        return successResponse(res, {
            statusCode: 201,
            message: `Return update blog successfully.`,
            payload: { updateBlog }
        }
        )
    } catch (error) {
        next(error)
    }
}

const handelDeleteBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteBlogById(id);
        return successResponse(res, {
            statusCode: 201,
            message: `Delete were blog successfully.`,
        }
        )
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handelCreateBlog,
    handelGetBlogs,
    handelGetSingleBlog,
    handelUpdateBlog,
    handelDeleteBlog,
}