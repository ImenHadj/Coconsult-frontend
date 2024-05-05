import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../core/models/employee.model';
import { Team } from './team.model';
@Injectable({
  providedIn: 'root'
})
export class TeamserviceService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8090/coconsult';

  addTeam(team: Team) {
    return this.http.post<number>(`${this.baseUrl}/addTeam`, team);
  }

  addTeamAndAssignToProject(team: Team, projectId: number) {
    return this.http.post<Team>(`${this.baseUrl}/addteamaff/${projectId}`, team);
  }
 
  getAllTeams(){
    return this.http.get<any[]>(this.baseUrl + "/getAllTeams");
  }
  
  assignEmployeesToTeam(employees: Employee[], teamId: number) {
    return this.http.put<void>(`${this.baseUrl}/assign-employees/${teamId}`, employees);
  }

  updateTeam(teamId: number, team: Team) {
    return this.http.put<Team>(`${this.baseUrl}/updateteam/${teamId}`, team);
  }

  removeTeam(teamId: number) {
    return this.http.delete<void>(`${this.baseUrl}/removeteam/${teamId}`);
  }
  getTeamById(teamId: number) {
    return this.http.get<Team>(`${this.baseUrl}/team/${teamId}`);
   }
}