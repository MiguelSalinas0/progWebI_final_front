import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Autor, Comentario } from 'src/app/interfaces/post';
import { LikeService } from 'src/app/services/like.service';
import { PostserviceService } from 'src/app/services/postservice.service';

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

  edit: boolean = false;

  contenidoControl: FormControl = new FormControl();

  constructor(private _likeService: LikeService, private _postService: PostserviceService) { }

  ngOnInit(): void { }

  evalLike(): void {
    const usuarioString: string | null = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      const parsedUserId = parseInt(usuarioString);
      if (!isNaN(parsedUserId)) {
        const user_id = parsedUserId;
        const post_id = this.post_id;
        this._likeService.evalLike(user_id.toString(), post_id.toString()).subscribe({
          next: (data) => {
            console.log(data)
            window.location.reload()
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
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
          window.location.reload()
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


}
