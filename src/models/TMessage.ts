import {Sender} from "@/models/Auth";

export type TMessage = {
    "id": number,
    "content": string,
    "createdAt": string,
    "updatedAt": string,
    "senderId": number,
    "recipientId": number,
    "channelId": number,
    "sender": Sender
}