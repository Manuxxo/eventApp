import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Event } from '../../models/event';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event!: Event;

  constructor(private router: Router){}

  goToEventDetail(id: string){
    this.router.navigate(["/event/detail", id]);
  }
}
