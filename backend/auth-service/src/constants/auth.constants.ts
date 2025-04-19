export enum AuthStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  PENDIENTE = 'pendiente',
  SUSPENDIDO = 'suspendido',
  ELIMINADO = 'eliminado',
  BLOQUEADO = 'bloqueado',
}

export const AppConstants = {
  SALT_ROUNDS: 10,
  TOKEN_EXPIRATION: '1h',
};

export const jwtConstants = {
  secret:
    process.env.JWT_SECRET ||
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
