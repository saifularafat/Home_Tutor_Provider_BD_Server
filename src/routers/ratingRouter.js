const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
} = require("../middlewares/auth");
const { handelGetRating, handelCreateRating, handelDeleteRating } = require("../controllers/ratingController");

const ratingRouter = express.Router();

ratingRouter.post('/',
    isLoggedIn,
    handelCreateRating)

ratingRouter.get('/', handelGetRating)
ratingRouter.delete('/:id([0-9a-fA-F]{24})', handelDeleteRating)


module.exports = ratingRouter;