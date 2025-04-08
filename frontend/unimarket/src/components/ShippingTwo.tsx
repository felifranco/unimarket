import { useTranslation } from "react-i18next";

const ShippingTwo = () => {
  const { t } = useTranslation("ShippingTwo");

  return (
    <section className="shipping mb-80" id="shipping">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-car-profile" />
              </span>
              <div className="">
                <h6 className="mb-0">{t("shipping_title")}</h6>
                <span className="text-sm text-heading">
                  {t("shipping_description")}
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-hand-heart" />
              </span>
              <div className="">
                <h6 className="mb-0">{t("satisfaction_title")}</h6>
                <span className="text-sm text-heading">
                  {t("satisfaction_description")}
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-credit-card" />
              </span>
              <div className="">
                <h6 className="mb-0">{t("payment_title")}</h6>
                <span className="text-sm text-heading">
                  {t("payment_description")}
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-chats" />
              </span>
              <div className="">
                <h6 className="mb-0"> {t("support_title")}</h6>
                <span className="text-sm text-heading">
                  {t("support_description")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingTwo;
