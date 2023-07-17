import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  mostrarHeader: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/login' || this.router.url === '/' || this.router.url === '/registro') {
        this.mostrarHeader = false;
      } else {
        this.mostrarHeader = true;
      }
    });
  }

}
