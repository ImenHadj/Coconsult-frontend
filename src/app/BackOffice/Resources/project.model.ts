
import { consultant } from "../consultant.model";


export interface Project {
    projectid?: number;
    projectname: string;
    projectdescription: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    type: ProjectType;
    budget: number;
    cost: number;
    expectedRevenue: number;
    priority: Priority;
    team: Team;
    tasks: Task[];
    consultants: consultant[];
    resources: Resources[];
  }
  
  export enum ProjectStatus {
    NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
  }
  
  export enum ProjectType {
    INTERNAL='INTERNAL',
    EXTERNAL='EXTERNAL'
  }
  
  export enum Priority {
    LOW='LOW',
    MEDIUM='MEDIUM',
    HIGH='HIGH',
    none='none'
  }
  
  export interface Team {
    // Définissez la structure de l'équipe ici
  }
  
  export interface Task {
   
    // Définissez la structure de la tâche ici
  }
  
  export interface Consultant {
    // Définissez la structure du consultant ici
  }
  
  export interface Resources {
    // Définissez la structure des ressources ici
  }
   




