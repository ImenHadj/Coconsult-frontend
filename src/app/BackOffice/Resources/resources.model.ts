// resource.model.ts

export interface Resources {
    resourceID?: number;
    name: string;
    description: string;
    price: number;
    reStatus: ResourceStatus;
    categorie: ResourcesCategorie;
    stock?: Stock;
    projects?: Project[];
    selected?: boolean;
}

export enum ResourceStatus {
    ACTIVE,MAINTENANCE,INACTIVE
}

export enum ResourcesCategorie {
    ELECTRONICS,FURNITURE,VEHICULES
}

export interface Stock {
    // Define the properties of the Stock entity if needed
}

export interface Project {
    // Define the properties of the Project entity if needed
}
