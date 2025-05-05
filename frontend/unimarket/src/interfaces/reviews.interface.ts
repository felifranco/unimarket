export interface reviewInterface {
  id_comentario?: number;
  id_usuario?: number;
  id_publicacion: number;
  id_comentario_respuesta?: number;
  nombre_usuario: string;
  titulo: string;
  contenido: string;
  estrellas: number;
  likes?: number;
  estado?: string;
  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}
