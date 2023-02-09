import express, {Express, NextFunction, Request, Response} from "express"
import dotenv from "dotenv"
import user_router from "./routers/user"
import message_router from "./routers/message"
import bodyParser from "body-parser"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("Welcome to termigram server")
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req: Request, res: Response, next: NextFunction) => {
    bodyParser.json()(req, res, err => {
        if (err) {
            res.statusCode = 400
            res.send(err)
        }
        next()
    })
})
app.use("/user", user_router)
app.use("/message", message_router)