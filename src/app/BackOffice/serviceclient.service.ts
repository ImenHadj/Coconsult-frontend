import { HttpClient } from '@angular/common/http';
import { ClientsComponent } from './clients/clients.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client.model';
import { Contrat} from './contrat.model';
import { Facture } from './facture.model';
import { Paiment } from './paiment.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceclientService {

  constructor(private http:HttpClient) { }
  URL = "http://localhost:8080/Clients";
  getall(){
    return this.http.get(this.URL+"/getall");
  }
  filtrage(){
    return this.http.get(this.URL+"/filtrage");
  }
  duedate(nombre:number){
    return this.http.get(this.URL+"/duedate/"+nombre);
  }
  removeClient(id: number): Observable<any> {
    return this.http.delete(this.URL + "/" + id);
  }
  addclient(client: Client): Observable<number> {
    return this.http.post<number>(`${this.URL}/addclient`, client);
  }
  updateClient(client: Client , id:number): Observable<number> {
    return this.http.put<number>(`${this.URL}/updateclient/`+ id , client);
  }
  getContractbyclient(id:number):Observable<any> {
    return this.http.get(this.URL + "/getcontartbyidclient/" + id);
}
addContract(contrat: Contrat , id:number): Observable<number> {
  return this.http.post<number>(`${this.URL}/addcontrat/`+ id , contrat);
}

removeContrat(idcont:number): Observable<any> {
  return this.http.delete(this.URL + "/contrat/" + idcont);
}
updateContrat(contrat: Contrat , id:number): Observable<number> {
  return this.http.put<number>(`${this.URL}/updatecontrat/`+ id , contrat);
}

getallfactures(idclient:number,idcontrat:number):Observable<any> {
  return this.http.get(this.URL + "/facture/getall/" +idclient+ "/" +idcontrat);
}
removefacture(id:number): Observable<any> {
  return this.http.delete(this.URL + "/facture/" + id);
}
addfacture(facture: Facture , idclient:number,idcontrat:number): Observable<number> {
  return this.http.post<number>(`${this.URL}/addfacture/`+ idclient +"/"+ idcontrat, facture);
}

addpaiment(paiment : Paiment,idfacture:number):Observable<number>{
  return this.http.post<number>(`${this.URL}/addpaiment/`+ idfacture, paiment);
}
getcallender(nb:number): Observable<any> {
  return this.http.get(this.URL + "/calendrier/" + nb);
}
getfacture(id:number): Observable<any> {
  return this.http.get(this.URL + "/facture/getbyid/" + id);
}
notifdepassage(): Observable<any> {
  return this.http.get(this.URL + "/facture/notif");
}

lognotification(id:number): Observable<any> {
  return this.http.get(this.URL + "/lognotif/" + id);
}


singleremiender(id: number): Observable<string> {
  return this.http.post<string>(`${this.URL}/pickremiender/${id}`, null);
}

paimentpercentage() {
  return this.http.get(this.URL + "/percentage");
}

paimentbymonth() {
  return this.http.get(this.URL + "/paimentbymonth");
}
}
