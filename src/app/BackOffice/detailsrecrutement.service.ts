import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsRecrutementModalComponent } from './details-recrutement-modal/details-recrutement-modal.component';
import { DetailRecrutement } from './details-recrutement-modal/detail-recrutement.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsrecrutementService {
  

  private apiUrl = 'http://localhost:8090/DetailsRect'; 

  constructor(private http: HttpClient) { }
/*
  getRendezVous(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rendezvous`);
  } */
  
  getRendezVous(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rdv`);
  }

  getNomsCandidatsByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rendezvous?date=${date}`);
  } 

proposerDateEntretien(idCandidat: number, dateEntretien: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/add/${idCandidat}`, { dateEntretien: dateEntretien });
}
 

}