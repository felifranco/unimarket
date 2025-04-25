import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import {
  publicationTypes,
  currenciesTypes,
  icons,
} from "../constants/post.constants";
import {
  PublicationType,
  CurrencyType,
  NewProductType,
} from "../interfaces/post.interfaces";
import new_product from "../mocks/new_product.json";
import Modal from "./common/Modal";

const Post = () => {
  const { t } = useTranslation("Post");

  const {
    title,
    overview,
    publication_type,
    currency,
    price,
    old_price,
    stock,
    images,
    product_description,
  } = new_product;

  const [mainImage, setMainImage] = useState(images[0]);

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

  const handleSave = () => {
    console.log("Save button clicked");
  };

  return (
    <section className="product-details py-80">
      <div className="container container-lg">
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
                    id="title"
                    name="title"
                    placeholder="Title"
                    className="common-input"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.8rem",
                      minWidth: "100%",
                    }}
                    rows={2}
                    defaultValue={title}
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
                    defaultValue={"EB4DRP"}
                  />
                </div>
                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    {t("overview")}
                  </label>
                  <textarea
                    id="overview"
                    name="overview"
                    placeholder="Overview"
                    className="common-input"
                    style={{ minWidth: "100%" }}
                    rows={7}
                    defaultValue={overview}
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
                    id="type"
                    name="type"
                    className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                    defaultValue={publication_type}
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
                    {t("currency")}
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                    defaultValue={currency}
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
                    id="price"
                    name="price"
                    placeholder="Precio"
                    className="common-input"
                    defaultValue={price}
                  />
                </div>
                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    {t("old_price")}
                  </label>
                  <input
                    type="number"
                    id="old_price"
                    name="old_price"
                    placeholder="Precio anterior (opcional)"
                    className="common-input"
                    defaultValue={old_price}
                  />
                </div>
                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    {t("stock")}
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Cantidad"
                    min={1}
                    className="common-input"
                    defaultValue={stock}
                  />
                </div>
                <Link
                  to="#"
                  className="btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48"
                  onClick={handleSave}
                >
                  <i className="ph-fill ph-floppy-disk text-lg" />
                  {t("save_all")}
                </Link>
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
                    {product_description.paragraphs.map((paragraph, index) => {
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
                  {product_description.sections.map((section, secIndex) => {
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
      </div>
      <Modal
        id="editProductDescriptionModal"
        title={t("product_description")}
        Content={<ProductDescription {...product_description} />}
        size="modal-xl"
        onSave={handleSaveProductDescription}
      />
    </section>
  );
};

const ProductDescription = ({
  paragraphs,
  sections,
}: NewProductType["product_description"]) => {
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
