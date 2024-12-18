const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
} = require("../middlewares/auth");
const { handelGetRating } = require("../controllers/ratingController");

const ratingRouter = express.Router();


ratingRouter.get('/', handelGetRating)


module.exports = ratingRouter;