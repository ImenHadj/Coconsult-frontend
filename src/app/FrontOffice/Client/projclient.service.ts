import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjclientService {

  constructor(private http:HttpClient) { }
  URL = "http://localhost:8090/Clients";

  clientsbyprod(){
    return this.http.get(this.URL+"/clientsbyprod");
  }
}
