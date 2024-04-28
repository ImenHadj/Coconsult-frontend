
export  interface consultant {  
    id: number;
    name: string;
    skills: string;
    availability:boolean ;
    hourlyRate: number;
    hoursWorked:number;

    projects: Project[];
  }
  export interface Project {
    
  }