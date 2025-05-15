import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userInterface } from "../interfaces/users.interface";
import { useAppDispatch } from "../hooks";
import { fetchUserById } from "../store/user/userSlice";

const imagen_portada_predeterminada =
  "assets/images/thumbs/vendors-two-img3.png";
const imagen_perfil_predeterminada =
  "assets/images/thumbs/vendors-two-icon3.png";

const VedorCard = ({
  id_usuario,
  nombre_completo,
  imagen_portada,
  imagen_perfil,
  estrellas,
  calificacion,
  ubicacion,
  correo,
  telefono,
}: userInterface) => {
  const { t } = useTranslation("VedorCard");
  const dispatch = useAppDispatch();

  const handleOpenStore = () => {
    dispatch(fetchUserById({ id_usuario }));
  };

  return (
    <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
      <div className="vendors-two-item__top bg-overlay style-two position-relative">
        <div className="vendors-two-item__thumbs h-210">
          <img
            src={
              imagen_portada ? imagen_portada : imagen_portada_predeterminada
            }
            alt=""
            className="cover-img"
          />
        </div>
        <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
          <div className="d-flex align-items-center justify-content-between">
            <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
              <img
                src={
                  imagen_perfil ? imagen_perfil : imagen_perfil_predeterminada
                }
                alt=""
              />
            </span>
            {/* <button
              type="button"
              className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
            >
              {t("follow")}
            </button> */}
          </div>
          <div className="mt-16">
            <h6 className="text-white fw-semibold mb-12">
              <Link to="/vendor-details" onClick={handleOpenStore} className="">
                {nombre_completo}
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
                )}{" "}
              </div>
              <span className="text-xs fw-medium text-white">{estrellas}</span>
              <span className="text-xs fw-medium text-white">
                ({calificacion})
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="vendors-two-item__content p-24 flex-grow-1">
        <div className="d-flex flex-column gap-14">
          <div className="flex-align gap-8">
            <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
              <i className="ph ph-map-pin-line" />
            </span>
            <p className="text-md text-gray-900">{ubicacion}</p>
          </div>
          <div className="flex-align gap-8">
            <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
              <i className="ph ph-envelope-simple" />
            </span>
            <a
              href="mailto:info@watch.com"
              className="text-md text-gray-900 hover-text-main-60"
            >
              {correo}
            </a>
          </div>
          <div className="flex-align gap-8">
            <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
              <i className="ph ph-phone" />
            </span>
            <a
              href="tel:0833081888"
              className="text-md text-gray-900 hover-text-main-60"
            >
              {telefono}
            </a>
          </div>
        </div>
        <Link
          to="/vendor-details"
          onClick={handleOpenStore}
          className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
        >
          {t("visit_store")}
          <span className="text-xl d-flex text-main-two-600">
            {" "}
            <i className="ph ph-storefront" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default VedorCard;
