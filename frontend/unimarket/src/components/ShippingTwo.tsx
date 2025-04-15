import { useTranslation } from "react-i18next";
import { serviceHighlights } from "../mocks/serviceHighlights.json";

interface ServiceHighlightProps {
  icon: string;
  title: string;
  description: string;
}

const KeyBenefits = ({ icon, title, description }: ServiceHighlightProps) => {
  const { t } = useTranslation("ShippingTwo");

  return (
    <div className="col-xxl-3 col-sm-6">
      <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
        <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
          <i className={`ph-fill ${icon}`} />
        </span>
        <div className="">
          <h6 className="mb-0">{t(title)}</h6>
          <span className="text-sm text-heading">{t(description)}</span>
        </div>
      </div>
    </div>
  );
};

const ShippingTwo = () => {
  return (
    <section className="shipping mb-80" id="shipping">
      <div className="container container-lg">
        <div className="row gy-4">
          {serviceHighlights.map(
            (item: ServiceHighlightProps, index: number) => (
              <KeyBenefits
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default ShippingTwo;
