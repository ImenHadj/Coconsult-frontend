import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from './reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8090/reclamation';

  getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/retrieve-all-reclamations`);
  }

  getReclamation(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.baseUrl}/retrieve-reclamation/${id}`);
  }

  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.baseUrl}/add-reclamation`, reclamation);
  }

  updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.baseUrl}/update-reclamation`, reclamation);
  }

  removeReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/removeReclamation/${id}`);
  }
}
