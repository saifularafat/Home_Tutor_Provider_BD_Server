require('dotenv').config()

const serverPort = process.env.SERVER_PORT || 5002

const mongodbURL = `mongodb+srv://${process.env.DATA_USER}:${process.env.DATA_PASS}@cluster0.guqonkt.mongodb.net/home_tutor_provider_bd`
    || "mongodb://localhost:27017/home_tutor_provider_bd"

const defaultUserImagesPath = process.env.UPLOAD_FILE || "public/images/users/userDefault.jpg"

const jsonActivationKey = process.env.JSON_ACTIVATION_KEY || "59c81f406a6bc9b7390ab0_V6dh5Ajx86mRIHuNQtOY"
const jsonAccessKey = process.env.JSON_ACCESS_KEY || "59c81f406a6bc9b7390ab0_Vhb0125pA84963sdx86mRIHuNQtOY"
const jsonRefreshKey = process.env.JSON_REFRESH_KEY || "59cc9b7390ab0_Vhb0125pA84963sdx86mRIHuNLOad14Ww"
const jwtResetPasswordKey = process.env.JWT_RESET_PASSWORD_KEY || "59c81f406a6bc9b7390ab0_Vhb0125pA84963sdx86mRIHuNQtOY"

// email 
const smtpUserName = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";

// image upload url
const uploadDir = process.env.UPLOAD_FILE || "public/image/users"
// user interface in the Client site
const clientUrl = process.env.CLIENT_URL || "";

module.exports = {
    serverPort,
    mongodbURL,
    defaultUserImagesPath,
    jsonActivationKey,
    smtpUserName,
    smtpPassword,
    clientUrl,
    uploadDir,
    jsonAccessKey,
    jsonRefreshKey,
    jwtResetPasswordKey
}