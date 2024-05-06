import { Client } from "./client.model";
import {Contrat } from "./contrat.model";
import { Paiment } from "./paiment.model";

export interface Facture {
    idFacture: number;
    designation: string;
    currency: string;
    invoice_number: number;
    facture_date: Date;
    due_date: Date;
    total_amount: number;
    paid_amount: number;
    payment_status: string; // "Outstanding", "Partially paid", "Paid"
    notes: string;
    milestone_description: string;
    client: Client;
    contract?: Contrat;
    paiments: Paiment[];
  }

  