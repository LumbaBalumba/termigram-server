import prisma from "./prisma-service"
import {MessageSendDTO} from "../dto/message"

export async function messageSend({text, sender_id}: MessageSendDTO) {
    return prisma.message.create({
        data: {
            text: text,
            sender_id: sender_id,
            time: new Date()
        }
    })
}

export async function messageFindById(id: number) {
    return prisma.message.findUniqueOrThrow({
        where: {
            id: id
        }
    })
}