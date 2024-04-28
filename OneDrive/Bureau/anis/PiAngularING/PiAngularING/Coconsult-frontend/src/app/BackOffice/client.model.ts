import { Contrat } from "./contrat.model";
import { Facture } from "./facture.model";
import { Paiment } from "./paiment.model";


// client.model.ts
export interface Client {
  idClient?: number;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  companyAddress: string;
  amount: number;
  factures: Facture[];
  paiments?: Paiment[];
  contracts?: Contrat[];
}


