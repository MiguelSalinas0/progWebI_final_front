import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Follow, Seguido } from 'src/app/interfaces/follow';
import { Autor, Post } from 'src/app/interfaces/postuser';
import { PostUser } from 'src/app/interfaces/postuser';
import { UpdateUser } from 'src/app/interfaces/updateuser';
import { User } from 'src/app/interfaces/user';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  durationInSeconds = 5;

  id: string | null;
  user_id!: string;

  user!: User;

  seguidores: Seguido[] = [];
  seguidos: Seguido[] = [];
  allPost: Post[] = [];
  autor!: Autor;

  edit: boolean = false;

  bandera: boolean = false;
  result!: boolean;

  nombre!: string;
  apellido!: string;

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _followService: FollowService, private _snackBar: MatSnackBar, private router: Router) {
    this.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      this.user_id = usuarioString;
    }
    if (this.id == this.user_id) {
      this.bandera = true
    }
    this.getOneUser(this.id)
    this.getSeguidoresAndSeguidos(this.id)
    this.getAllPostUser(this.id)
    this.evalFoll()
  }

  follow(id: string, user_id: string) {
    this._followService.addFollow(user_id, id).subscribe({
      next: (data) => {
        this.result = data.result
        this.evalFoll()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removefollow(id: string, user_id: string) {
    this._followService.removeFollow(user_id, id).subscribe({
      next: (data) => {
        this.result = data.result
        this.evalFoll()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  evalFoll() {
    this._followService.evalFollow(this.user_id, this.id!).subscribe({
      next: (data) => {
        this.result = data.result
      },
      error: (err) => {
        console.log(err);
      }
    })
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
        this.nombre = data.nombre
        this.apellido = data.apellido
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
          console.log(data.posts)
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
      next: (data: UpdateUser) => {
        if (data.success == true) {
          this.openSnackBar('Datos actualizados correctamente', 'Aceptar');
          this.edit = false
          this.getOneUser(this.id)
        }
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

  onFileSelected(event: any) {
    const img_name = this.nombre + this.apellido + this.id
    const file: File = event.target.files[0];
    this._userService.uploadImage(file, img_name.toLowerCase(), this.id!).subscribe({
      next: (data: UpdateUser) => {
        if (data.success == true) {
          this.openSnackBar('Se actualizó la foto de perfil correctamente', 'Aceptar');
        }
      },
      error: (err) => {
        console.log(err);
        this.openSnackBar('Error: ' + err.message, 'Aceptar');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

}
