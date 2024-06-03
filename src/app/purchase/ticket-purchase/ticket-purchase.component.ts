import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../service/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../../service/guest.service';
import { Guest } from '../../models/guest';

@Component({
  selector: 'app-ticket-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-purchase.component.html',
  styleUrl: './ticket-purchase.component.scss'
})
export class TicketPurchaseComponent implements OnInit {
  event: any;
  purchase: Guest = {
    id: "string",
    name: "string",
    email: "xasokem897@fresec.com",
    status: "string"
  }

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) { }

  async ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    await this.eventService.getEvent(eventId!).subscribe(
      data => this.event = data,
      error => console.error('Error fetching event details', error)
    );
  }

  onSubmit(): void {
    const guest = {
      id: "string",
      name: this.purchase.name,
      email: this.purchase.email,
      status: 'confirmed'
    };

    this.eventService.addGuest(this.event.id, guest).subscribe(
      () => {
        console.log('Guest added and confirmation email sent');
        this.router.navigate(['/confirmation']);
      },
      error => console.error('Error adding guest', error)
    );
  }
}