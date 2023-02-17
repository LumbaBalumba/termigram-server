import {Router, Request, Response} from "express"
import * as messageService from "../services/message"
import bodyParser from "body-parser"

const router = Router()

router.post("/send", bodyParser.json(), async function (req: Request, res: Response) {
    const message_send_dto = {
        text: req.body.text,
        sender_id: parseInt(req.body.sender_id),
        receiver_id: parseInt(req.body.receiver_id)
    }
    const message = await messageService.messageSend(message_send_dto)
    res.send(message)
})

router.get("/find_by_id", bodyParser.json(), async function (req: Request, res: Response) {
    const id = parseInt(req.body.id)
    if (isNaN(id)) {
        res.statusCode = 400
        res.send("Invalid id")
    }
    try {
        const message = await messageService.messageFindById(id)
        res.send(message)
    } catch (err) {
        res.statusCode = 404
        res.send(err)
    }
})

router.get("/get_recent", bodyParser.json(), async function (req: Request, res: Response) {
    const quantity = parseInt(req.body.quantity)
    if (isNaN(quantity)) {
        res.statusCode = 400
        res.send("Invalid quantity")
    }
    try {
        const message = await messageService.messageGetRecent(quantity)
        res.send(message)
    } catch (err) {
        res.statusCode = 404
        res.send(err)
    }
})

router.get("/get_unreceived", bodyParser.json(), async function (req: Request, res: Response) {
    const receiver_id = parseInt(req.body.receiver_id)
    if (isNaN(receiver_id)) {
        res.statusCode = 404
        res.send("User not found")
    } else {
        try {
            const messages = await messageService.messageGetByReceiver(receiver_id)
            res.send(messages)
        } catch (err) {
            res.statusCode = 404
            res.send(err)
        }
    }
})

router.delete("/delete", bodyParser.json(), async function (req: Request, res: Response) {
    const id = parseInt(req.body.id)
    if (isNaN(id)) {
        res.statusCode = 404
        res.send("User not found")
    } else {
        try {
            const message = await messageService.messageDelete(id)
            res.send(message)
        } catch (err) {
            res.statusCode = 404
            res.send(err)
        }
    }
})

export default router