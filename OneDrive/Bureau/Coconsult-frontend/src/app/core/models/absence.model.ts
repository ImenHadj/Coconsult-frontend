
import { Employee } from './employee.model';
import { Image } from './image';


export interface Absence {
  id_absence?: number;
  motif: string;
  date: Date;
  validee: boolean;
  emp?: Employee;
  image?:Image
}