export interface listingInterface {
  id_publicacion?: number;
  id_usuario?: number;
  tipo_publicacion: string | undefined;
  titulo: string | undefined;
  descripcion_general: string | undefined;
  sku: string | undefined;
  categorias: string | undefined;
  ubicacion: string | undefined;
  estado: string | undefined;
  estrellas: number;
  calificacion: number;
  vendidos: number;
  existencias: number;
  descripcion_producto: string | undefined;
  simbolo_moneda: string | undefined;
  precio_anterior: number;
  precio: number;
  insignia: string | undefined;
  imagenes: string | undefined;
  imagen_portada: string | undefined;
  fecha_creacion: string | Date;
  fecha_modificacion: string | Date;
}
