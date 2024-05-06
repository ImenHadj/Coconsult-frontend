import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from './commande.model';
import { Fournisseur } from '../Fournisseur/fournisseur.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http:HttpClient) { }

  URL = "http://localhost:8090/commande";

  getCommandes(){
    return this.http.get(this.URL+"/retrieve-all-commandes");
  }
  removeCommande(id: number): Observable<any> {
    return this.http.delete(this.URL + "/removeCommande/" + id);

  }
  addCommande(resource: Commande): Observable<number> {
    return this.http.post<number>(`${this.URL}/add-commande`, resource);
  }

  updateCommande(resource: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.URL}/update-commande`, resource);
  }

  retrieveCommande(id: number){
    return this.http.get(this.URL+"/retrieve-commande/"+id);
  }

  marquerCommandeCommeArrivee(id: number): Observable<any> {
    return this.http.post(`${this.URL}/arrivee/${id}`, null);
  }
  
  retrieveFournisseurByCategorie(categorie: string): Observable<Fournisseur[]> {
    // Vous pouvez ajouter des en-têtes HTTP si nécessaire
    return this.http.get<Fournisseur[]>(`${this.URL}/retrieve-fournisseurByCateg/${categorie}`);
  }

}
