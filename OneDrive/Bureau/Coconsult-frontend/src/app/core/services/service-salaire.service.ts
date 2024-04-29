import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaireEmployee } from '../models/salaireEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceSalaireService {

  readonly URL = "http://localhost:8090/SalaireEmpl";

  constructor(private http:HttpClient) { }
  addSalaire(p:number,employee: SalaireEmployee){
    return this.http.post<number>(`${this.URL}/addpSalaireEmpl/${p}`, employee);
  }

  getall(){
    return this.http.get<SalaireEmployee[]>(this.URL+"/retrieveAll");
  }

  removeNote(id: number) {
    return this.http.delete(this.URL + "/deleteNote/" + id);

  }

  updateNote(id: number, updatedemployee: SalaireEmployee){
    return this.http.put<SalaireEmployee>(`${this.URL}/updateNote/`+id, updatedemployee);
  }


  getNote(id: number){
    return this.http.get<SalaireEmployee>(this.URL+"/getNote/" + id);
  }

  fetchMax(){
    return this.http.get<number>(this.URL+"/max");
  }
  getSalaryStatistics(year: number, month: number) {
    return this.http.get(`${this.URL}/generateSalaryStatistics/${year}/${month}`);
  }

  getTotalSalariesEvolution(){
    return this.http.get(`${this.URL}/getTotalSalariesEvolution`);
  }
}
