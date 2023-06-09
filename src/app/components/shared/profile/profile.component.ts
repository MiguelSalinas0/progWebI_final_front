import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() nombre!: string;
  @Input() apellido!: string;
  @Input() biografia!: string;
  @Input() profile!: string;
  @Input() cantidad_seguidores!: number;
  @Input() cantidad_seguidos!: number;

  user_id!: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      this.user_id = parseInt(usuarioString);
    }
  }

  verPerfil() {
    this.router.navigate(['/profile', this.user_id])
  }

}
