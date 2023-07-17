export interface Registro {
    success: boolean;
    data:    Data;
}

export interface Data {
    user_id:            number;
    nombre:             string;
    apellido:           string;
    correo_electronico: string;
    contrasena:         string;
    fecha_registro:     Date;
    biografia:          string;
    profile:            string;
}
