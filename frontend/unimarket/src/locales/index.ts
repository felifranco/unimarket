import AccountEn from "./en/Account.json";
import AccountEs from "./es/Account.json";

const resources = {
  en: {
    Account: AccountEn,
  },
  es: {
    Account: AccountEs,
  },
};

export default resources;

export const DEFAULT_LANGUAGE = "es";
