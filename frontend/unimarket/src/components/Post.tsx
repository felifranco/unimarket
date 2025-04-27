import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import {
  badgeTypes,
  currenciesTypes,
  icons,
  publicationTypes,
} from "../constants/post.constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { listingInterface } from "../interfaces/listings.interfaces";
import {
  BadgeType,
  CurrencyType,
  NewProductType,
  PublicationType,
} from "../interfaces/post.interfaces";
import new_product from "../mocks/new_product.json";
import { createListing, patchListing } from "../store/listing/listingSlice";
import Modal from "./common/Modal";

import { formatDate } from "../utils/app.util";

const Post = (Product: listingInterface) => {
  const { t } = useTranslation("Post");

  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.auth.token);
  const id_usuario = useAppSelector(state => state.auth.id_usuario);
  const listing = useAppSelector(state => state.listing.listing);

  const { images, descripcion_producto: descripcion_producto_text } =
    new_product;

  const descripcion_producto = JSON.parse(descripcion_producto_text);
  //console.log("descripcion_producto", descripcion_producto_text, descripcion_producto);

  const [productData, setProductData] = useState(Product);
  const [mainImage, setMainImage] = useState(images[0]);

  const {
    id_publicacion,
    titulo,
    descripcion_general,
    sku,
    ubicacion,
    tipo_publicacion,
    simbolo_moneda,
    precio,
    precio_anterior,
    existencias,
    insignia,
    //imagenes,
    //descripcion_producto,
    fecha_creacion = new Date(),
    fecha_modificacion = new Date(),
  } = productData;

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const handleSaveProductDescription = () => {
    console.log("handleSaveProductDescription button clicked");
  };

  const handleSave = async (formData: FormData) => {
    const titulo = formData.get("titulo") as string;
    const sku = formData.get("sku") as string;
    const descripcion_general = formData.get("descripcion_general") as string;
    const ubicacion = formData.get("ubicacion") as string;
    const tipo_publicacion = formData.get("tipo_publicacion") as string;
    const simbolo_moneda = formData.get("simbolo_moneda") as string;
    const precio = formData.get("precio") as string;
    const precio_anterior = formData.get("precio_anterior") as string;
    const existencias = formData.get("existencias") as string;
    const insignia = formData.get("insignia") as string;

    const data = {
      id_usuario,
      titulo,
      sku,
      descripcion_general,
      ubicacion,
      tipo_publicacion,
      simbolo_moneda,
      precio,
      precio_anterior,
      existencias,
      insignia,
    };

    if (token && id_usuario) {
      if (id_publicacion) {
        await dispatch(
          patchListing({ token, listing: { ...data, id_publicacion } }),
        );
        //dispatch(fetchMyListings({ token, id_usuario }));
      } else {
        dispatch(createListing({ token, listing: data }));
      }
    }
  };

  useEffect(() => {
    //console.log("cambio en listing:", listing);

    if (id_publicacion == listing.id_publicacion) {
      setProductData(listing);
      //const formData = new FormData();
      //formData.set("titulo", "VALOR");
    }
  }, [listing, id_publicacion]);

  return (
    <section className="product-details py-80">
      <div className="container container-lg">
        <form action={handleSave}>
          <div className="row gy-4">
            <div className="col-xl-4">
              <div className="product-details__left">
                <div className="product-details__thumb-slider border border-gray-100 hover-border-main-600 transition-1 rounded-16">
                  <div className="">
                    <div className="product-details__thumb flex-center h-100">
                      <img src={mainImage} alt="Main Product" />
                    </div>
                  </div>
                </div>
                <div className="mt-24">
                  <div className="product-details__images-slider">
                    <Slider {...settingsThumbs}>
                      {images.map((image, index) => (
                        <div
                          className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                          key={index}
                          onClick={() => setMainImage(image)}
                        >
                          <img
                            className="thum"
                            src={image}
                            alt={`Thumbnail ${index}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="product-details__content h-100">
                <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("title")}
                    </label>
                    <textarea
                      id="titulo"
                      name="titulo"
                      placeholder="Title"
                      className="common-input"
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.8rem",
                        minWidth: "100%",
                      }}
                      rows={2}
                      defaultValue={titulo}
                    />
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      SKU
                    </label>
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      placeholder="SKU"
                      className="common-input"
                      defaultValue={sku}
                    />
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("overview")}
                    </label>
                    <textarea
                      id="descripcion_general"
                      name="descripcion_general"
                      placeholder="Overview"
                      className="common-input"
                      style={{ minWidth: "100%" }}
                      rows={7}
                      defaultValue={descripcion_general}
                    />
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("colours")}
                    </label>
                    <div className="flex-between align-items-start flex-wrap gap-16">
                      <div>
                        <div className="color-list flex-align gap-8">
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-info-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-warning-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-tertiary-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-main-600"
                          />
                          <button
                            type="button"
                            className="color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("location")}
                    </label>
                    <input
                      type="text"
                      id="ubicacion"
                      name="ubicacion"
                      placeholder="ubicacion"
                      className="common-input"
                      defaultValue={ubicacion}
                    />
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("badge")}
                    </label>
                    <select
                      id="insignia"
                      name="insignia"
                      className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                      defaultValue={insignia}
                    >
                      {badgeTypes.map((type: BadgeType) => (
                        <option key={type.code} value={type.code}>
                          {t(`badge_types.${type.code}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="product-details__sidebar">
                <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("publication_type")}
                    </label>
                    <select
                      id="tipo_publicacion"
                      name="tipo_publicacion"
                      className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                      defaultValue={tipo_publicacion}
                    >
                      {publicationTypes.map((type: PublicationType) => (
                        <option key={type.code} value={type.code}>
                          {t(`publication_types.${type.code}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("currency_symbol")}
                    </label>
                    <select
                      id="simbolo_moneda"
                      name="simbolo_moneda"
                      className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                      defaultValue={simbolo_moneda}
                    >
                      {currenciesTypes.map((type: CurrencyType) => (
                        <option key={type.code} value={type.code}>
                          {`${t(`currency_types.${type.code}`)} (${type.symbol})`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("price")}
                    </label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      placeholder="Precio"
                      className="common-input"
                      defaultValue={precio}
                    />
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("old_price")}
                    </label>
                    <input
                      type="number"
                      id="precio_anterior"
                      name="precio_anterior"
                      placeholder="Precio anterior (opcional)"
                      className="common-input"
                      defaultValue={precio_anterior}
                    />
                  </div>
                  <div className="mb-24">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      {t("stock")}
                    </label>
                    <input
                      type="number"
                      id="existencias"
                      name="existencias"
                      placeholder="Cantidad"
                      min={1}
                      className="common-input"
                      defaultValue={existencias}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48"
                  >
                    <i className="ph-fill ph-floppy-disk text-lg" />
                    {t("save_all")}
                  </button>
                  {id_publicacion ? (
                    <div className="mt-32">
                      <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                        <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                          <i className="ph-fill ph-calendar" />
                        </span>
                        <span className="text-sm text-neutral-600">
                          {`${t("publication_date")} `}
                          <span className="fw-semibold">
                            {formatDate(
                              new Date(fecha_creacion),
                              "DD/MM/YYYY HH:mm:ss",
                            )}
                          </span>{" "}
                        </span>
                      </div>
                      <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-0">
                        <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                          <i className="ph-fill ph-clock-clockwise" />
                        </span>
                        <span className="text-sm text-neutral-600">
                          {`${t("last_updated")} `}
                          <span className="fw-semibold">
                            {formatDate(
                              new Date(fecha_modificacion),
                              "DD/MM/YYYY HH:mm:ss",
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-80">
            <div className="product-dContent border hover-border-main-600 transition-1 rounded-24">
              <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16 justify-content-end">
                <button
                  type="button"
                  className="btn btn-main rounded-16 flex-align gap-8"
                  data-bs-toggle="modal"
                  data-bs-target="#editProductDescriptionModal"
                >
                  <i className="ph-fill ph-pencil-simple text-lg" />
                  {t("edit")}
                </button>
              </div>
              <div className="product-dContent__box">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-description"
                    role="tabpanel"
                    aria-labelledby="pills-description-tab"
                    tabIndex={0}
                  >
                    <div className="mb-40">
                      <h6 className="mb-24">{t("product_description")}</h6>
                      {descripcion_producto.paragraphs.map(
                        (paragraph, index) => {
                          let item = null;
                          switch (paragraph.type) {
                            case "text":
                              item = (
                                <p
                                  key={index}
                                  className="text-gray-400"
                                  style={{ textAlign: "justify" }}
                                >
                                  {paragraph.text}
                                </p>
                              );
                              break;

                            case "list":
                              item = (
                                <ul
                                  key={index}
                                  className="list-inside mt-32 mb-32 ms-16"
                                >
                                  {paragraph.items?.map((item, pIndex) => (
                                    <li
                                      key={pIndex}
                                      className="text-gray-400 mb-4"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              );
                              break;

                            default:
                              break;
                          }
                          return item;
                        },
                      )}
                    </div>
                    {descripcion_producto.sections.map((section, secIndex) => {
                      return (
                        <div key={secIndex} className="mb-40">
                          <h6 className="mb-24">{section.title}</h6>
                          <ul className="mt-32">
                            {section.list.map((item, isecIndex) => {
                              return (
                                <li
                                  key={isecIndex}
                                  className="text-gray-400 mb-14 flex-align gap-14"
                                >
                                  <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                    <i
                                      className={
                                        icons.find(x => x.label == item.icon)
                                          ?.code
                                      }
                                    />
                                  </span>
                                  <span className="text-heading fw-medium">
                                    {"key" in item.content
                                      ? item.content.key
                                      : ""}
                                    <span className="text-gray-500">
                                      {" "}
                                      {"value" in item.content
                                        ? item.type == "key-value"
                                          ? `: ${item.content.value}`
                                          : item.content.value
                                        : ""}
                                    </span>
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal
        id="editProductDescriptionModal"
        title={t("product_description")}
        Content={<ProductDescription {...descripcion_producto} />}
        size="modal-xl"
        onSave={handleSaveProductDescription}
      />
    </section>
  );
};

const ProductDescription = ({
  paragraphs,
  sections,
}: NewProductType["descripcion_producto"]) => {
  return (
    <div className="product-dContent__box">
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-description"
          role="tabpanel"
          aria-labelledby="pills-description-tab"
          tabIndex={0}
        >
          <div className="mb-40">
            {paragraphs.map((paragraph, index) => {
              let item = null;
              switch (paragraph.type) {
                case "text":
                  item = (
                    <p
                      key={index}
                      className="text-gray-400"
                      style={{ textAlign: "justify" }}
                    >
                      {paragraph.text}
                    </p>
                  );
                  break;

                case "list":
                  item = (
                    <ul key={index} className="list-inside mt-32 mb-32 ms-16">
                      {paragraph.items?.map((item, pIndex) => (
                        <li key={pIndex} className="text-gray-400 mb-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                  break;

                default:
                  break;
              }
              return item;
            })}
          </div>
          {sections.map((section, secIndex) => {
            return (
              <div key={secIndex} className="mb-40">
                <h6 className="mb-24">{section.title}</h6>
                <ul className="mt-32">
                  {section.list.map((item, isecIndex) => {
                    return (
                      <li
                        key={isecIndex}
                        className="text-gray-400 mb-14 flex-align gap-14"
                      >
                        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                          <i
                            className={
                              icons.find(x => x.label == item.icon)?.code
                            }
                          />
                        </span>
                        <span className="text-heading fw-medium">
                          {"key" in item.content ? item.content.key : ""}
                          <span className="text-gray-500">
                            {" "}
                            {"value" in item.content
                              ? item.type == "key-value"
                                ? `: ${item.content.value}`
                                : item.content.value
                              : ""}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
