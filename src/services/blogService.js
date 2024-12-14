const createError = require('http-errors');
const slugify = require("slugify");
const Blog = require('../models/blogModel');


const getBlogs = async (page = 1, limit = 5, filter = {}) => {
    const blogs = await Blog.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!blogs) {
        throw createError(404, 'Blog Not Found')
    }
    const count = await Blog.find(filter).countDocuments();

    return {
        blogs,
        count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
    }
}

const getSingleBlog = async (slug) => {
    try {
        const blog = await Blog.findOne({ slug }).lean()
        if (!blog) throw createError(404, 'This Blog not found.')
        return blog
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getBlogs,
    getSingleBlog,

}