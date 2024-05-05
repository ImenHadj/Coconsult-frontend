import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultant } from './consultant.model';


@Injectable({
  providedIn: 'root'
})
export class ConsultantserviceService {
  
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8090/coconsult'; 

  // addAndAssignConsultantToProjects(consultant: Consultant, projectIds: number[]) {
  //   return this.http.post<Consultant>(`${this.baseUrl}/addConsultantassign?projectIds=${projectIds.join(',')}`, consultant);
  // }

  // addAndAssignConsultantToProjects(consultant: Consultant, projectIds: number[]) {
  //   // Utilisez un objet pour envoyer dans le corps de la requête POST
  //   const requestBody = {
  //     consultant: consultant,
  //     projectIds: projectIds
  //   };
  
  //   // Utilisez cet objet comme corps de la requête POST
  //   return this.http.post<Consultant>(`${this.baseUrl}/addConsultantassign`, requestBody);
  // }
  
  addConsultantAndAssignToProject(projectId: number, consultant: Consultant){
    return this.http.post<Consultant>(`${this.baseUrl}/addconsultant/${projectId}`, consultant);
  }

}
