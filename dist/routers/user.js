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
const userService = __importStar(require("../services/user"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.post("/signup", body_parser_1.default.json(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_sign_up_dto = {
            login: req.body.login,
            password: req.body.password
        };
        try {
            const user = yield userService.signUp(user_sign_up_dto);
            res.send(user);
        }
        catch (err) {
            res.statusCode = 400;
            res.send(err);
        }
    });
});
router.post("/signin", body_parser_1.default.json(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_sign_in_dto = {
            login: req.body.login,
            password: req.body.password
        };
        try {
            const user = yield userService.signIn(user_sign_in_dto);
            res.send(user);
        }
        catch (err) {
            if (err == "Incorrect password") {
                res.statusCode = 401;
            }
            else {
                res.statusCode = 404;
            }
            res.send(err);
        }
    });
});
exports.default = router;
