import { TypeRecrutement } from "./allrecrutement/FtypeRecrutement.enum";

export interface RecruitmentFrontend {
    poste: string;
    typeRecrutement: TypeRecrutement; 
    lieu: string;
    postesVacants: string;
   // image: string;
    objectifs: string;
    problematique: string;
    travailDemande: string;
    experience: string;
    niveauDetude: string;
    salaire: number;
    langue: string;
    sex: string;
    description: string;
    dateDebut: Date;
    dateCloture: Date;
    //responsableRecrutement: string;
    statut: string;
    criteresSelection: string;
    motsCles: string;
  }
