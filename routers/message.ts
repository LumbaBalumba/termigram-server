import {Router, Request, Response} from "express"
import * as message_service from "../services/message"
import bodyParser from "body-parser"

const router = Router()

router.post("/send", bodyParser.json(), async function (req: Request, res: Response) {
    const message_send_dto = {
        text: req.body.text,
        sender_id: req.body.sender_id,
        time: req.body.time
    }
    const message = message_service.messageSend(message_send_dto)
    res.send(message)
})

export default router