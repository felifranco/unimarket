import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterTwo = () => {
  const { t } = useTranslation("FooterTwo");

  return (
    <footer className="footer py-80">
      <div className="container container-lg">
        <div className="footer-item-two-wrapper d-flex align-items-start flex-wrap">
          <div className="footer-item max-w-275">
            <div className="footer-item__logo">
              <Link to="/">
                {" "}
                <img src="assets/images/logo/logo-two-black.png" alt="" />
              </Link>
            </div>
            <p className="mb-24">{t("description")}</p>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                <i className="ph-fill ph-github-logo" />
              </span>
              <Link
                to="https://github.com/felifranco/unimarket"
                className="text-md text-gray-900 hover-text-main-600"
              >
                GitHub
              </Link>
            </div>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                <i className="ph-fill ph-envelope" />
              </span>
              <span className="text-md text-gray-900 ">
                f64franco@gmail.com
              </span>
            </div>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
                <i className="ph-fill ph-map-pin" />
              </span>
              <span className="text-md text-gray-900 ">{t("location")}</span>
            </div>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">{t("about_us")}</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("contact_us")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("feedback")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("rules_policy")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">{t("customer_service")}</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("help_center")}
                </Link>
              </li>
              <li className="mb-16">
                <Link
                  to="/contact"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("contact_us")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("report_abuse")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("policies_and_rules")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">{t("my_account")}</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("my_account")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("order_history")}
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  {t("shoping_cart")}
                </Link>
              </li>
              <li className="mb-16">
                <Link
                  to="/wishlist"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("wishlist")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">{t("information")}</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link
                  to="/register"
                  className="text-gray-600 hover-text-main-600"
                >
                  {t("become_vendor")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
