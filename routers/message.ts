import {Router, Request, Response} from "express"
import * as messageService from "../services/message"
import bodyParser from "body-parser"

const router = Router()

router.post("/send", bodyParser.json(), async function (req: Request, res: Response) {
    const message_send_dto = {
        text: req.body.text,
        sender_id: parseInt(req.body.sender_id)
    }
    const message = await messageService.messageSend(message_send_dto)
    res.send(message)
})

router.get("/find_by_id", bodyParser.json(), async function (req: Request, res: Response) {
    const id = parseInt(req.body.id)
    const message = await messageService.messageFindById(id)
    res.send(message)
})

router.get("/get_recent", bodyParser.json(), async function (req: Request, res: Response) {
    const quantity = parseInt(req.body.quantity)
    const message = await messageService.messageGetRecent(quantity)
    res.send(message)
})

export default router