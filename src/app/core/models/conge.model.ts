import { Employee } from "./employee.model";
import { Image } from "./image";

export interface Conge {
    id_conge?: number;
    date_debut: Date;
    date_fin: Date;
    typeC: typeC;
    statutC: StatutC;
    commentaire: String;
    image?: Image;
    employee?: Employee;
}

export enum typeC {
    PAID,
    SICKNESS,
    MATERNITY,
    PATERNITY,
    FAMILY,
    SABBATICAL
}
export enum StatutC {
    PENDING,
    REJECTED,
    VALIDATED,
}