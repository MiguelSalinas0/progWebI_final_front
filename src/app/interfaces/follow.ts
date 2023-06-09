export interface Follow {
    seguidores: Seguido[];
    seguidos:   Seguido[];
}

export interface Seguido {
    user_id:            number;
    nombre:             string;
    apellido:           string;
    correo_electronico: string;
    profile:            string;
}