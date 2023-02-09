import prisma from "./prisma-service"
import {MessageSendDTO} from "../dto/message"

export async function messageSend({text, sender_id, time}: MessageSendDTO) {
    return prisma.message.create({
        data: {
            text: text,
            sender_id: sender_id,
            time: time
        }
    })
}

export async function messageFindById(id: number) {
    return prisma.message.findUnique({
        where: {
            id: id
        }
    })
}