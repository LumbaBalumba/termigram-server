import { Router, Request, Response } from "express";
import * as messageService from "../services/message";
import * as userService from "../services/user";
import bodyParser from "body-parser";

const router = Router();

router.post(
  "/send",
  bodyParser.json(),
  async function (req: Request, res: Response) {
    try {
      const message_send_dto = {
        text: req.body.text,
        sender_id: parseInt(req.body.sender_id),
        receiver_id: (await userService.findByLogin(req.body.receiver_login))
          .id,
      };
      const message = await messageService.messageSend(message_send_dto);
      res.send(message);
    } catch (err) {
      res.statusCode = 400;
      res.send(err);
    }
  },
);

router.get(
  "/find_by_id",
  bodyParser.json(),
  async function (req: Request, res: Response) {
    const id = parseInt(req.body.id);
    if (isNaN(id)) {
      res.statusCode = 400;
      res.send("Invalid id");
    }
    try {
      const message = await messageService.messageFindById(id);
      res.send(message);
    } catch (err) {
      res.statusCode = 404;
      res.send(err);
    }
  },
);

router.get(
  "/get_recent",
  bodyParser.json(),
  async function (req: Request, res: Response) {
    const quantity = parseInt(req.body.quantity);
    if (isNaN(quantity)) {
      res.statusCode = 400;
      res.send("Invalid quantity");
    }
    try {
      const messages = await messageService.messageGetRecent(quantity);
      res.send(messages);
    } catch (err) {
      res.statusCode = 404;
      res.send(err);
    }
  },
);

router.get(
  "/get_unreceived",
  bodyParser.json(),
  async function (req: Request, res: Response) {
    const receiver_id = parseInt(req.body.receiver_id);
    if (isNaN(receiver_id)) {
      res.statusCode = 404;
      res.send("User not found");
    } else {
      try {
        const messages = await messageService.messageGetByReceiver(receiver_id);
        let messages_final = [];
        for (let i = 0; i < messages.length; ++i) {
          const text = messages[i].text;
          const time = messages[i].time;
          const sender = (await userService.findById(messages[i].sender_id))
            .login;
          const id = messages[i].id;
          messages_final.push({
            id: id,
            text: text,
            sender: sender,
            time: time.toTimeString(),
          });
        }
        res.send(messages_final);
      } catch (err) {
        res.statusCode = 404;
        res.send(err);
      }
    }
  },
);

router.delete(
  "/delete",
  bodyParser.json(),
  async function (req: Request, res: Response) {
    const id = parseInt(req.body.id);
    if (isNaN(id)) {
      res.statusCode = 404;
      res.send("User not found");
    } else {
      try {
        const message = await messageService.messageDelete(id);
        res.send(message);
      } catch (err) {
        res.statusCode = 404;
        res.send(err);
      }
    }
  },
);

export default router;
