import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidat } from './Candidat/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class ServicecandidatService {
  
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8090/recrutement';
  
  addCandidat(candidat: Candidat):  Observable<any> {
    return this.http.post<Candidat>(`${this.apiUrl}/addcand`,candidat);
  }


  removeCandidat(idCandidat: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeCand/${idCandidat}`);
  }


  
  getAllCandidats(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.apiUrl}/getAllc`);
  }

  accepterCandidat(idCandidat: number): Observable<any> {
    const nouveauStatut = 'SELECTIONNE';
    const url = `${this.apiUrl}/accp/${idCandidat}?nouveauStatut=${nouveauStatut}`;
    return this.http.put(url, {});
  } 
 
  getCandidatsAcceptes(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.apiUrl}/acceptes`);
  }
  
  


  uploadFiles(candidat: Candidat, idRecrutement: number, file1: File, file2?: File): Observable<any> {
    const formData = new FormData();
    formData.append('file1', file1);
    if (file2) {
      formData.append('file2', file2);
    }
    formData.append('idRecrutement', idRecrutement.toString()); // Inclure l'ID du recrutement dans les données
    formData.append('nom', candidat.nom);
    formData.append('prenom', candidat.prenom);
    formData.append('email', candidat.email);
    formData.append('telephone', candidat.telephone);
    formData.append('adresse', candidat.adresse);
    formData.append('nationalite', candidat.nationalite);
    formData.append('genre', candidat.genre);
    formData.append('niveauDetude', candidat.niveauDetude);
    formData.append('experience', candidat.experience);
    
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }
}
