import { Component, Input, OnInit } from '@angular/core';
import { Autor, Comentario } from 'src/app/interfaces/post';
import { LikeService } from 'src/app/services/like.service';

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

  user_id: number | null = null;

  constructor(private _likeService: LikeService) { }

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
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    }
  }


}
