import { Absence } from "./absence.model";
import { Conge } from "./conge.model";

export class Image {
  id?: number;
  name?: string;
  imageUrl?: string;
  imageId?: string;
  abs?:Absence;
  cng?:Conge
}