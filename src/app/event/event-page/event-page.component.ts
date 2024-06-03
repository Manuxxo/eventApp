import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { EventService } from '../../service/event.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, DatePipe, LoaderComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent implements OnInit, OnDestroy {
  event: any;
  timeRemaining: string = "";
  guestId: string = "";
  eventStarted: boolean = false;
  loading = true;
  private subscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    this.guestId = this.route.snapshot.paramMap.get('guestId')!;
    this.eventService.getEvent(eventId!).subscribe(
      data => {
        this.event = data;
        this.startCountdown();
        this.loading = false;
      },
      error => console.error('Error fetching event details', error)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private startCountdown(): void {
    const eventDate = new Date(this.event.date).getTime();
    this.subscription = interval(1000).subscribe(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        this.eventStarted = true;
        this.timeRemaining = 'El evento ha comenzado';
        this.subscription.unsubscribe();
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.timeRemaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    });
  }

  registerAttendance(): void {
    this.loading = true;
    this.eventService.registerAttendance(this.event.id, this.guestId).subscribe(
      () => {
        this.loading = false;
        alert('Asistencia registrada')
      },
      error => console.error('Error registering attendance', error)
    );
  }
}