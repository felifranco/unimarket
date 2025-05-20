import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { listingInterface } from "../interfaces/listings.interfaces";
import { useAppDispatch } from "../hooks";
import {
  fetchListingById,
  fetchMyListings,
  deleteListing,
} from "../store/listing/listingSlice";
import { navigateTo } from "../helper/NavigateHelper";
import { publicationTypes } from "../constants/post.constants";
import { formatDate } from "../utils/app.util";

const AccountProductCard = (Product: listingInterface) => {
  const { t } = useTranslation("AccountProductCard");

  const dispatch = useAppDispatch();

  const {
    id_publicacion,
    tipo_publicacion,
    titulo,
    estrellas,
    calificacion,
    vendidos = 0,
    existencias = 0,
    simbolo_moneda,
    precio_anterior = 0,
    precio = 0,
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

  const handleEdit = async () => {
    if (id_publicacion) {
      await dispatch(fetchListingById({ id_publicacion }));
      console.log("Listing fetched successfully");
      navigateTo("/post");
    }
  };

  const handleDelete = async () => {
    if (id_publicacion) {
      await dispatch(deleteListing({ id_publicacion }));
      dispatch(fetchMyListings());
    }
  };

  return (
    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
      <div className="product-card__thumb rounded-8 bg-gray-50 position-relative">
        <Link
          to="/post"
          onClick={handleEdit}
          className="w-100 h-100 flex-center"
        >
          <img src={imagen_portada} alt="" className="max-w-unset mh-100" />
        </Link>
      </div>
      <div className="product-card__content mt-16 w-100">
        <h6 className="title text-lg fw-semibold my-16">
          <Link
            to="/post"
            onClick={handleEdit}
            className="link text-line-2"
            tabIndex={0}
          >
            {titulo}
          </Link>
        </h6>
        <div className="flex-align gap-6">
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
            ({`${calificacion}K`})
          </span>
        </div>
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
            {tipo_publicacion == "sale"
              ? `${t("sold")}: ${vendidos}/${existencias}`
              : `${t("stock")}: ${existencias}`}
          </span>
        </div>
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
        <div
          className="product-card__price mt-16 mb-30"
          style={{
            visibility: `${tipo_publicacion != "sale" ? "hidden" : "visible"}`,
          }}
        >
          {precio_anterior > 0 ? (
            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
              {simbolo_moneda}
              {precio_anterior}
            </span>
          ) : null}
          <span className="text-heading text-md fw-semibold ">
            {simbolo_moneda}
            {precio} <span className="text-gray-500 fw-normal"></span>
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <button
            type="button"
            className="btn text-main-600 hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 rounded-16 flex-align ms-4 me-4"
            data-bs-toggle="modal"
            data-bs-target="#editPublication"
            onClick={handleEdit}
          >
            <i className="ph-fill ph-pencil-simple text-lg" />
            {t("edit")}
          </button>
          <button
            type="button"
            className="btn text-main-600 hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 rounded-16 flex-align ms-4 me-4"
            onClick={handleDelete}
          >
            <i className="ph-fill ph-trash-simple text-lg" />
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProductCard;
