export interface PostUser {
    success: boolean;
    autor:   Autor;
    posts:   Post[];
}

export interface Autor {
    nombre:   string;
    apellido: string;
    profile:  string;
}

export interface Post {
    post_id:           number;
    contenido:         string;
    fecha_publicacion: Date;
    cantidad_likes:    number;
    comentarios:       Comentario[];
}

export interface Comentario {
    id_comentario:        number;
    contenido_comentario: string;
    fecha_comentario:     Date;
    profile:              string;
    autor:                string;
}