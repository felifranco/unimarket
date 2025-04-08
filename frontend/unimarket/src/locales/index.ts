import AccountEn from "./en/Account.json";
import AccountEs from "./es/Account.json";
import HeaderTwoEn from "./en/HeaderTwo.json";
import HeaderTwoEs from "./es/HeaderTwo.json";

const resources = {
  en: {
    Account: AccountEn,
    HeaderTwo: HeaderTwoEn,
  },
  es: {
    Account: AccountEs,
    HeaderTwo: HeaderTwoEs,
  },
};

export default resources;

export const DEFAULT_LANGUAGE = "es";
