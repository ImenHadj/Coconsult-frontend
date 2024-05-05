export interface Project {
  project_id: number;
  project_name: string;
  project_description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  type: ProjectType;
  budget: number;
  cost: number;
  expectedRevenue: number;
  priority: Priority;
}

export enum ProjectStatus {
  // Définissez les différents états du projet selon vos besoins
}

export enum ProjectType {
  // Définissez les différents types de projet selon vos besoins
}

export enum Priority {
  // Définissez les priorités du projet selon vos besoins
}
