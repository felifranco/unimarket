import {Pool} from 'pg';
import {conversacion, mensaje} from '../types/postgres.type';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  max: 2, // Limita conexiones por Lambda
  idleTimeoutMillis: 10000,
});

export const insertConversacion = async ({
  remitente,
  destinatario,
}: conversacion): Promise<number> => {
  try {
    const query = `
    INSERT INTO conversacion (remitente, destinatario)
    VALUES ($1, $2)
    RETURNING id_conversacion;
  `;
    const values = [remitente, destinatario];
    const result = await pool.query(query, values);
    // El id generado está en result.rows[0].id_conversacion
    return result.rows[0].id_conversacion;
  } catch (error) {
    console.error('Error inserting conversation:', error);
    return -1;
  }
};

export const insertarMensaje = ({
  id_conversacion,
  remitente,
  tipo,
  mensaje,
  adjunto_url,
  adjunto_nombre,
  adjunto_tipo,
  adjunto_tamano,
}: mensaje) => {
  try {
    pool.query(
      `
      INSERT INTO mensaje (
        id_conversacion,
        remitente,
        tipo,
        mensaje,
        adjunto_url,
        adjunto_nombre,
        adjunto_tipo,
        adjunto_tamano
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
      [
        id_conversacion,
        remitente,
        tipo,
        mensaje,
        adjunto_url,
        adjunto_nombre,
        adjunto_tipo,
        adjunto_tamano,
      ],
    );
  } catch (err) {
    //console.error('Error inserting data:', err);
  } finally {
    //console.timeEnd('postgres');
  }
};
