export interface Login {
    success: boolean;
    message: string;
    user:    User;
}

export interface User {
    user_id:            number;
    nombre:             string;
    apellido:           string;
    correo_electronico: string;
    contrasena:         string;
    fecha_registro:     Date;
    biografia:          string;
    profile:            string;
}