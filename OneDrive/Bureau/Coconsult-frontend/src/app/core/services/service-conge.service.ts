import { StatutC } from './../models/conge.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceCongeService {
  readonly URL = "http://localhost:8090/Conge";

  constructor(private http:HttpClient) { }

  getall(){
    return this.http.get<Conge[]>(this.URL+"/retrieveAll"); 
  }

  removeConge(id: number) {
    return this.http.delete(this.URL + "/deleteConge/" + id);

  }
  addConge(conge: Conge,p:number){
    return this.http.post<number>(`${this.URL}/saveConge/`+p, conge);  
  }

  getConge(id: number){
    return this.http.get<Conge>(this.URL+"/getConge/" + id);
  }

  updateConge(id: number, updatedconge: Conge) {
    return this.http.put<number>(this.URL + "/updateConge/" + id, updatedconge);
  }
  searchUsers(startingLetter: string){
    const url = `${this.URL}/search`;
    const params = { startingLetter };

    return this.http.get<any[]>(url, { params });
  }
  filterByStatus(status: StatutC){
    const url = `${this.URL}/filterByStatus`;
  

    return this.http.get<any[]>(url);
  }

  getCongesByEmployeeId(employeeId: number) {
    const url = `${this.URL}/getConges/${employeeId}`;
    return this.http.get<Conge[]>(url);
  }
  getLeavesByEmployee() {
    return this.http.get<any>(`${this.URL}/dashBoard`);
  }
  
}
