import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Resources } from './resources.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http:HttpClient) { }

  URL = "http://localhost:8090/resource";

  getResources(){
    return this.http.get(this.URL+"/retrieve-all-resources");
  }

  getAllProjects(){
    return this.http.get(this.URL+"/retrieve-all-projects");
  }
  removeResource(id: number): Observable<any> {
    return this.http.delete(this.URL + "/removeResource/" + id);

  }
  addResource(resource: Resources): Observable<number> {
    return this.http.post<number>(`${this.URL}/add-resource`, resource);
  }

  updateResource(resource: Resources): Observable<Resources> {
    return this.http.put<Resources>(`${this.URL}/update-resource`, resource);
  }

  retrieveResource(id: number){
    return this.http.get(this.URL+"/retrieve-resource/"+id);
  }

  affectResources(formData: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/projects/${formData.projectId}`, formData.resourceQuantities).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Erreur du côté client
      console.error('An error occurred:', error.error.message);
    } else {
      // Erreur du côté serveur
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Retourne une observable avec un message d'erreur
    return throwError('Something bad happened; please try again later.');
  }
}
