import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultant } from './consultant.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultantserviceService {
  
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8089/coconsult'; 

  // addAndAssignConsultantToProjects(consultant: Consultant, projectIds: number[]) {
  //   return this.http.post<Consultant>(`${this.baseUrl}/addConsultantassign`, { consultant, projectIds });
  // }

 

  addConsultantAndAssignToProject(projectId: number, consultant: Consultant){
    return this.http.post<Consultant>(`${this.baseUrl}/addconsultant/${projectId}`, consultant);
  }

}
