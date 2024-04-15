import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recrutement } from '../BackOffice/recrutement.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicefrontrecrutementService {

 
  private apiUrl = 'http://localhost:8090/recrutement';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recrutement[]> {
    return this.http.get<Recrutement[]>(`${this.apiUrl}/getAll`)

  }



  
}