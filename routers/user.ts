import {Router, Request, Response} from "express"
import * as userService from "../services/user"
import bodyParser from "body-parser"

const router = Router()

router.post("/signup", bodyParser.json(), async function (req: Request, res: Response) {
    const user_sign_up_dto = {
        login: req.body.login,
        password: req.body.password
    }
    const user = await userService.signUp(user_sign_up_dto)
    res.send(user)
})

router.post("/signin", bodyParser.json(), async function (req: Request, res: Response) {
    const user_sign_in_dto = {
        login: req.body.login,
        password: req.body.password
    }
    const user = await userService.signIn(user_sign_in_dto)
    res.send(user)
})

export default router