const app = require("./app")
const { serverPort } = require("./sceret")


app.listen(serverPort, async () => {
    console.log(`home tutor provider BD is running at http://localhost:${serverPort}`)
})