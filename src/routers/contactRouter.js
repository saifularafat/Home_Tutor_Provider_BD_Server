const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");

const {
    handelGetContacts,
    handelGetSingleContact,
} = require("../controllers/contactController");

const contactRouter = express.Router();


contactRouter.get('/', handelGetContacts)

contactRouter.get("/:id([0-9a-fA-F]{24})", handelGetSingleContact)


module.exports = contactRouter;