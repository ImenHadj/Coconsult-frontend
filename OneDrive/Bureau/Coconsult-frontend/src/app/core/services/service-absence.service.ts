import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Absence } from '../models/absence.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceAbsenceService {
  readonly URL = "http://localhost:8090/absence";

  constructor(private http:HttpClient) { }

  getAbsencesForToday(){
    return this.http.get<Absence[]>(`${this.URL}/getAbsencesToday`);
  }

  searchUsers(startingLetter: string){
    const url = `${this.URL}/search`;
    const params = { startingLetter };

    return this.http.get<any[]>(url, { params });
  }


  getall(){
    return this.http.get<Absence[]>(this.URL+"/retrieveAll"); 
  }

  removeAbsence(id: number) {
    return this.http.delete(this.URL + "/deleteAbsence/" + id);

  }
  addAbsence(absence: Absence,p:number) {
    return this.http.post<number>(`${this.URL}/addAbsence/`+p, absence);
  }

  getAbsence(id: number){
    return this.http.get<Absence>(this.URL+"/getAbsence/" + id);
  }

  getAbsencesByEmployeeId(employeeId: number) {
    const url = `${this.URL}/getAbsences/${employeeId}`;
    return this.http.get<Absence[]>(url);
  }
  
  updateAbsence(id: number, updatedAbsence: Absence) {
    return this.http.put<Absence>(this.URL + "/updateAbsence/" + id, updatedAbsence);
  }
}
