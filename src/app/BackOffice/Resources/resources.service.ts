import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Resources } from './resources.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) { }

  URL = "http://localhost:8090/resource";

  getResources(): Observable<Resources[]> {
    return this.http.get<Resources[]>(this.URL + "/retrieve-all-resources").pipe(
      catchError(this.handleError)
    );
  }

  getResourceImage(id: number): Observable<any> {
    return this.http.get(`${this.URL}/resources/${id}/image`, { responseType: 'blob' });
  }

  getAllProjects() {
    return this.http.get(this.URL + "/retrieve-all-projects");
  }

  removeResource(id: number): Observable<any> {
    return this.http.delete(this.URL + "/removeResource/" + id);
  }

  addResource(formData: FormData): Observable<any> {
    return this.http.post(`${this.URL}/add-resource`, formData);
  }

  updateResource(resource: Resources): Observable<Resources> {
    return this.http.put<Resources>(`${this.URL}/update-resource`, resource);
  }

  retrieveResource(id: number) {
    return this.http.get(this.URL + "/retrieve-resource/" + id);
  }

  affectResources(formData: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/projects/${formData.projectId}`, formData.resourceQuantities).pipe(
      catchError(this.handleError)
    );
  }

  getResourceStockList(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + "/stock").pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
