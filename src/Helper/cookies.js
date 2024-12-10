const setAccessTokenCookie = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
        maxAge: 1 * 60 * 60 * 1000, // 1 house
        httpOnly: true,
        // secure: true,
        sameSite: 'none'
    })
}

module.exports = { setAccessTokenCookie,  }