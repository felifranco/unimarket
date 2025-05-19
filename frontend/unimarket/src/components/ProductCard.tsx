import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { listingInterface } from "../interfaces/listings.interfaces";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchListingById } from "../store/listing/listingSlice";
import { publicationTypes } from "../constants/post.constants";
import { formatDate } from "../utils/app.util";

const ProductCardBadge = ({ type, text }: { type: string; text: string }) => {
  //const { t } = useTranslation("ProductCard");

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

const ProductCard = (Product: listingInterface) => {
  const { t } = useTranslation("ProductCard");

  const dispatch = useAppDispatch();

  const logged = useAppSelector(state => state.auth.logged);

  const {
    id_publicacion,
    tipo_publicacion,
    titulo,
    estrellas = 0,
    calificacion = 0,
    vendidos = 0,
    existencias = 0,
    simbolo_moneda,
    precio_anterior = 0,
    precio = 0,
    insignia,
    imagen_portada,
    fecha_creacion,
  } = Product;

  let publication_type_label = null;
  switch (tipo_publicacion) {
    case publicationTypes[0].code:
      publication_type_label = t("sale");
      break;
    case publicationTypes[1].code:
      publication_type_label = t("exchange");
      break;
    case publicationTypes[2].code:
      publication_type_label = t("donation");
      break;
    default:
      break;
  }

  const handleLike = () => {
    console.log("handleLike", id_publicacion);
  };

  const handleChat = () => {
    console.log("handleChat", id_publicacion);
  };

  const handleAddToCart = () => {
    console.log("handleAddToCart", id_publicacion);
  };

  const handleOpenDetails = () => {
    console.log("handleOpenDetails", id_publicacion);
    if (id_publicacion) dispatch(fetchListingById({ id_publicacion }));
  };

  return (
    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
      <div className="product-card__thumb rounded-8 bg-gray-50 position-relative">
        <Link
          to="/product-details"
          onClick={handleOpenDetails}
          className="w-100 h-100 flex-center"
        >
          <img src={imagen_portada} alt="" className="w-auto max-w-unset" />
          {insignia ? (
            <ProductCardBadge type={insignia} text={insignia} />
          ) : null}
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
        <h6 className="title text-lg fw-semibold mt-12 mb-8">
          <Link
            to="/product-details"
            onClick={handleOpenDetails}
            className="link text-line-2"
            tabIndex={0}
          >
            {titulo}
          </Link>
        </h6>
        <div className="flex-align mb-20 mt-16 gap-6">
          <div className="flex-align gap-8">
            {estrellas && estrellas > 0 ? (
              Array.from({ length: estrellas }, (_, index) => (
                <span
                  key={index}
                  className="text-15 fw-medium text-warning-600 d-flex"
                >
                  <i className="ph-fill ph-star" />
                </span>
              ))
            ) : (
              <span className="text-15 fw-medium text-warning-600 d-flex">
                <i className="ph-fill ph-star" />
              </span>
            )}
          </div>
          <span className="text-xs fw-medium text-gray-500">{estrellas}</span>
          <span className="text-xs fw-medium text-gray-500">
            ({calificacion}k)
          </span>
        </div>
        {tipo_publicacion === "sale" ? (
          <div className="mt-8">
            <div
              className="progress w-100 bg-color-three rounded-pill h-4"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow={vendidos}
              aria-valuemin={0}
              aria-valuemax={existencias}
            >
              <div
                className="progress-bar bg-main-two-600 rounded-pill"
                style={{ width: `${(vendidos * 100) / existencias}%` }}
              />
            </div>
            <span className="text-gray-900 text-xs fw-medium mt-8">
              {t("sold")}: {`${vendidos}/${existencias}`}
            </span>
          </div>
        ) : null}
        {publication_type_label ? (
          <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
            {publication_type_label}
          </span>
        ) : null}
        <div className="d-flex justify-content-end ">
          <span className="bg-white text-main-600 flex-center text-xl">
            <i className="ph-fill ph-calendar" />
          </span>
          <span className="text-sm text-neutral-600">
            <span className="fw-semibold text-main-600">
              {fecha_creacion
                ? formatDate(new Date(fecha_creacion), "DD/MM/YYYY")
                : null}
            </span>{" "}
          </span>
        </div>
        {tipo_publicacion === "sale" ? (
          <div className="product-card__price my-20">
            {precio_anterior > 0 ? (
              <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                {simbolo_moneda}
                {precio_anterior}
              </span>
            ) : null}
            <span className="text-heading text-md fw-semibold ">
              {simbolo_moneda}
              {precio}
            </span>
          </div>
        ) : null}
        <Link
          to="/cart"
          className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium mt-20"
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
