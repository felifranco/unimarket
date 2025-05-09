import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { listingInterface } from "../interfaces/listings.interfaces";
import Modal from "./common/Modal";
import Post from "./Post";
import { useAppDispatch } from "../hooks";
import {
  fetchListingById,
  fetchMyListings,
  deleteListing,
  clearListing,
} from "../store/listing/listingSlice";

const AccountProductCard = (Product: listingInterface) => {
  const { t } = useTranslation("AccountProductCard");

  const dispatch = useAppDispatch();

  const {
    id_publicacion,
    titulo,
    estrellas,
    calificacion,
    vendidos,
    existencias,
    simbolo_moneda,
    precio_anterior,
    precio,
    imagen_portada,
  } = Product;

  const handleEdit = async () => {
    if (id_publicacion) {
      await dispatch(fetchListingById({ id_publicacion }));
    }
  };

  const handleDelete = async () => {
    if (id_publicacion) {
      await dispatch(deleteListing({ id_publicacion }));
      dispatch(fetchMyListings());
    }
  };

  const handleCloseEdit = () => {
    dispatch(clearListing());
  };

  return (
    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
      <div className="product-card__thumb rounded-8 bg-gray-50 position-relative">
        <Link to="/product-details" className="w-100 h-100 flex-center">
          <img src={imagen_portada} alt="" className="w-auto max-w-unset" />
        </Link>
      </div>
      <div className="product-card__content mt-16 w-100">
        <h6 className="title text-lg fw-semibold my-16">
          <Link to="/product-details" className="link text-line-2" tabIndex={0}>
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
            {t("sold")}: {`${vendidos}/${existencias}`}
          </span>
        </div>
        <div className="product-card__price mt-16 mb-30">
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

      <Modal
        title="Editar Publicación"
        Content={<Post {...Product} />}
        onCloseModal={handleCloseEdit}
        size="modal-xl"
        id="editPublication"
      />
    </div>
  );
};

export default AccountProductCard;
