import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  mostrarFooter: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/login' || this.router.url === '/' || this.router.url === '/registro') {
        this.mostrarFooter = false;
      } else {
        this.mostrarFooter = true;
      }
    });
  }

}
