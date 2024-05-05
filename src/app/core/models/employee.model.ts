import { Absence } from "./absence.model";
import { Conge } from "./conge.model";
import { ContratEmployee } from "./contratEmployee.model";
import { Departement } from "./departement.model";
import { PerformanceEmployee } from "./performanceEmployee.model";
import { SalaireEmployee } from "./salaireEmployee.model";
import { User } from "./user.model";

export interface Employee{
    id_employe?: number;
    date_embauche: Date ;
    posteEmployee: PosteEmployee;
    departement: Departement;
    conges: Conge[];
    salaireEmployees: SalaireEmployee[];
    performanceEmployee: PerformanceEmployee;
    contratEmployees: ContratEmployee[];
    absences: Absence[];
    team: Team;
    userId: number;
}

export interface Team{

}

export enum PosteEmployee {
    ADMINISTRATIVE_ASSISTANT,
    EXECUTIVE_ASSISTANT,
    SECRETARY,
    ACCOUNTANT,
    SALES_ASSOCIATE,
    MARKETING_MANAGER,
    HUMAN_RESOURCES_MANAGER,
    IT_ENGINEER,
    WEB_DEVELOPER,
    WAREHOUSE_WORKER,
    FORKLIFT_OPERATOR,
    PRODUCTION_WORKER,
    TEAM_LEADER,
}
