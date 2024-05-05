import { Client } from "./client.model";
import {Contrat } from "./contrat.model";
import { Paiment } from "./paiment.model";

export interface contratNotif {
    idmail: number;
    maildate: Date;
    due_date: Date;
    notified :Boolean;
    clientemail: string; 
    clientname: string; 
    contract?: Contrat;
  }

  