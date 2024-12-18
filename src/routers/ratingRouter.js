const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
} = require("../middlewares/auth");
const { handelGetRating, handelCreateRating } = require("../controllers/ratingController");

const ratingRouter = express.Router();

ratingRouter.post('/',
    // isLoggedIn,
    handelCreateRating)

ratingRouter.get('/', handelGetRating)


module.exports = ratingRouter;