const app = require("./app")
const connectDataBse = require("./config/db")
const logger = require("./controllers/loggerController")
const { serverPort } = require("./secret")


app.listen(serverPort, async () => {
    logger.log('info', `home tutor provider BD is running at http://localhost:${serverPort}`)
    await connectDataBse()
})