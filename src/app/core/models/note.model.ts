import { PerformanceEmployee } from './performanceEmployee.model';

export interface Note {
  id_note?: number;
  critere:critereNote;
  note: number;
  perfEmpl?: PerformanceEmployee;
}

export enum critereNote {
  Quality_of_work,
  Punctuality,
  Professionalism,
  Teamwork_ability,
  Creativity,
  Communication_skills,
  Technical_skills,
  Time_management,
  Adaptability,
  Initiative
}