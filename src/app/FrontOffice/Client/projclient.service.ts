import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjclientService {

  constructor(private http:HttpClient) { }
  URL = "http://localhost:8080/";

  getProjectByIdClient(id:number):Observable<any> {
    return this.http.get(this.URL + "projectforclient/" + id);
}
}
