import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Event } from '../../../models/event';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.scss'
})
export class PaypalComponent  implements OnInit {
  @Input() event: Event | undefined;

  @ViewChild('paypal', { static: true}) paypalElement: ElementRef | undefined;

  ngOnInit(): void {
    paypal
    .Buttons()
    .render(this.paypalElement?.nativeElement);
  }
}