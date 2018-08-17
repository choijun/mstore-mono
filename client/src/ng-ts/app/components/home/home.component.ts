import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <div class="home text-center">
      <a [routerLink]="['/products']">
        <img src="/assets/hp-mq-phones-multiple.jpg" class="img-fluid" />
      </a>
    </div>
  `,
})
export class HomeComponent { }