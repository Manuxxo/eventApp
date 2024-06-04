import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Event } from '../../../models/event';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [],
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  @Input() event: Event | undefined;

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;

  ngOnInit(): void {
    if (paypal) {
      paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'paypal'
        },
        createOrder: (data: any, actions: {
            order: {
              create: (arg0: {
                purchase_units: {
                  amount: {
                    value: string;
                  };
                }[];
              }) => any;
            };
          }) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01' 
              }
            }]
          });
        },
        onApprove: (data: any, actions: { order: { capture: () => Promise<any>; }; }) => {
          return actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
        onError: (err: any) => {
          console.error('PayPal Buttons Error:', err);
        },
        funding: {
          allowed: [paypal.FUNDING.CARD],
          disallowed: []
        }
      }).render(this.paypalElement?.nativeElement);
    } else {
      console.error('PayPal SDK not loaded.');
    }
  }
}
