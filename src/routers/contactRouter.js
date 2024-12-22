const express = require("express");

const runValidation = require("../validators");
const {
    isLoggedIn,
    isAdmin,
} = require("../middlewares/auth");

const {
    handelGetContacts,
    handelGetSingleContact,
    handelDeleteContact,
} = require("../controllers/contactController");

const contactRouter = express.Router();


contactRouter.get('/', handelGetContacts)

contactRouter.get("/:id([0-9a-fA-F]{24})", handelGetSingleContact)

contactRouter.delete("/:id([0-9a-fA-F]{24})", handelDeleteContact)

module.exports = contactRouter;