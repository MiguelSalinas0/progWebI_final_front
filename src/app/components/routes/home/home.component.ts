import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { OUsers, User, Users } from 'src/app/interfaces/user';
import { PostserviceService } from 'src/app/services/postservice.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostserviceService]
})
export class HomeComponent implements OnInit {

  post!: Post;
  user!: User;
  user_id!: string | null;
  contenidoControl: FormControl = new FormControl();

  usuarios!: OUsers[];

  constructor(private _postService: PostserviceService, private _userService: UserService) { }

  ngOnInit(): void {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      this.user_id = usuarioString;
    }
    this.getAllPost()
    this.getOneUser()
    this.getAllOtherU()
  }

  getAllOtherU() {
    if (this.user_id !== null) {
      this._userService.getAllOtherUser(this.user_id).subscribe({
        next: (data: Users) => {
          if (data.success) {
            this.usuarios = data.data
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  getAllPost() {
    this._postService.getAllPost().subscribe({
      next: (data: Post) => {
        this.post = data
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    })
  }

  getOneUser() {
    if (this.user_id !== null) {
      this._userService.getOneUser(this.user_id).subscribe({
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
  }

  onContenidoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.contenidoControl.setValue(target.value);
  }

  guardarPost() {
    this._postService.addPost(this.user_id, this.contenidoControl.value).subscribe({
      next: (data) => {
        console.log(data)
        window.location.reload()
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
