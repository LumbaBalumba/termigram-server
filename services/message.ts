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