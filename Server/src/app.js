require("dotenv").config()
const { UserRouter } = require("./Routes/User.routes")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8080
const cp = require("cookie-parser")
const { TaskRouter } = require("./Routes/Task.routes")
const cors = require("cors")


app.use(cors({
    origin : "https://task-manager-frontend-iogv.onrender.com",
    credentials : true
}))

app.use(express.json()) // body is undefined, this will parse it
app.use(cp()) // cookie is undefind, this will parse it
app.use("/api/users", UserRouter)
app.use("/api/tasks", TaskRouter)


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connected Successfully...")

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })

})
