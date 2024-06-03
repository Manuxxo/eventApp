import { Component } from '@angular/core';
import { EventService } from '../service/event.service';
import { EventCardComponent } from '../event/event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventCardComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  events: any[] = [];
  allEvents: any[] = [];

  constructor(private eventService: EventService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadPopularEvents();
    this.loadAllEvents();
  }

  loadPopularEvents(): void {
    this.eventService.getLastEvents().subscribe(
      data => this.events = data,
      error => console.error('Error fetching popular events', error)
    );
  }

  loadAllEvents(): void {
    this.eventService.getEvents().subscribe(
      data => this.allEvents = data,
      error => console.error('Error fetching all events', error)
    );
  }
}
