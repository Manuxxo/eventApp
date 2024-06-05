import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../service/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, MatIcon],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent  implements OnInit {
  event: any = {
    id: '',
    name: '',
    date: '',
    location: '',
    guest: null
  };
  isEditMode = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.eventService.getEvent(id).subscribe(
        data => this.event = data,
        error => console.error('Error fetching event', error)
      );
    }
    this.loading = false;
  }

  onSubmit(): void {
    this.loading = true;
    if (this.isEditMode) {
      this.eventService.updateEvent(this.event.id, this.event).subscribe(
        () => this.router.navigate(['/event/event-list']),
        error => console.error('Error updating event', error)
      );
    } else {
      this.eventService.createEvent(this.event).subscribe(
        () => this.router.navigate(['/event/event-list']),
        error => console.error('Error creating event', error)
      );
    }
  }

  goBack(){
    this.loading = true;
    this.router.navigate(['/home']); 
  }
}