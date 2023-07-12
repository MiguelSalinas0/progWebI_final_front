import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Follow, Seguido } from 'src/app/interfaces/follow';
import { Autor, Post } from 'src/app/interfaces/postuser';
import { PostUser } from 'src/app/interfaces/postuser';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  durationInSeconds = 5;

  id: string | null;
  user!: User;
  seguidores: Seguido[] = [];
  seguidos: Seguido[] = [];
  allPost: Post[] = [];
  autor!: Autor;

  edit: boolean = false;

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _snackBar: MatSnackBar) {
    this.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getOneUser(this.id)
    this.getSeguidoresAndSeguidos(this.id)
    this.getAllPostUser(this.id)
  }

  habilitarEdit() {
    this.edit = !this.edit
  }

  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.duration = this.durationInSeconds * 1000;
    this._snackBar.open(message, action, config);
  }

  getOneUser(id: string | null) {
    this._userService.getOneUser(id!).subscribe({
      next: (data: User) => {
        this.user = data
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

  getSeguidoresAndSeguidos(id: string | null) {
    this._userService.getSeguidoresYSeguidos(id!).subscribe({
      next: (data: Follow) => {
        this.seguidores = data.seguidores
        this.seguidos = data.seguidos
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

  getAllPostUser(id: string | null) {
    this._userService.getPostUser(id!).subscribe({
      next: (data: PostUser) => {
        if (data.success == true) {
          this.allPost = data.posts
          this.autor = data.autor
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

  actualizarInfo() {
    this._userService.update(this.user.nombre, this.user.apellido, this.user.correo_electronico, this.user.biografia, this.user.user_id).subscribe({
      next: (data) => {
        this.openSnackBar('Datos actualizados correctamente', 'Aceptar');
        console.log(data)
        this.edit = false
      },
      error: (err) => {
        console.log(err);
        this.openSnackBar('Error: ' + err.message, 'Aceptar');
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

}
