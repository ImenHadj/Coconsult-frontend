import { Employee } from "../core/models/employee.model";
import { Project } from "./project.model";

export interface Team {
    team_id?: number;
    team_name: string;
    availability: boolean;
    nbteam: number;
    project: Project;
    employees: Employee[];
  }
  

  
  
  