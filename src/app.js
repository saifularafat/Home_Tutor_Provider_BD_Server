const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { serverPort } = require("./secret");
const { errorResponse } = require("./Helper/responseController");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const authRouter = require("./routers/authRouter");
const tuitionJobRouter = require("./routers/tuitionJobRouter");
const blogRouter = require("./routers/blogRouter");
const ratingRouter = require("./routers/ratingRouter");
const tutorRequestRouter = require("./routers/tutorRequestRouter");
const tutorJobApplyRouter = require("./routers/tutorJobApplyRouter");
const contactRouter = require("./routers/contactRouter");

const app = express();

// API request rate limiter
const rateLimitApi = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // Max 10 requests per IP
    message: "Too many requests from this IP. Please try again later.",
});

// Limit body size
const bodyParserOptions = {
    limit: "100kb",
};


/* middleware */
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimitApi); // all api router is work now hit this router secret

// router api setup 
app.use('/api/users', userRouter)
app.use("/api/auth", authRouter);
app.use("/api/tuition-job", tuitionJobRouter);
app.use("/api/tutor-request", tutorRequestRouter);
app.use("/api/job-apply", tutorJobApplyRouter);
app.use('/api/blog', blogRouter)
app.use('/api/rating', ratingRouter)
app.use('/api/contact', contactRouter)
app.use('/api/seed', seedRouter)



// Root route
app.get("/", (req, res) => {
    res
        .status(200)
        .send(`Home Tutor Provider BD server site is running at http://localhost:${serverPort}`);
});

// Client-side error handling
app.use((req, res, next) => {
    next(createError(404, "route not found."));
});
// Server-side error handling
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status || 500,
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;


