import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { SericeEmployeeService } from '../core/services/serice-employee.service';
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

  constructor(private http: HttpClient, private userService: UserService) { }

  


  register(username: string, email: string, password: string, image: File, role: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    formData.append('role', role); // Ajouter le rôle à FormData
  

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
  getUserId(): string | null {
    // Récupérer l'ID de l'utilisateur depuis le sessionStorage
    const userId = sessionStorage.getItem('userId');
    
    // Afficher l'ID de l'utilisateur dans la console pour le débogage
    console.log('ID de l\'utilisateur récupéré :', userId);
    
    // Retourner l'identifiant de l'utilisateur s'il est défini, sinon retourner null
    return userId !== null ? userId : null;
  }}