import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { listingInterface } from "../interfaces/listings.interfaces";
import { useAppSelector } from "../hooks";

const ProductCard = (Product: listingInterface) => {
  const { t } = useTranslation("ProductCard");

  const logged = useAppSelector(state => state.auth.logged);

  const {
    id_publicacion,
    titulo,
    estrellas,
    calificacion,
    simbolo_moneda,
    precio_anterior,
    precio,
    imagen_portada,
  } = Product;

  const handleLike = () => {
    console.log("handleLike", id_publicacion);
  };

  const handleChat = () => {
    console.log("handleChat", id_publicacion);
  };

  const handleAddToCart = () => {
    console.log("handleAddToCart", id_publicacion);
  };

  return (
    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
      <div className="product-card__thumb rounded-8 bg-gray-50 position-relative">
        <Link to="/product-details" className="w-100 h-100 flex-center">
          <img src={imagen_portada} alt="" className="w-auto max-w-unset" />
        </Link>
        {logged ? (
          <div className="group bg-white p-2 rounded-pill z-1 position-absolute inset-inline-end-0 inset-block-start-0 me-16 mt-16 shadow-sm">
            <button
              type="button"
              className="expand-btn w-40 h-40 text-md d-flex justify-content-center align-items-center rounded-circle hover-bg-main-two-600 hover-text-white"
            >
              <i className="ph ph-plus" />
            </button>
            <div className="expand-icons gap-20 my-20">
              <button
                type="button"
                className="text-neutral-600 text-xl flex-center hover-text-main-two-600 wishlist-btn"
                onClick={handleLike}
              >
                <i className="ph ph-heart" />
              </button>
              <button
                type="button"
                className="text-neutral-600 text-xl flex-center hover-text-main-two-600"
                onClick={handleChat}
              >
                <i className="ph ph-wechat-logo" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="product-card__content mt-16 w-100">
        <h6 className="title text-lg fw-semibold my-16">
          <Link to="/product-details" className="link text-line-2" tabIndex={0}>
            {titulo}
          </Link>
        </h6>
        <div className="flex-align gap-6">
          <div className="flex-align gap-8">
            {Array.from({ length: estrellas }, (_, index) => (
              <span
                key={index}
                className="text-15 fw-medium text-warning-600 d-flex"
              >
                <i className="ph-fill ph-star" />
              </span>
            ))}
          </div>
          <span className="text-xs fw-medium text-gray-500">{estrellas}</span>
          <span className="text-xs fw-medium text-gray-500">
            ({`${calificacion}K`})
          </span>
        </div>
        <div className="product-card__price mt-16 mb-30">
          <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
            {simbolo_moneda}
            {precio_anterior}
          </span>
          <span className="text-heading text-md fw-semibold ">
            {simbolo_moneda}
            {precio}
          </span>
        </div>
        <Link
          to="/cart"
          className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
          tabIndex={0}
          onClick={handleAddToCart}
        >
          {t("add_to_cart")}
          <i className="ph ph-shopping-cart" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
