import { Client } from "./client.model";
import { Facture } from "./facture.model";
import{contratNotif} from "./notif.model"
export interface Contrat {
    idContract?: number;
    contractDate: Date;
    startDate: Date;
    endDate: Date;
    version: number;
    item_description: string;
    payment_terms: number;
    contract_status: string;
    typeContrat: TypeContrat; // Make sure to import the TypeContrat enum
    client: Client;
    factures?: Facture[];
    contratNotifs?: contratNotif[];
  }
  
  export enum TypeContrat {
    // Define your enum values if not already defined
  }
  
