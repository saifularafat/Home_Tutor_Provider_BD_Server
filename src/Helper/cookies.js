const setAccessTokenCookie = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
        maxAge: 3 * 60 * 60 * 1000, // 3 house
        httpOnly: true,
        // secure: true,
        sameSite: 'none'
    })
}

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
        httpOnly: true,
        // secure: true,
        sameSite: 'none'
    })
}

module.exports = { setAccessTokenCookie, setRefreshTokenCookie }