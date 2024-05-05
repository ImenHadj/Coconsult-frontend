import { Project } from "./project.model";
export  interface Consultant {  
    id: number;
    name: string;
    skills: string;
    availability:boolean ;
    hourlyRate: number;
    hoursWorked:number;
    projects: Project[];
  }
 