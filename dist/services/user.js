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
exports.findById = exports.findByLogin = exports.signIn = exports.signUp = void 0;
const prisma_service_1 = __importDefault(require("./prisma-service"));
function signUp({ login, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.user.create({
            data: {
                login: login,
                password: password
            }
        });
    });
}
exports.signUp = signUp;
function signIn({ login, password: password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_service_1.default.user.findUniqueOrThrow({
            where: {
                login: login
            }
        });
        if (user.password != password) {
            throw "Incorrect password";
        }
        return user;
    });
}
exports.signIn = signIn;
function findByLogin(login) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.user.findUniqueOrThrow({
            where: {
                login: login
            }
        });
    });
}
exports.findByLogin = findByLogin;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma_service_1.default.user.findUniqueOrThrow({
            where: {
                id: id
            }
        });
    });
}
exports.findById = findById;
