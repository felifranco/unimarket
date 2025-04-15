import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ShopProductCardProps {
  name: string;
  stars: number;
  rating: number;
  sold: number;
  stock: number;
  currency_symbol: string;
  old_price: number;
  price: number;
  badge: string;
  cover_image: string;
}

const ProductCardBadge = ({ type, text }: { type: string; text: string }) => {
  //const { t } = useTranslation("ShopProductCard");

  let color = "";
  //text = "";

  switch (type) {
    case "low":
      color = "bg-primary-600";
      //text = {t("new")};
      break;

    case "medium":
      color = "bg-warning-600";
      //text = {t("new")};

      break;

    case "high":
      color = "bg-danger-600";
      //text = {t("new")};
      break;

    default:
      color = "bg-primary-600";
      //text = {t("new")};
      break;
  }
  return (
    <span
      className={`product-card__badge ${color} px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0`}
    >
      {text}{" "}
    </span>
  );
};

const ShopProductCard = ({
  name,
  stars,
  rating,
  sold,
  stock,
  currency_symbol,
  old_price,
  price,
  badge,
  cover_image,
}: ShopProductCardProps) => {
  const { t } = useTranslation("ShopProductCard");

  return (
    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
      <Link
        to="/product-details"
        className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
      >
        <img src={cover_image} alt="" className="w-auto max-w-unset" />
        {badge ? <ProductCardBadge type={badge} text={badge} /> : null}
      </Link>
      <div className="product-card__content mt-16" style={{ width: "100%" }}>
        <h6 className="title text-lg fw-semibold mt-12 mb-8">
          <Link to="/product-details" className="link text-line-2" tabIndex={0}>
            {name}
          </Link>
        </h6>
        <div className="flex-align mb-20 mt-16 gap-6">
          <span className="text-xs fw-medium text-gray-500">{stars}</span>
          <span className="text-15 fw-medium text-warning-600 d-flex">
            <i className="ph-fill ph-star" />
          </span>
          <span className="text-xs fw-medium text-gray-500">({rating}k)</span>
        </div>
        <div className="mt-8">
          <div
            className="progress w-100 bg-color-three rounded-pill h-4"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow={35}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar bg-main-two-600 rounded-pill"
              style={{ width: "35%" }}
            />
          </div>
          <span className="text-gray-900 text-xs fw-medium mt-8">
            {t("sold")}: {`${sold}/${stock}`}
          </span>
        </div>
        <div className="product-card__price my-20">
          <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
            {currency_symbol}
            {old_price}
          </span>
          <span className="text-heading text-md fw-semibold ">
            {currency_symbol}
            {price}{" "}
          </span>
        </div>
        <Link
          to="/cart"
          className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
          tabIndex={0}
        >
          {t("add_to_cart")} <i className="ph ph-shopping-cart" />
        </Link>
      </div>
    </div>
  );
};

export default ShopProductCard;
