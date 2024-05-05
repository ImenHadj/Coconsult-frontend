import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class SericeEmployeeService {
  
  readonly URL = "http://localhost:8090/employee";
  constructor(private http:HttpClient) { }

  getall(){
    return this.http.get<Employee[]>(this.URL+"/retrieveAll");
  }
  searchUsers(startingLetter: string){
    const url = `${this.URL}/search`;
    const params = { startingLetter };

    return this.http.get<any[]>(url, { params });
  }
  
  removeEmployee(id: number): Observable<any> {
    return this.http.delete(this.URL + "/DeleteEmployee/" + id);

  }

  addEmployee(employee: Employee,id:any){
    return this.http.post<number>(`${this.URL}/addEmployee/`+id, employee);
  }
  
  updateEmployee(p: number, updatedemployee: Employee,pp:number,T:number){
    return this.http.put<number>(`${this.URL}/updateEmployee/${p}/${pp}/${T}`, updatedemployee);
  }

  getEmployee(id: number){
    return this.http.get<Employee>(this.URL+"/getEmployee/" + id);
  }

  getUser(id: number){
    return this.http.get<User>(this.URL+"/getUser/" + id);
  }

  moyennedeperf(){
    return this.http.get<number>(this.URL+"/moyennedeperf");
  }
  calculateNbreEmpl(){
    return this.http.get<number>(this.URL+"/calculateNbreEmpl");
  }

  assignTeamToEmployee(employeeId: number, teamId: number): Observable<void> {
    const url = `${this.URL}/${employeeId}/assign-team/${teamId}`;
    return this.http.put<void>(url, null); 
  }
}
