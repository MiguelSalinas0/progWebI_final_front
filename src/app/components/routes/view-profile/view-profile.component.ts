import { Component, OnInit } from '@angular/core';
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

  id: string | null;
  user!: User;
  seguidores: Seguido[] = [];
  seguidos: Seguido[] = [];
  allPost: Post[] = [];
  autor!: Autor;

  constructor(private _route: ActivatedRoute, private _userService: UserService) {
    this.id = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getOneUser(this.id)
    this.getSeguidoresAndSeguidos(this.id)
    this.getAllPostUser(this.id)
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

}
