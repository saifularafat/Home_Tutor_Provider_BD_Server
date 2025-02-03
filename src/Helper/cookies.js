require('dotenv').config();
const setAccessTokenCookie = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
        httpOnly: true, // Prevents JavaScript access to the cookie (security feature)
        secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',  // Allows cross-site cookies (important for cross-domain authentication)
    });
};

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
        sameSite: 'None', // Important for cross-domain cookie sharing
    });
};


module.exports = { setAccessTokenCookie, setRefreshTokenCookie }