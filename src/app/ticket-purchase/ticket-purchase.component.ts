import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../service/guest.service';
import { Guest } from '../models/guest';
import { PaypalComponent } from '../shared/components/paypal/paypal.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ticket-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule, PaypalComponent, LoaderComponent, MatIcon],
  templateUrl: './ticket-purchase.component.html',
  styleUrl: './ticket-purchase.component.scss'
})
export class TicketPurchaseComponent implements OnInit {
  event: any;
  loading = true;
  formSubmitted = false;
  purchase: Guest = {
    id: "",
    name: "",
    email: "",
    status: ""
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
    this.loading = false;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.loading = true;
    const guest = {
      id: "string",
      name: this.purchase.name,
      email: this.purchase.email,
      status: 'confirmed'
    };

    this.eventService.addGuest(this.event.id, guest).subscribe(
      () => {
        this.router.navigate(['/complete']);
      },
      error => console.error('Error adding guest', error)
    );
  }

  goBack(){
    this.loading = true;
    this.router.navigate(['/home']); 
  }
}