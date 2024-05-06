import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

const API_URL = 'http://localhost:8090/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getCurrentUser(): any {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8090/api/users';
  private apiUrl = 'http://localhost:8090/api/users';
  private backendUrl = 'http://localhost:8090'; // URL de base du backend


  updateProfile(profileData: any): Observable<any> {
    return this.http.put(API_URL + 'users/profile', profileData);
  }
  constructor(private http: HttpClient) {}

  /*getAllUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }*/

  getAdvancedUserStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/advanced-stats`);
  }
  getAllUsers(): Observable<any[]> {
    const accessToken = 'votre_token_jwt';
  
    // Définissez les options pour les en-têtes HTTP avec le token JWT
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken // Incluez le token JWT avec le préfixe 'Bearer'
      })
    };
  
    // Effectuez la requête HTTP avec les en-têtes contenant le token JWT
    return this.http.get<any[]>('http://localhost:8090/api/users', httpOptions);
  }
  
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getProfile(): Observable<any> {
    return this.http.get(API_URL + 'profile');
  }
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  unlockAccount(userId: string) {
    return this.http.put(`${this.baseUrl}/${userId}/unlock`, {});
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user`);
  }
  getAverageNotesByCriteria(): Observable<any> {
    return this.http.get<any[]>(`${this.backendUrl}/perfomanceEmpl/average-by-criteria`);
  }
  

  adduser(user: User): Observable<Object> {
    return this.http.post(this.backendUrl + "/user/add", user);
  }

  getUserByUsername(username: any) {
    return this.http.get<User>(this.backendUrl + "api/users/getbyusername/" + username)
  }
  getAll() {
    return this.http.get<User[]>(this.backendUrl + "api/users")
  }
  activateAccount(userId: number): Observable<any> {
    return this.http.put(`${this.backendUrl}/api/auth/activate/${userId}`, {});
  }
}
