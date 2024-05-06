export class Message {
    Id!: number;

    senderEmail!: string;
    time!: string;
    replymessage!: string;
    chat: any;
    selected: boolean = false; // Ajout de la propriété selected pour suivre l'état de sélection du message

    constructor() {

    }
}