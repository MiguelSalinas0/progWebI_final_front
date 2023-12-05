export interface Post {
    success: boolean;
    data:    Datum[];
}

export interface Datum {
    post_id:              number;
    contenido:            string;
    fecha_publicacion:    Date;
    user_id:              number;
    cantidad_likes:       number;
    cantidad_comentarios: number;
    comentarios:          Comentario[];
    autor:                Autor;
    likedBy:              number[]
}

export interface Autor {
    nombre:   string;
    apellido: string;
    profile:  string;
}

export interface Comentario {
    id_comentario:        number;
    contenido_comentario: string;
    fecha_comentario:     Date;
    profile:              string;
    autor:                string;
}