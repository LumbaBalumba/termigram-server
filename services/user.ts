import prisma from "./prisma-service"
import {UserSignUpDTO, UserSignInDTO} from "../dto/user"

export async function signUp({login, password}: UserSignUpDTO) {
    return prisma.user.create({
        data: {
            login: login,
            password: password
        }
    })
}

export async function signIn({login, password: password}: UserSignInDTO) {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            login: login
        }
    })
    if (user.password != password) {
        throw "Incorrect password"
    }
    return user
}