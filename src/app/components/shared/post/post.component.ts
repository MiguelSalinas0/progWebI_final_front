import { Component, Input, OnInit } from '@angular/core';
import { Autor, Comentario } from 'src/app/interfaces/post';
import { format } from 'date-fns';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() contenido!: string;
  @Input() autor!: Autor;
  @Input() fecha_publicacion!: Date;
  @Input() cantidad_likes!: number;
  @Input() comentarios!: Comentario[];

  constructor() { }

  ngOnInit(): void { }

}
