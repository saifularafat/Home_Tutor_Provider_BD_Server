const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");

const app = express();

// API request rate limiter
const rateLimitApi = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Max 10 requests per IP
    message: "Too many requests from this IP. Please try again later.",
});

// Limit body size
const bodyParserOptions = {
    limit: "100kb",
};

// app.use(cookieParser());
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimitApi); // all api router is work now hit this router secret

// router api setup 
app.use('/api/user', userRouter)
app.use('/api/seed', seedRouter)


// Client-side error handling
app.use((req, res, next) => {
    next(createError(404, "Route not found."));
});
// Server-side error handling
app.use((err, req, res, next) => {
    // return createError(res, {
    //     statusCode: err.status || 500,
    //     message: err.message || "Internal Server Error",
    // });
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    })
});

module.exports = app;


