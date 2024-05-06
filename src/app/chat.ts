import { Message } from "./message";

export class Chat {

    chatId!: number;
    firstUserName!: string;
    secondUserName!: string;
    messageList!: Message[];

    constructor() {
        // Initialisation des propriétés si nécessaire
        this.chatId = 0;
        this.firstUserName = '';
        this.secondUserName = '';
        this.messageList = [];
    }
}