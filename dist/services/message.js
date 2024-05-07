"use strict";
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
exports.messageDelete = exports.messageGetByReceiver = exports.messageGetRecent = exports.messageFindById = exports.messageSend = void 0;
const prisma_service_1 = __importDefault(require("./prisma-service"));
function messageSend({ text, sender_id, receiver_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.message.create({
            data: {
                text: text,
                sender_id: sender_id,
                receiver_id: receiver_id,
                time: new Date()
            }
        });
    });
}
exports.messageSend = messageSend;
function messageFindById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.message.findUniqueOrThrow({
            where: {
                id: id
            }
        });
    });
}
exports.messageFindById = messageFindById;
function messageGetRecent(quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.message.findMany({
            orderBy: {
                time: "desc"
            },
            take: quantity
        });
    });
}
exports.messageGetRecent = messageGetRecent;
function messageGetByReceiver(receiver_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.message.findMany({
            where: {
                receiver_id: receiver_id
            }
        });
    });
}
exports.messageGetByReceiver = messageGetByReceiver;
function messageDelete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.message.delete({
            where: {
                id: id
            }
        });
    });
}
exports.messageDelete = messageDelete;
