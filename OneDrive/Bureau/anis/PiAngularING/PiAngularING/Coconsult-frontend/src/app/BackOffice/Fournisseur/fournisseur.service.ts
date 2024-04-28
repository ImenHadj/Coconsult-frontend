import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from './fournisseur.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http:HttpClient) { }

  URL = "http://localhost:8090/fournisseur";

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.URL + "/retrieve-all-fournisseurs");
  }
  removeFournisseur(id: number): Observable<any> {
    return this.http.delete(this.URL + "/removeFournisseur/" + id);

  }
  addFournisseur(fournisseur: Fournisseur): Observable<number> {
    return this.http.post<number>(`${this.URL}/add-fournisseur`, fournisseur);
  }

  updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.URL}/update-fournisseur`, fournisseur);
  }

  retrieveFournisseur(id: number){
    return this.http.get(this.URL+"/retrieve-fournisseur/"+id);
  }

  calculerScoreFournisseur(fournisseurId: number): Observable<any> {
    return this.http.put<any>(`${this.URL}/calculer-score/${fournisseurId}`, null);
  }

  getTopThreeFournisseursWithStocks(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.URL}/top-three-fournisseurs`);
  }

  getNombreStocksFournisseur(fournisseurID: number): Observable<number> {
    return this.http.get<number>(`${this.URL}/${fournisseurID}`);
  }
}
