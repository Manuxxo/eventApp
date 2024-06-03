import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private baseUrl = 'http://localhost:5000/Event';

  constructor(private http: HttpClient) { }

  getGuests(eventId: string): Observable<Guest[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${eventId}/guests`);
  }

  createGuest(eventId: string, guest: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${eventId}/guests`, guest);
  }

  updateGuest(eventId: string, guestId: string, guest: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${eventId}/guests/${guestId}`, guest);
  }

  deleteGuest(eventId: string, guestId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${eventId}/guests/${guestId}`);
  }
  
}
