import { Client } from "./client.model";
import { Facture } from "./facture.model";

export interface Paiment {
    idpaiment?: number;
    payment_date: Date;
    amount: number;
    typepaiment: Typepaiment;
    client?: Client; // Assuming you have a Client interface
    facture: Facture; // Assuming you have a Facture interface
  }
  
  export enum Typepaiment {

    // Add other payment types as needed
  }
  
