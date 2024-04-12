import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const TOKEN_KEY = 'auth-token';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private apiUrl = 'http://localhost:8090/api/users/';
  storageService: any;


  constructor(private http: HttpClient) { }
  updateProfile(profileData: any) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.put(this.apiUrl, profileData, { headers });
  }
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token:string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);

  }
   
  public getToken(): string {
    return (sessionStorage.getItem(TOKEN_KEY) as string) || '';
  }
  

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
  getAllUsers(): Observable<any[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
  
  
}

  
  

