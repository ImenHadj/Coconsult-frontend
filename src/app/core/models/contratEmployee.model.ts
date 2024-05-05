import { Absence } from "./absence.model";
import { Conge } from "./conge.model";
import { Departement } from "./departement.model";
import { Employee } from "./employee.model";
import { PerformanceEmployee } from "./performanceEmployee.model";
import { SalaireEmployee } from "./salaireEmployee.model";

export interface ContratEmployee {
    id_contrat_e?: number;
    rib: string;
    numeroSecuriteSociale: number;
    date_debut: Date ;
    date_fin: Date ;
    typeCE: ContratEmployeeType;
    duree_hebdomadaire: number;
    salaire_base: number;
    montant_heures_supplementaires: number;
    montant_Conge_Absence: number;
    isArchive: Boolean;
    empl: Employee;
  
    
}
export enum ContratEmployeeType {
    CDI_CLASSIQUE,
    CIVP,
    CDI_INTERIM,
    CDI_CHANTIER,
    CDD_USAGE,
    CDD_SAISONNIER,
    CDD_INSERTION,
    CDD_PROJET,
    CONTRAT_APPRENTISSAGE,
    CONTRAT_PROFESSIONNALISATION,
    CUI
}