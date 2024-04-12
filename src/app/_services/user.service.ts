import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8090/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8090/api/users';
  updateProfile(profileData: any): Observable<any> {
    return this.http.put(API_URL + 'users/profile', profileData);
  }
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
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
 
}
