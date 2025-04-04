import * as bcrypt from 'bcrypt';
import { AppConstants } from 'src/constants/user.constants';

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, AppConstants.SALT_ROUNDS);
};

export const comparePassword = (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
