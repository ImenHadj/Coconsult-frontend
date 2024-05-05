import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { meethistory } from './meethistory.model';

@Injectable({
  providedIn: 'root'
})
export class ProjclientService {

  constructor(private http:HttpClient) { }

  URL = "http://localhost:8090/Clients";

  clientsbyprod(){
    return this.http.get(this.URL+"/clientsbyprod");
  }
  projbyidclient(id:number): Observable<any> {
    return this.http.get(this.URL + "/projclient/" + id);
  }
  addmeethistory(MeetH : meethistory): Observable<number> {
    return this.http.post<number>(`${this.URL}/addhistory`, MeetH);
  }
  getprojectforPO(id:number): Observable<any> {
    return this.http.get(this.URL + "/getprojectforPO/" + id);
  }
}
