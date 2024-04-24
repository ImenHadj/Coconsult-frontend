import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  getProfitabilityByYear() {
    throw new Error('Method not implemented.');
  }
 
 
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8090/coconsult'; 


  // Méthode pour ajouter un projet
  addProject(project: Project) {
    return this.http.post<number>(`${this.baseUrl}/addProject`, project);
  }
  
 
 
 getAllProjects(): Observable<any[]> {
  return this.http.get<any[]>(this.baseUrl + "/getAll");
}

  removeProject(projectId: number): Observable<any> {
  
    return this.http.delete(this.baseUrl + "/removeProject/" +projectId );
  }
  
  getProjectById(projectId: number) {
   return this.http.get<Project>(`${this.baseUrl}/project/${projectId}`);
  }
  updateProject(projectId: number,project: Project) {
    return this.http.put<Project>(`${this.baseUrl}/updateproject/`+projectId, project);
  }
  
  calculateStatisticsByType() {
    return this.http.get<any>(`${this.baseUrl}/statisticsByType`);
  }

  calculateProfitabilityForEachProject() {
    return this.http.get<Object[]>(`${this.baseUrl}/calculateProfitability`);
  }

  getBestProjectOfTheYear() {
    return this.http.get<Project>(`${this.baseUrl}/best-project`);
  }

  calculCostProject(projectId: number) {
    return this.http.put<number>(`${this.baseUrl}/calculate-cost/${projectId}`, {});
  }
  calculateProfitabilityByYear() {
    return this.http.get<any[]>(`${this.baseUrl}/profitability-by-year`);
  }
  
  
}
