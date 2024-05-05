import { Absence } from "./absence.model";
import { Conge } from "./conge.model";
import { Departement } from "./departement.model";
import { Employee } from "./employee.model";

export interface SalaireEmployee {
    id_salaire?: number;
    prime: number ;
    heures_supplementaires: number;
    total_salaire: number;
    departement: Departement;
    date: Date;
    isArchive: boolean;
    employe:Employee
}
