import {Router, Request, Response} from "express"
import * as userService from "../services/user"
import bodyParser from "body-parser"

const router = Router()

router.post("/signup", bodyParser.json(), async function (req: Request, res: Response) {
    const user_sign_up_dto = {
        login: req.body.login,
        password: req.body.password
    }
    try {
        const user = await userService.signUp(user_sign_up_dto)
        res.send(user)
    } catch (err) {
        res.statusCode = 500
        res.send(err)
    }
})

router.post("/signin", bodyParser.json(), async function (req: Request, res: Response) {
    const user_sign_in_dto = {
        login: req.body.login,
        password: req.body.password
    }
    try {
        const user = await userService.signIn(user_sign_in_dto)
        res.send(user)
    } catch (err) {
        if (err =="Incorrect password"){
            res.statusCode = 401
        }else{
            res.statusCode = 404
        }
        res.send(err)
    }
})

export default router