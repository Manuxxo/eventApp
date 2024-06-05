import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../service/event.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, LoaderComponent, MatIcon],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit, OnDestroy  {
  event: any;
  timeRemaining: string = "";
  loading: boolean = true;
  eventUrl: string = "";
  private subscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(eventId!).subscribe(
      data => {
        this.event = data;
        this.startCountdown();
        this.loading = false;
      },
      error => console.error('Error fetching event details', error)
    );
    this.eventUrl = this.router.url;
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

      if (distance < 0) {
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
  
  onBuyTicket(): void {
    this.loading = true;
    this.router.navigate(['/ticket-purchase', this.event.id]);    
  }

  goBack(){
    this.loading = true;
    this.router.navigate(['/home']); 
  }
}
