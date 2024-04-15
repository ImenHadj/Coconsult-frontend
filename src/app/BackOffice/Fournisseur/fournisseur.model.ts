export interface Fournisseur {
    fournisseurID?: number;
    nom: string;
    address: string;
    contact: string;
    typeFournisseur: TypeFournisseur;
    score: number;
    stocks?: Stock[];
    nbStocks?: number;
}

export enum TypeFournisseur {
    ELECTRONICS,FURNITURE,VEHICULES
}

export interface Stock {
    
}