export const defaultValues = {
  APP_PORT: 3000,
  NODE_ENV: 'development',
  database: {
    DB_TYPE: 'postgres',
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_USER: 'postgres',
    //DB_PASS: '',
    DB_DATABASE: 'postgres',
  },

  JWT_SECRET: 'ALTERNATIVE SECRET cufefrufraphI69ez#dO',
  JWT_EXPIRATION_TIME: '15m',
};

export enum ListingStatus {
  ACTIVA = 'activa',
  INACTIVA = 'inactiva',
  PENDIENTE = 'pendiente',
  SUSPENDIDA = 'suspendida',
  ELIMINADA = 'eliminada',
  VENDIDA = 'vendida',
}
