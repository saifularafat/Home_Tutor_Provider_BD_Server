const users = [
    { id: 10, name: 'saiful' },
    { id: 11, name: 'Arafat' },
    { id: 12, name: 'Shahadat' },
    { id: 13, name: 'Shadman' },
    { id: 14, name: 'Islam' },
]
const handelGetUsers = async (req, res, next) => {
    try {
        res.status(200).send({
            message: 'user Get is Handle Now Okay.',
            users: users,
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    handelGetUsers,
}