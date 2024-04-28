// resource.model.ts

export interface Stock {
    stockID?: number;
    quantity: number;
    location: string;
    replenishmentAlert: boolean;
    entryDate: Date;
    purchaseDate: Date;
    expirationDate: Date;
    quality: string;
    pourcentageDefauts: number;
    categorieStock: ResourcesCategorie;
}


export interface Project {
    // Define the properties of the Project entity if needed
}



export enum ResourcesCategorie {
    ELECTRONICS,FURNITURE,VEHICULES
}
