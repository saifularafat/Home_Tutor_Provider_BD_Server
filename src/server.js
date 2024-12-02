// const app = require("./app");
// const connectDataBse = require("./config/db");
// const logger = require("./controllers/loggerController");
// const { serverPort } = require('./secret');


// someone hit this website first of all come =>>>>>
// -> server.js then 
//  -> app.js 
// -> userRouter.js 
// -> controllers folder and working is start

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");

const app = express();

// Limit body size
const bodyParserOptions = {
    limit: "100kb",
};

// Middleware Dependencies
app.use(morgan("dev"));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: true }));


// Middleware for authentication
const isLoggedIn = (req, res, next) => {
    const login = true;
    if (login) {
        req.body.id = 101
        next();
    } else {
        return res.status(401).json("Please login first, then try again.");
    }
    // console.log('object Check Now');
    // next()
};

// Root route
app.get("/user", isLoggedIn, (req, res) => {
    console.log(req.body.id);
    res
        .status(200)
        .send(`Home Tutor Provider Bd server site is running at http://localhost:5000`);
});

app.listen(5000, async () => {
    // logger.log('info', `server is run by ${serverPort} E-Commerce Mern stack Project is running by http://localhost:${serverPort}`);
    // await connectDataBse()
    console.log(`tutor provider server is running now http://localhost:5000`);
})