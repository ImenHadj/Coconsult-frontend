import { Consultant } from "./consultant.model";
import { Team } from "./team.model";
import { Task } from "./task.model";
import { Resources } from "./Resources/resources.model";


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
    consultants: Consultant[];
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
  
 
  
  