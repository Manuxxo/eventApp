import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/Event';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  getEvent(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, event);
  }

  getLastEvents(): Observable<any>{
    return this.http.get<any[]>(this.apiUrl + "/GetLastEvents");
  }

  addGuest(eventId: string, guest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/guests`, guest);
  }

  reminderMail(eventId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/Reminder`, {});
  }

  registerAttendance(eventId: string, guestId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/attendance/${guestId}`, {});
  }
}
