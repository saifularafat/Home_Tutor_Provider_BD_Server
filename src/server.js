const app = require("./app")
const connectDataBse = require("./config/db")
const { serverPort } = require("./secret")


app.listen(serverPort, async () => {
    console.log(`home tutor provider BD is running at http://localhost:${serverPort}`)
    await connectDataBse()
})