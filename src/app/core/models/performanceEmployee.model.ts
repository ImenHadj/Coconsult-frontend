import { Employee } from './employee.model';
import { Note } from './note.model';

export interface PerformanceEmployee {
  id_performance?: number;
  moyenne: number;
  commentaire: string;
  emp?: Employee;
  notes?:Note[];
}