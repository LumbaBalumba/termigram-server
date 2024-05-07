"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageService = __importStar(require("../services/message"));
const userService = __importStar(require("../services/user"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.post("/send", body_parser_1.default.json(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message_send_dto = {
                text: req.body.text,
                sender_id: parseInt(req.body.sender_id),
                receiver_id: (yield userService.findByLogin(req.body.receiver_login)).id
            };
            const message = yield messageService.messageSend(message_send_dto);
            res.send(message);
        }
        catch (err) {
            res.statusCode = 400;
            res.send(err);
        }
    });
});
router.get("/find_by_id", body_parser_1.default.json(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.body.id);
        if (isNaN(id)) {
            res.statusCode = 400;
            res.send("Invalid id");
        }
        try {
            const message = yield messageService.messageFindById(id);
            res.send(message);
        }
        catch (err) {
            res.statusCode = 404;
            res.send(err);
        }
    });
});
router.get("/get_recent", body_parser_1.default.json(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const quantity = parseInt(req.body.quantity);
        if (isNaN(quantity)) {
            res.statusCode = 400;
            res.send("Invalid quantity");
        }
        try {
            const messages = yield messageService.messageGetRecent(quantity);
            res.send(messages);
        }
        catch (err) {
            res.statusCode = 404;
            res.send(err);
        }
    });
});
router.get("/get_unreceived", body_parser_1.default.json(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const receiver_id = parseInt(req.body.receiver_id);
        if (isNaN(receiver_id)) {
            res.statusCode = 404;
            res.send("User not found");
        }
        else {
            try {
                const messages = yield messageService.messageGetByReceiver(receiver_id);
                let messages_final = [];
                for (let i = 0; i < messages.length; ++i) {
                    const text = messages[i].text;
                    const time = messages[i].time;
                    const sender = (yield userService.findById(messages[i].sender_id)).login;
                    const id = messages[i].id;
                    messages_final.push({ id: id, text: text, sender: sender, time: time.toTimeString() });
                }
                res.send(messages_final);
            }
            catch (err) {
                res.statusCode = 404;
                res.send(err);
            }
        }
    });
});
router.delete("/delete", body_parser_1.default.json(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.body.id);
        if (isNaN(id)) {
            res.statusCode = 404;
            res.send("User not found");
        }
        else {
            try {
                const message = yield messageService.messageDelete(id);
                res.send(message);
            }
            catch (err) {
                res.statusCode = 404;
                res.send(err);
            }
        }
    });
});
exports.default = router;
