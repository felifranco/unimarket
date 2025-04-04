export enum AuthStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  PENDIENTE = 'pendiente',
  SUSPENDIDO = 'suspendido',
  ELIMINADO = 'eliminado',
  BLOQUEADO = 'bloqueado',
}

export const AppConstants = {
  JWT_SECRET: process.env.JWT_SECRET || 'defaultSecretKey',
  SALT_ROUNDS: 10,
  TOKEN_EXPIRATION: '1h',
};
