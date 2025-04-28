import { Link } from "react-router-dom";
import { listingInterface } from "../interfaces/listings.interfaces";

const AccountSellingProductCard = ({
  titulo,
  calificacion,
  vendidos,
  simbolo_moneda,
  precio,
}: listingInterface) => {
  return (
    <div className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-16">
      <Link
        to="/blog-details"
        className="w-100 h-100 rounded-4 overflow-hidden w-76 h-76 flex-shrink-0 bg-color-three flex-center"
      >
        <img
          src="assets/images/thumbs/best-selling-img4.png"
          alt=""
          className=""
        />
      </Link>
      <div className="flex-grow-1">
        <h6 className="text-lg mb-8 fw-medium">
          <Link to="/product-details" className="text-line-3">
            {titulo}
          </Link>
        </h6>
        <div className="flex-align gap-6">
          <div className="flex-align gap-4">
            <span className="text-xs fw-medium text-warning-600 d-flex">
              <i className="ph-fill ph-star" />
            </span>
            <span className="text-xs fw-medium text-warning-600 d-flex">
              <i className="ph-fill ph-star" />
            </span>
            <span className="text-xs fw-medium text-warning-600 d-flex">
              <i className="ph-fill ph-star" />
            </span>
            <span className="text-xs fw-medium text-warning-600 d-flex">
              <i className="ph-fill ph-star" />
            </span>
            <span className="text-xs fw-medium text-warning-600 d-flex">
              <i className="ph-fill ph-star" />
            </span>
          </div>
          <span className="text-xs fw-medium text-neutral-500">
            {calificacion}
          </span>
          <span className="text-xs fw-medium text-neutral-500">
            ({`${vendidos}k`})
          </span>
        </div>
        <h6 className="text-md mb-0 mt-4">{`${simbolo_moneda}${precio}`}</h6>
      </div>
    </div>
  );
};

export default AccountSellingProductCard;
