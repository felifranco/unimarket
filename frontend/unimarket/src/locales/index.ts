import AccountEn from "./en/Account.json";
import AccountEs from "./es/Account.json";
import HeaderTwoEn from "./en/HeaderTwo.json";
import HeaderTwoEs from "./es/HeaderTwo.json";
import ShopPageEn from "./en/ShopPage.json";
import ShopPageEs from "./es/ShopPage.json";
import BreadcrumbEn from "./en/Breadcrumb.json";
import BreadcrumbEs from "./es/Breadcrumb.json";
import ShopSectionEn from "./en/ShopSection.json";
import ShopSectionEs from "./es/ShopSection.json";
import ShippingTwoEn from "./en/ShippingTwo.json";
import ShippingTwoEs from "./es/ShippingTwo.json";

const resources = {
  en: {
    Account: AccountEn,
    HeaderTwo: HeaderTwoEn,
    ShopPage: ShopPageEn,
    Breadcrumb: BreadcrumbEn,
    ShopSection: ShopSectionEn,
    ShippingTwo: ShippingTwoEn,
  },
  es: {
    Account: AccountEs,
    HeaderTwo: HeaderTwoEs,
    ShopPage: ShopPageEs,
    Breadcrumb: BreadcrumbEs,
    ShopSection: ShopSectionEs,
    ShippingTwo: ShippingTwoEs,
  },
};

export default resources;

export const DEFAULT_LANGUAGE = "es";
