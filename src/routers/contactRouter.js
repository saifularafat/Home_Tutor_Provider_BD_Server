const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");

const {
    handelGetContacts,
} = require("../controllers/contactController");

const contactRouter = express.Router();


contactRouter.get('/', handelGetContacts)


module.exports = contactRouter;