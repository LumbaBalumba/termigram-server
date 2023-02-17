import prisma from "./prisma-service"
import {MessageSendDTO} from "../dto/message"

export async function messageSend({text, sender_id, receiver_id}: MessageSendDTO) {
    return prisma.message.create({
        data: {
            text: text,
            sender_id: sender_id,
            receiver_id: receiver_id,
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

export async function messageGetRecent(quantity: number) {
    return prisma.message.findMany({
        orderBy: {
            time: "desc"
        },
        take: quantity
    })
}

export async function messageGetByReceiver(receiver_id: number) {
    return prisma.message.findMany({
        where: {
            receiver_id: receiver_id
        }
    })
}

export async function messageDelete(id: number) {
    return prisma.message.delete({
        where: {
            id: id
        }
    })
}