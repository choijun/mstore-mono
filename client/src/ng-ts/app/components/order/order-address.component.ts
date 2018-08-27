import { Component, Input } from '@angular/core';
import { Address } from './address';

@Component({
  selector: 'order-address',
  template: `<address>
    <p><strong>Address 1: </strong>{{addr.address1}}</p>
    <p><strong>Address 2: </strong>{{addr.address2}}</p>
    <p><strong>City: </strong>{{addr.city}}</p>
    <p><strong>State: </strong>{{addr.state}}</p>
    <p><strong>Country: </strong>{{addr.country}}</p>
    <p><strong>Zip Code: </strong>{{addr.zipCode}}</p>
    <p><strong>Phone: </strong>{{addr.phone}}</p>
    <p><strong>Email: </strong>{{addr.email}}</p>
  </address>`,
})
export class OrderAddressComponent {
  @Input() addr: Address;
}