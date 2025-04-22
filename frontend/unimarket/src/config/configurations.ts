import constants from "../constants/app";

export const service = {
  AUTH_SERVICE: import.meta.env.VITE_AUTH_SERVICE,
  ADMIN_SERVICE: import.meta.env.VITE_ADMIN_SERVICE,
  LISTING_SERVICE: import.meta.env.VITE_LISTING_SERVICE,
  REVIEW_SERVICE: import.meta.env.VITE_REVIEW_SERVICE,
  USER_SERVICE: import.meta.env.VITE_USER_SERVICE,
};

export default {
  APP_PORT: parseInt(import.meta.env.VITE_APP_PORT!, 10) || constants.APP_PORT,
};
