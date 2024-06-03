import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/auth';
  private tokenKey = '869c1e83-543b-4f91-adb1-2c7676ae9ad6';
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      }));
  }

  recoverPassword(email: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/recover-password`, { email });
  }

  register(user: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const isAuthenticated = token != null && token !== undefined;
    return isAuthenticated;
  }
}
