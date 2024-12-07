const createError = require('http-errors');
const sendEmailWithNodeMailer = require('./email');

const sendEmail = async (emailData) => {
    try {
        // * unComment now
        // await sendEmailWithNodeMailer(emailData)
    } catch (emailError) {
        throw createError(500, " Failed to send verification Email")
    }
}
module.exports = sendEmail;