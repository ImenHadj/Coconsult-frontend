import { Employee } from './employee.model';

export interface Departement {
  id_departement?: number;
  libelle: string;
  maxSaturation: number;
  nbreEmpl : number;
  employees?: Employee[];
}