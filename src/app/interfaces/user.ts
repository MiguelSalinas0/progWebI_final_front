export interface User {
    user_id:             number;
    nombre:              string;
    apellido:            string;
    correo_electronico:  string;
    biografia:           string;
    profile:             string;
    cantidad_seguidores: number;
    cantidad_seguidos:   number;
}

export interface Users {
    success: boolean;
    data:    OUsers[];
}

export interface OUsers {
    user_id:            number;
    nombre:             string;
    apellido:           string;
    correo_electronico: string;
    biografia:          string;
    profile:            string;
}
