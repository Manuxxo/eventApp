import { Component } from '@angular/core';
import { EventService } from '../../service/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, LoaderComponent, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  events: any[] = [];
  loading = true;

  constructor(private eventService: EventService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadEvents();
  }

  async loadEvents(){
    await this.eventService.getEvents().subscribe(
      (data: any[]) => {
        this.events = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching events', error);
      }
    );
  }

  toggleDescription(event: any) {
    event.showFullDescription = !event.showFullDescription;
  }

  onDelete(eventId: string) {
    this.loading = true;
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        () => this.loadEvents(),
        error => console.error('Error deleting event', error)
      );
    }
    this.loading = false;
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onEdit(eventId: string) {
    this.loading = true;
    this.router.navigate(['/event', eventId]);
  }

  newEvent(){
    this.loading = true;
    this.router.navigate(['/event/new', {}]);
  }

  async onSendReminder(eventId: string) {
    if (confirm('¿Estás seguro de que deseas enviar un recordatorio a todos los invitados?')) {
      this.loading = true;
     await this.eventService.reminderMail(eventId);
     this.loading = false;
    }
  }

  onGuestManagement(eventId: string) {
    this.loading = true;
    this.router.navigate(['/guest', eventId]);
  }
}
