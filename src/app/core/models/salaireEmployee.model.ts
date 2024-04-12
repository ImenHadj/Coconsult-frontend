import { Absence } from "./absence.model";
import { Conge } from "./conge.model";
import { Departement } from "./departement.model";

export interface SalaireEmployee {
    id_employe?: number;
    date_embauche: Date ;
    posteEmployee: PosteEmployee;
    justification: string;
    departement: Departement;
    conges: Conge[];
}
export enum PosteEmployee {
    ASSISTANT_ADMINISTRATIF,
    ASSISTANT_DE_DIRECTION,
    SECRETAIRE,
    COMPTABLE,
    COMMERCIAL,
    CHARGE_DE_MARKETING,
    RESPONSABLE_RESSOURCES_HUMAINES,
    INGENIEUR_INFORMATIQUE,
    DEVELOPPEUR_WEB,
    TECHNICIEN_MAINTENANCE,
    ELECTRICIEN,
    PLOMBIER,
    MECANICIEN,
    OPERATEUR_MACHINE,
    OUVRIER_USINE,
    MANUTENTIONNAIRE,
    CARISTE,
    AGENT_PRODUCTION,
    CHEF_EQUIPE,
    CONSEILLER_CLIENTELE,
    VENDEUR,
    AGENT_ACCUEIL,
    TELECONSEILLER,
    HOTE_CAISSE,
    SERVEUR,
    DIRECTEUR_GENERAL,
    DIRECTEUR_COMMERCIAL,
    DIRECTEUR_FINANCIER,
    DIRECTEUR_RESSOURCES_HUMAINES,
    CHEF_PROJET,
    MANAGER,
    ENSEIGNANT,
    INFIRMIER,
    AVOCAT,
    INGENIEUR,
    ARCHITECTE,
    CHAUFFEUR,
    AGENT_SECURITE,
    AGENT_NETTOYAGE,
    JARDINIER,
    EMPLOYE_MAISON
}