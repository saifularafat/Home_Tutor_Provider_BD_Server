const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");
const {
    handelGetRating,
    handelCreateRating,
    handelDeleteRating
} = require("../controllers/ratingController");

const ratingRouter = express.Router();

ratingRouter.post('/',
    isLoggedIn,
    runValidation,
    handelCreateRating)

ratingRouter.get('/', handelGetRating)

ratingRouter.delete('/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    isAdmin,
    handelDeleteRating)

module.exports = ratingRouter;