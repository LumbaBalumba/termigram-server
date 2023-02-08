import {Router, Request, Response} from "express"
import * as user_service from "../services/user"
import bodyParser from "body-parser"

const router = Router()

router.post("/signup", bodyParser.json(), async function (req: Request, res: Response) {
    const user_sign_up_dto = {
        name: req.body.name,
        second_name: req.body.second_name,
        login: req.body.login,
        password: req.body.password
    }
    const user = await user_service.signUp(user_sign_up_dto)
    res.send(user)
})

export default router