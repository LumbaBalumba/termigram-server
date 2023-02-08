import express, {Express} from "express"
import dotenv from "dotenv"
import user_router from "./routers/user"
import message_router from "./routers/message"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("Welcome to termigram server");
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})

app.use("/user", user_router)
app.use("/message", message_router)