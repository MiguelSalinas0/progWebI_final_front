import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Autor, Comentario } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { LikeService } from 'src/app/services/like.service';
import { PostserviceService } from 'src/app/services/postservice.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() contenido!: string;
  @Input() post_id!: number;
  @Input() autor!: Autor;
  @Input() fecha_publicacion!: Date;
  @Input() cantidad_likes!: number;
  @Input() comentarios!: Comentario[];
  @Input() bandera!: boolean;
  @Input() likedBy!: number[];

  edit: boolean = false;
  like: boolean = false;

  contenidoControl: FormControl = new FormControl();

  user!: User;

  cant_comentarios: number = 0;

  constructor(private _likeService: LikeService, private _postService: PostserviceService, private _userService: UserService) { }

  ngOnInit(): void {
    this.getUser()
    this.like = this.userLikedPost()
    this.cant_comentarios = this.comentarios.length;
  }

  evalLike(): void {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      const parsedUserId = parseInt(usuarioString);
      if (!isNaN(parsedUserId)) {
        const user_id = parsedUserId;
        const post_id = this.post_id;
        this._likeService.evalLike(user_id.toString(), post_id.toString()).subscribe({
          next: (data) => {
            if (data.message == 'Like agregado') {
              this.like = true
              this.cantidad_likes += 1
            }
            if (data.message == 'Like removido') {
              this.like = false
              this.cantidad_likes -= 1
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  }

  getUser() {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      this._userService.getOneUser(usuarioString).subscribe({
        next: (data: User) => {
          this.user = data
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onContenidoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.contenidoControl.setValue(target.value);
  }

  comentar() {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      this._postService.addComment(usuarioString, this.post_id.toString(), this.contenidoControl.value).subscribe({
        next: (data) => {
          console.log(data)
          this.getCommentsAc()
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  editarPost(post_id: number) {
    this._postService.updatePost(post_id.toString(), this.contenido).subscribe({
      next: (data) => {
        console.log(data)
        window.location.reload()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  eliminar(post_id: number) {
    this._postService.deletePost(post_id.toString()).subscribe({
      next: (data) => {
        console.log(data)
        window.location.reload()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  userLikedPost(): boolean {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      const usuarioId: number = parseInt(usuarioString, 10);
      if (!isNaN(usuarioId)) {
        return this.likedBy.includes(usuarioId);
      }
    }
    return false;
  }

  getCommentsAc() {
    this._postService.getComments(this.post_id.toString()).subscribe({
      next: (data: any) => {
        if (data.success == true) {
          this.comentarios = data.data
          this.cant_comentarios = this.comentarios.length
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
