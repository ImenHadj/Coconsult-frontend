export interface Reclamation {
    reclamationID: number;
    employeID: number;
    reclamationDate: Date;
    categorie: string;
    departement: string;
    description: string;
    priorite: string;
    statusReclamation: ReclamationStatus;
  }
  
  export enum ReclamationStatus {
    OPEN = 'PENDING',
    CLOSED = 'APPROVED',
    PENDING = 'REJECTED'
  }
  