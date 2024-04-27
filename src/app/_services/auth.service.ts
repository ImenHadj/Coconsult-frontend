/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Dans le fichier path/to/api-url-file.ts
//export const API_URL = 'http://localhost:8090/api/auth/';

const AUTH_API = 'http://localhost:8090/api/auth/';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /*login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    ).pipe(
      tap((data: any) => {
        this.storeToken(data.accessToken);
      })
    );
  }*/

  /*login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);

    return this.http.post(
      AUTH_API + 'signup',
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }
  // Cette fonction doit être appelée après l'inscription réussie
 public storeToken(token: string): void {
  sessionStorage.setItem('TOKEN_KEY', token);
  }

 

  getToken(): string | null {
    return sessionStorage.getItem('TOKEN_KEY') ;
  }

  removeToken(): void {
    sessionStorage.removeItem('TOKEN_KEY');
    
  }

 



  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
    
  }
  getProfile(): Observable<any> {
    return this.http.get(AUTH_API + 'profile', httpOptions);
  }
  /*getUserImage(userId: number): Observable<any> {
    return this.http.get(API_URL + 'profile');
  }*/
  
//}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

const AUTH_API = 'http://localhost:8090/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/api/users/';
  //private baseUrl1 = 'http://localhost:8090/api/users/'

  qrCodeUri: string = '';

  constructor(private http: HttpClient) {}

  


  register(username: string, email: string, password: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);


    return this.http.post<any>(
      AUTH_API + 'signup',
      formData,
      {
        reportProgress: true,
        observe: 'response' // Permet de recevoir la réponse complète, y compris les en-têtes
      }
    );
  }
  login(username: string, password: string, totpSecret: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password, totpSecret },
      httpOptions
    );
  }
  
  // Cette fonction doit être appelée après une inscription réussie
  public storeToken(token: string): void {
    sessionStorage.setItem('TOKEN_KEY', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('TOKEN_KEY');
  }

  removeToken(): void {
    sessionStorage.removeItem('TOKEN_KEY');
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  getProfile(): Observable<any> {
    return this.http.get(AUTH_API + 'profile', httpOptions);
  }
 
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'forgotPassword', { email });
  }

  resetPassword(email: string, code: string, newPassword: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'resetPassword', { email, code, newPassword });
  }

  
  refreshToken(): Observable<string> {
    return this.http.post<any>(AUTH_API + 'refresh-token', {}).pipe(
      map((response) => {
        const newToken = response.accessToken;
        // Stockez le nouveau token dans le session storage ou dans un endroit approprié
        sessionStorage.setItem('TOKEN_KEY', newToken);
        return newToken;
      }),
      catchError((error) => {
        console.error('Error refreshing token:', error);
        return throwError('Failed to refresh token');
      })
    );
  }
}

