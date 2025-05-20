import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { icons } from "../constants/post.constants";
import { useTranslation } from "react-i18next";
import { formatDate, timeAgo } from "../utils/app.util";
import { reviewInterface } from "../interfaces/reviews.interface";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  createReview,
  fetchReviewsByListing,
} from "../store/review/reviewSlice";

const ProductDetailsTwo = () => {
  const { t } = useTranslation("ProductDetailsTwo");

  const dispatch = useAppDispatch();

  const [starsReview, setStarsReview] = useState<number>(0);

  const logged = useAppSelector(state => state.auth.logged);
  const listing = useAppSelector(state => state.listing.listing);
  const reviews = useAppSelector(state => state.review.reviews);

  const {
    id_publicacion,
    tipo_publicacion,
    titulo,
    estrellas,
    calificacion,
    sku,
    descripcion_general,
    simbolo_moneda,
    precio,
    precio_anterior,
    existencias,
    fecha_creacion,
    imagenes,
    descripcion_producto: descripcion_producto_text,
  } = listing;

  const images = imagenes ? JSON.parse(imagenes) : [];

  const descripcion_producto = descripcion_producto_text
    ? JSON.parse(descripcion_producto_text)
    : null;

  // increment & decrement
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : quantity);

  const [mainImage, setMainImage] = useState(images[0]);

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const handleNewReview = async (formData: FormData) => {
    if (id_publicacion) {
      const titulo = formData.get("titulo") as string;
      const contenido = formData.get("contenido") as string;

      const review: reviewInterface = {
        id_publicacion,
        nombre_usuario: "Pepito",
        titulo,
        contenido,
        estrellas: starsReview,
      };
      await dispatch(createReview({ review }));
      dispatch(fetchReviewsByListing({ id_publicacion }));
      setStarsReview(0);
    }
  };

  useEffect(() => {
    if (id_publicacion) {
      dispatch(fetchReviewsByListing({ id_publicacion }));
    }
  }, [dispatch, id_publicacion]);

  return (
    <section className="product-details py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9">
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="product-details__left">
                  <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                    <div className="">
                      <div className="product-details__thumb flex-center h-100">
                        <img src={mainImage} alt="Main Product" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-24">
                    <div className="product-details__images-slider">
                      <Slider {...settingsThumbs}>
                        {images.map((image: string, index: number) => (
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
              <div className="col-xl-6">
                <div className="product-details__content">
                  <h5 className="mb-12">{titulo}</h5>
                  <div className="flex-align flex-wrap gap-12">
                    <div className="flex-align gap-12 flex-wrap">
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
                      <span className="text-sm fw-medium text-neutral-600">
                        {estrellas} {t("star_rating")}
                      </span>
                      <span className="text-sm fw-medium text-gray-500">
                        ({calificacion})
                      </span>
                    </div>
                    <span className="text-sm fw-medium text-gray-500">|</span>
                    <span className="text-gray-900">
                      {" "}
                      <span className="text-gray-400">SKU:</span>
                      {sku}{" "}
                    </span>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <p className="text-gray-700">{descripcion_general}</p>
                  {tipo_publicacion === "sale" ? (
                    <div className="my-32 flex-align gap-16 flex-wrap">
                      <div className="flex-align gap-8">
                        <h6 className="mb-0">{`${simbolo_moneda} ${precio}`}</h6>
                      </div>
                      {precio_anterior && precio_anterior > 0 ? (
                        <div className="flex-align gap-8">
                          <span className="text-gray-700">
                            {t("regular_price")}
                          </span>
                          <h6 className="text-xl text-gray-400 mb-0 fw-medium">
                            {`${simbolo_moneda} ${precio_anterior}`}
                          </h6>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <Link
                    to="/https://www.whatsapp.com"
                    className="btn btn-black flex-center gap-8 rounded-8 py-16"
                  >
                    <i className="ph ph-chat-circle text-lg" />
                    {t("request_more_information")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="product-details__sidebar py-40 px-32 border border-gray-100 rounded-16">
              <div className="mb-32">
                <label
                  htmlFor="stock"
                  className="text-lg mb-8 text-heading fw-semibold d-block"
                >
                  {`${t("stock")}: ${existencias}`}
                </label>
                <span className="text-xl d-flex">
                  <i className="ph ph-location" />
                </span>
                <div className="d-flex rounded-4 overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    type="button"
                    className="quantity__minus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  >
                    <i className="ph ph-minus" />
                  </button>
                  <input
                    type="number"
                    className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-16"
                    id="stock"
                    value={quantity}
                    readOnly
                  />
                  <button
                    onClick={incrementQuantity}
                    type="button"
                    className="quantity__plus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  >
                    <i className="ph ph-plus" />
                  </button>
                </div>
              </div>
              {tipo_publicacion === "sale" ? (
                <div className="mb-32">
                  <div className="flex-between flex-wrap gap-8 border-bottom border-gray-100 pb-16 mb-16">
                    <span className="text-gray-500">{t("price")}</span>
                    <h6 className="text-lg mb-0">{`${simbolo_moneda} ${precio}`}</h6>
                  </div>
                </div>
              ) : null}
              <Link
                to="#"
                className="btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48"
              >
                <i className="ph ph-shopping-cart-simple text-lg" />
                {t("add_to_cart")}
              </Link>
              <Link
                to="#"
                className="btn btn-outline-main rounded-8 py-16 fw-normal mt-16 w-100"
              >
                {t("buy_now")}
              </Link>
              <div className="mt-32">
                <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                  <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                    <i className="ph-fill ph-calendar" />
                  </span>
                  <span className="text-sm text-neutral-600">
                    {t("publication_date")}{" "}
                    <span className="fw-semibold">
                      {fecha_creacion
                        ? formatDate(
                            new Date(fecha_creacion),
                            "DD/MM/YYYY HH:mm:ss",
                          )
                        : null}
                    </span>{" "}
                  </span>
                </div>
              </div>
              <div className="mt-32">
                <div className="px-32 py-16 rounded-8 border border-gray-100 flex-between gap-8">
                  <Link to="#" className="d-flex text-main-600 text-28">
                    <i className="ph-fill ph-chats-teardrop" />
                  </Link>
                  <span className="h-26 border border-gray-100" />
                  <div className="dropdown on-hover-item">
                    <button
                      className="d-flex text-main-600 text-28"
                      type="button"
                    >
                      <i className="ph-fill ph-share-network" />
                    </button>
                    <div className="on-hover-dropdown common-dropdown border-0 inset-inline-start-auto inset-inline-end-0">
                      <ul className="flex-align gap-16">
                        <li>
                          <Link
                            to="/https://www.facebook.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-facebook-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.twitter.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-twitter-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.linkedin.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-instagram-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/https://www.pinterest.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-linkedin-logo" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-80">
          <div className="product-dContent border rounded-24">
            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
              <ul
                className="nav common-tab nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                {descripcion_producto ? (
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-description-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-description"
                      type="button"
                      role="tab"
                      aria-controls="pills-description"
                      aria-selected="true"
                    >
                      {t("description")}
                    </button>
                  </li>
                ) : null}
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${descripcion_producto ? "" : "active"}`}
                    id="pills-reviews-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-reviews"
                    type="button"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected={descripcion_producto ? "true" : "false"}
                  >
                    {t("reviews")}
                  </button>
                </li>
              </ul>
            </div>
            <div className="product-dContent__box">
              <div className="tab-content" id="pills-tabContent">
                {descripcion_producto ? (
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
                        (
                          paragraph: {
                            type: string;
                            text?: string;
                            items?: string[];
                          },
                          index: number,
                        ) => {
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
                    {descripcion_producto.sections.map(
                      (
                        section: {
                          title: string;
                          list: Array<{
                            type: string;
                            icon: string;
                            content: { key?: string; value?: string };
                          }>;
                        },
                        secIndex: number,
                      ) => {
                        return (
                          <div key={secIndex} className="mb-40">
                            <h6 className="mb-24">{section.title}</h6>
                            <ul className="mt-32">
                              {section.list.map(
                                (
                                  item: {
                                    type: string;
                                    icon: string;
                                    content: { key?: string; value?: string };
                                  },
                                  isecIndex: number,
                                ) => {
                                  return (
                                    <li
                                      key={isecIndex}
                                      className="text-gray-400 mb-14 flex-align gap-14"
                                    >
                                      <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                                        <i
                                          className={
                                            icons.find(
                                              x => x.label == item.icon,
                                            )?.code
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
                                },
                              )}
                            </ul>
                          </div>
                        );
                      },
                    )}
                  </div>
                ) : null}
                <div
                  className={`tab-pane fade ${descripcion_producto ? "" : "show active"}`}
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                  tabIndex={0}
                >
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div
                        style={{
                          height:
                            reviews.length == 0
                              ? logged
                                ? "600px"
                                : "300px"
                              : "1300px",
                          maxHeight: "1500px",
                        }}
                      >
                        {reviews.length > 0 ? (
                          <div
                            className={`${logged ? "h-50" : "h-100"} d-inline-block overflow-auto`}
                          >
                            <h6 className="mb-24">{t("comments")}</h6>
                            {reviews.map((comment, index) => (
                              <Comment key={index} {...comment} />
                            ))}
                          </div>
                        ) : null}
                        {logged ? (
                          <div>
                            <div className="mt-56 pt-44 border-top border-gray-100">
                              <div className="">
                                <h6 className="mb-24">{t("write_a_review")}</h6>
                                <span className="text-heading mb-8 flex-align justify-content-center">
                                  {t("what_is_it_like_to_product")}
                                </span>
                                <div className="flex-align gap-8 justify-content-center">
                                  <span
                                    className={`text-15 fw-medium ${starsReview >= 1 ? "text-warning-600" : "text-gray-900"} d-flex hover-text-main-600`}
                                    onClick={() => {
                                      if (starsReview == 1) setStarsReview(0);
                                      else setStarsReview(1);
                                    }}
                                  >
                                    <i className="ph-fill ph-star" />
                                  </span>
                                  <span
                                    className={`text-15 fw-medium ${starsReview >= 2 ? "text-warning-600" : "text-gray-900"} d-flex hover-text-main-600`}
                                    onClick={() => {
                                      if (starsReview == 2) setStarsReview(0);
                                      else setStarsReview(2);
                                    }}
                                  >
                                    <i className="ph-fill ph-star" />
                                  </span>
                                  <span
                                    className={`text-15 fw-medium ${starsReview >= 3 ? "text-warning-600" : "text-gray-900"} d-flex hover-text-main-600`}
                                    onClick={() => {
                                      if (starsReview == 3) setStarsReview(0);
                                      else setStarsReview(3);
                                    }}
                                  >
                                    <i className="ph-fill ph-star" />
                                  </span>
                                  <span
                                    className={`text-15 fw-medium ${starsReview >= 4 ? "text-warning-600" : "text-gray-900"} d-flex hover-text-main-600`}
                                    onClick={() => {
                                      if (starsReview == 4) setStarsReview(0);
                                      else setStarsReview(4);
                                    }}
                                  >
                                    <i className="ph-fill ph-star" />
                                  </span>
                                  <span
                                    className={`text-15 fw-medium ${starsReview == 5 ? "text-warning-600" : "text-gray-900"} d-flex hover-text-main-600`}
                                    onClick={() => {
                                      if (starsReview == 5) setStarsReview(0);
                                      else setStarsReview(5);
                                    }}
                                  >
                                    <i className="ph-fill ph-star" />
                                  </span>
                                </div>
                              </div>
                              <div className="mt-32">
                                <form action={handleNewReview}>
                                  <div className="mb-32">
                                    <label
                                      htmlFor="titulo"
                                      className="text-neutral-600 mb-8"
                                    >
                                      {t("review_title")}
                                    </label>
                                    <input
                                      type="text"
                                      className="common-input rounded-8"
                                      id="titulo"
                                      name="titulo"
                                      placeholder="Great Products"
                                    />
                                  </div>
                                  <div className="mb-32">
                                    <label
                                      htmlFor="contenido"
                                      className="text-neutral-600 mb-8"
                                    >
                                      {t("review_content")}
                                    </label>
                                    <textarea
                                      className="common-input rounded-8"
                                      id="contenido"
                                      name="contenido"
                                      defaultValue={""}
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-main rounded-pill mt-48"
                                  >
                                    {t("submit_review")}
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ms-xxl-5">
                        <h6 className="mb-24">{t("customers_feedback")}</h6>
                        <div className="d-flex flex-wrap gap-44">
                          <div className="border border-gray-100 rounded-8 px-40 py-52 flex-center flex-column flex-shrink-0 text-center">
                            <h2 className="mb-6 text-main-600">4.8</h2>
                            <div className="flex-center gap-8">
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                              <span className="text-15 fw-medium text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span>
                            </div>
                            <span className="mt-16 text-gray-500">
                              {t("average_product_rating")}
                            </span>
                          </div>
                          <div className="border border-gray-100 rounded-8 px-24 py-40 flex-grow-1">
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                5
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={70}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "70%" }}
                                />
                              </div>
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
                              <span className="text-gray-900 flex-shrink-0">
                                124
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                4
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "50%" }}
                                />
                              </div>
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
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                52
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                3
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={35}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "35%" }}
                                />
                              </div>
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
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                12
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-20">
                              <span className="text-gray-900 flex-shrink-0">
                                2
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "20%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                5
                              </span>
                            </div>
                            <div className="flex-align gap-8 mb-0">
                              <span className="text-gray-900 flex-shrink-0">
                                1
                              </span>
                              <div
                                className="progress w-100 bg-gray-100 rounded-pill h-8"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={5}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{ width: "5%" }}
                                />
                              </div>
                              <div className="flex-align gap-4">
                                <span className="text-xs fw-medium text-warning-600 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                                <span className="text-xs fw-medium text-gray-400 d-flex">
                                  <i className="ph-fill ph-star" />
                                </span>
                              </div>
                              <span className="text-gray-900 flex-shrink-0">
                                2
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Comment = ({
  id_comentario,
  nombre_usuario,
  titulo,
  contenido,
  estrellas = 0,
  fecha_creacion,
}: reviewInterface) => {
  const { t } = useTranslation("ProductDetailsTwo");

  const handleLike = (id_comentario: number) => {
    console.log("handleLike", id_comentario);
  };

  return (
    <div className="d-flex align-items-start gap-24 pt-44 border-top border-gray-100 mt-44">
      <img
        src="assets/images/thumbs/comment-img1.png"
        alt=""
        className="w-52 h-52 object-fit-cover rounded-circle flex-shrink-0"
      />
      <div className="flex-grow-1">
        <div className="flex-between align-items-start gap-8 ">
          <div className="">
            <h6 className="mb-12 text-md">{`${nombre_usuario}`}</h6>
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
          </div>
          <span className="text-gray-800 text-xs">{`${timeAgo(fecha_creacion ? fecha_creacion : new Date().toString())}`}</span>
        </div>
        <h6 className="mb-14 text-md mt-24">{titulo}</h6>
        <p className="text-gray-700">{contenido}</p>
        <div className="flex-align gap-20 mt-44">
          <button
            className="flex-align gap-12 text-gray-700 hover-text-main-600"
            onClick={() => {
              if (id_comentario) handleLike(id_comentario);
            }}
          >
            <i className="ph-bold ph-thumbs-up" />
            {t("like")}
          </button>
          <Link
            to="#comment-form"
            className="flex-align gap-12 text-gray-700 hover-text-main-600"
          >
            <i className="ph-bold ph-arrow-bend-up-left" />
            {t("replay")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTwo;
