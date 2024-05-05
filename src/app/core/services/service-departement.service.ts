import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../models/departement.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceDepartementService {

  readonly URL = "http://localhost:8090/departement";
  constructor(private http:HttpClient) { }

  searchUsers(startingLetter: string){
    const url = `${this.URL}/search`;
    const params = { startingLetter };

    return this.http.get<any[]>(url, { params });
  }

  getall(){
    return this.http.get<Departement[]>(this.URL+"/getAllDepartments");
  }
  fetchAnalytics(){
    return this.http.get<number>(this.URL+"/availablePercentage");
  }
  fetchMax(){
    return this.http.get<number>(this.URL+"/max");
  }



  removeDepartement(id: number) {
    return this.http.delete(this.URL + "/deleteDepartment/" + id);

  }

  addDepartement(employee: Departement){
    return this.http.post<number>(`${this.URL}/addDepartment`, employee);
  }
  updateDepartement(id: number, updatedemployee: Departement){
    return this.http.put<Departement>(`${this.URL}/updateDepartment/`+id, updatedemployee);
  }
  affecterEmplADep(id: number, employees:Employee[]){
    return this.http.put<Departement>(`${this.URL}/affecterEmplADep/`+id, employees);
  }

  getDepartement(id: number){
    return this.http.get<Departement>(this.URL+"/getDepartment/" + id);
  }
  retrieveEmployeesByDepartement(id: number){
    return this.http.get<Employee[]>(this.URL+"/retrieveEmployeesByDepartement/" + id);
  }
}
