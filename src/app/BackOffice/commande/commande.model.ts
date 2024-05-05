export interface Commande {
    commandeID?: number;
    quantity: number;
    location: string;
    fournissID?: number;
    replenishmentAlert: boolean;
    entryDate: Date;
    purchaseDate: Date;
    expirationDate: Date;
    quality: string;
    pourcentageDefauts: number;
    categorieStock: ResourcesCategorie;
    statusCommande : StatusCommande ;
}


export interface Project {
    // Define the properties of the Project entity if needed
}



export enum ResourcesCategorie {
    ELECTRONICS,FURNITURE,VEHICULES
}


export enum StatusCommande {
    ARRIVED,PENDING,CANCELED
}
