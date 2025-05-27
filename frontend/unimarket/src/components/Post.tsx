import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import {
  //badgeTypes,
  currenciesTypes,
  icons,
  publicationTypes,
} from "../constants/post.constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { listingInterface } from "../interfaces/listings.interfaces";
import {
  //BadgeType,
  CurrencyType,
  NewProductType,
  PublicationType,
} from "../interfaces/post.interfaces";
//import new_product from "../mocks/new_product.json";
import {
  createListing,
  patchListing,
  fetchMyListings,
  clearListing,
  emptyListing,
} from "../store/listing/listingSlice";
import { moveListingImages } from "../store/image/imageSlice";
import Modal from "./common/Modal";
import { formatDate } from "../utils/app.util";
import UploadImage from "./common/UploadImage";

const default_image = "assets/images/thumbs/product-details-two-thumb1.png";

const IMAGES_COUNT = 5;

let images = Array(IMAGES_COUNT).fill(default_image);

const Post = () => {
  const { t } = useTranslation("Post");

  const location = useLocation();
  const isNewPost = location.pathname === "/new-post";

  const dispatch = useAppDispatch();

  const uuid = useAppSelector(state => state.auth.uuid);
  const listing = useAppSelector(state => state.listing.listing);

  //const { descripcion_producto: descripcion_producto_empty } = new_product;

  //const descripcion_producto = JSON.parse(descripcion_producto_empty);
  //console.log("descripcion_producto", descripcion_producto_empty, descripcion_producto);

  const [productData, setProductData] =
    useState<listingInterface>(emptyListing);
  const [mainIndexImage, setMainIndexImage] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [type, setType] = useState("sale");

  // Estados controlados para los inputs del formulario
  const [tituloInput, setTituloInput] = useState(listing.titulo || "");
  const [skuInput, setSkuInput] = useState(listing.sku || "");
  const [descripcionGeneralInput, setDescripcionGeneralInput] = useState(
    listing.descripcion_general || "",
  );
  const [ubicacionInput, setUbicacionInput] = useState(listing.ubicacion || "");
  const [tipoPublicacionInput, setTipoPublicacionInput] = useState(
    listing.tipo_publicacion || "",
  );
  const [simboloMonedaInput, setSimboloMonedaInput] = useState(
    listing.simbolo_moneda || "",
  );
  const [precioInput, setPrecioInput] = useState(
    listing.precio ? +listing.precio : 0,
  );
  const [precioAnteriorInput, setPrecioAnteriorInput] = useState(
    listing.precio_anterior ? +listing.precio_anterior : 0,
  );
  const [existenciasInput, setExistenciasInput] = useState(
    listing.existencias ? +listing.existencias : 0,
  );
  const [product_description, setProductDescription] = useState<
    NewProductType["product_description"]
  >(
    listing.descripcion_producto
      ? JSON.parse(listing.descripcion_producto)
      : {
          paragraphs: [],
          sections: [],
        },
  );
  /* const [product_description, setProductDescription] = useState<
    NewProductType["product_description"]
  >({
    paragraphs: [],
    sections: [],
  }); */

  const {
    id_publicacion,
    publicacion_uuid,
    titulo,
    descripcion_general,
    sku,
    ubicacion,
    tipo_publicacion,
    simbolo_moneda,
    precio,
    precio_anterior,
    existencias,
    //insignia,
    imagenes,
    imagen_portada,
    fecha_creacion,
    fecha_modificacion,
  } = productData;

  /* const descripcion_producto_object = JSON.parse(
    descripcion_producto ? descripcion_producto : descripcion_producto_empty,
  ); */

  if (id_publicacion && id_publicacion > 0) {
    const defaultImages = images.filter(img => img == default_image).length;
    const imagenesObj = imagenes ? JSON.parse(imagenes) : [];

    if (defaultImages == 5) {
      images = imagenesObj;
    }

    if (images.length < IMAGES_COUNT) {
      images = [
        ...images,
        ...Array(IMAGES_COUNT - images.length).fill(default_image),
      ];
    }
  }

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  let cleanUpload: (() => void) | null = null;

  const setCleanUpload = (fn: () => void) => {
    cleanUpload = fn;
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
    const imagenes = JSON.stringify(
      images.filter(img => img !== default_image),
    );
    const imagen_portada = images[mainIndexImage];
    //const insignia = formData.get("insignia") as string;

    const data = {
      titulo,
      sku,
      descripcion_general,
      ubicacion,
      tipo_publicacion,
      simbolo_moneda,
      precio: +precio,
      precio_anterior: +precio_anterior,
      existencias: +existencias,
      imagenes,
      imagen_portada,
      //insignia,
      descripcion_producto: JSON.stringify(product_description),
    };

    if (id_publicacion && id_publicacion > 0) {
      await dispatch(
        patchListing({
          listing: {
            id_publicacion,
            ...data,
          },
        }),
      );
      dispatch(fetchMyListings());
    } else {
      dispatch(
        createListing({
          listing: {
            ...data,
          },
        }),
      );
    }
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setType(selectedType);
  };

  useEffect(() => {
    if (url) {
      images[mainIndexImage] = url;
      setUrl("");
    }
  }, [url, mainIndexImage]);

  useEffect(() => {
    if (listing.id_publicacion && listing.id_publicacion > 0) {
      setProductData(listing);
    }
  }, [listing, id_publicacion]);

  useEffect(() => {
    if (uuid && publicacion_uuid && imagenes?.includes("new")) {
      dispatch(
        moveListingImages({
          uuid,
          listingUuid: publicacion_uuid,
        }),
      )
        .unwrap()
        .then(() => {
          const nuevasImagenes = imagenes.replace(/new/g, publicacion_uuid);
          const nuevaImagenPortada = imagen_portada?.replace(
            /new/g,
            publicacion_uuid,
          );

          dispatch(
            patchListing({
              listing: {
                id_publicacion,
                imagenes: nuevasImagenes,
                imagen_portada: nuevaImagenPortada,
              },
            }),
          );
        })
        .catch((error: { message: string }) => {
          console.error("Error al mover las imágenes:", error.message);
        });
    }
  }, [
    dispatch,
    uuid,
    id_publicacion,
    publicacion_uuid,
    imagenes,
    imagen_portada,
  ]);

  useEffect(() => {
    if (tipo_publicacion) {
      setType(tipo_publicacion);
    }
  }, [tipo_publicacion]);

  // Sincronizar los estados controlados cuando cambia productData
  useEffect(() => {
    setTituloInput(titulo || "");
    setSkuInput(sku || "");
    setDescripcionGeneralInput(descripcion_general || "");
    setUbicacionInput(ubicacion || "");
    setTipoPublicacionInput(tipo_publicacion || "");
    setSimboloMonedaInput(simbolo_moneda || "");
    setPrecioInput(precio ? +precio : 0);
    setPrecioAnteriorInput(precio_anterior ? +precio_anterior : 0);
    setExistenciasInput(existencias ? +existencias : 0);
  }, [
    titulo,
    sku,
    descripcion_general,
    ubicacion,
    tipo_publicacion,
    simbolo_moneda,
    precio,
    precio_anterior,
    existencias,
  ]);

  useEffect(() => {
    if (isNewPost) {
      dispatch(clearListing());
      setProductData(emptyListing);
      images = Array(IMAGES_COUNT).fill(default_image);
    }
    return () => {};
  }, [dispatch, isNewPost]);

  return (
    <section className="product-details py-80">
      <div className="container container-lg">
        <form action={handleSave}>
          <div className="row gy-4">
            <div className="col-xl-4">
              <div className="product-details__left">
                <div className="product-details__thumb-slider border border-gray-100 hover-border-main-600 transition-1 rounded-16 position-relative">
                  <div className="">
                    <div className="product-details__thumb flex-center h-100 position-relative">
                      <img
                        src={images[mainIndexImage]}
                        alt="Main Product"
                        className="w-100 d-block"
                      />
                    </div>
                    <div className="d-flex justify-content-end mt-2 me-3">
                      <button
                        type="button"
                        className="btn text-main-600 hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 rounded-16 flex-align gap-8 px-3 py-2 btn-edit-image"
                        data-bs-toggle="modal"
                        data-bs-target="#uploadImageModal"
                        style={{ minWidth: 0 }}
                      >
                        <i className="ph-fill ph-upload-simple text-lg me-1" />
                        <span className="d-none d-md-inline">
                          {t("upload_image")}
                        </span>
                      </button>
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
                          onClick={() => setMainIndexImage(index)}
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
                      value={tituloInput}
                      onChange={e => setTituloInput(e.target.value)}
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
                      value={skuInput}
                      onChange={e => setSkuInput(e.target.value)}
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
                      value={descripcionGeneralInput}
                      onChange={e => setDescripcionGeneralInput(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-24">
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
                  </div> */}
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
                      value={ubicacionInput}
                      onChange={e => setUbicacionInput(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-24">
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
                  </div> */}
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
                      value={tipoPublicacionInput}
                      onChange={e => {
                        setTipoPublicacionInput(e.target.value);
                        handleChangeType(e);
                      }}
                    >
                      {publicationTypes.map((type: PublicationType) => (
                        <option key={type.code} value={type.code}>
                          {t(`publication_types.${type.code}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {type === "sale" ? (
                    <div className="mb-24">
                      <label className="text-neutral-900 text-lg mb-8 fw-medium">
                        {t("currency_symbol")}
                      </label>
                      <select
                        id="simbolo_moneda"
                        name="simbolo_moneda"
                        className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                        value={simboloMonedaInput}
                        onChange={e => setSimboloMonedaInput(e.target.value)}
                      >
                        {currenciesTypes.map((type: CurrencyType) => (
                          <option key={type.code} value={type.code}>
                            {`${t(`currency_types.${type.code}`)} (${type.symbol})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  {type === "sale" ? (
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
                        value={precioInput}
                        onChange={e => setPrecioInput(Number(e.target.value))}
                      />
                    </div>
                  ) : null}
                  {type === "sale" ? (
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
                        value={precioAnteriorInput}
                        onChange={e =>
                          setPrecioAnteriorInput(Number(e.target.value))
                        }
                      />
                    </div>
                  ) : null}
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
                      value={existenciasInput}
                      onChange={e =>
                        setExistenciasInput(Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="d-flex flex-column mb-3">
                    <button
                      type="submit"
                      className="btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48"
                    >
                      <i className="ph-fill ph-floppy-disk text-lg" />
                      {t("save_all")}
                    </button>
                  </div>
                  {id_publicacion && id_publicacion > 0 ? (
                    <div className="mt-32">
                      <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                        <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                          <i className="ph-fill ph-calendar" />
                        </span>
                        <span className="text-sm text-neutral-600">
                          {`${t("publication_date")} `}
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
                      <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-0">
                        <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                          <i className="ph-fill ph-clock-clockwise" />
                        </span>
                        <span className="text-sm text-neutral-600">
                          {`${t("last_updated")} `}
                          <span className="fw-semibold">
                            {fecha_modificacion
                              ? formatDate(
                                  new Date(fecha_modificacion),
                                  "DD/MM/YYYY HH:mm:ss",
                                )
                              : null}
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
                      {product_description.paragraphs.map(
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
                    {product_description.sections.map(
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal
        id="editProductDescriptionModal"
        title={t("product_description")}
        Content={
          <ProductDescription
            paragraphs={product_description.paragraphs}
            sections={product_description.sections}
            onSave={setProductDescription}
          />
        }
        size="modal-xl"
      />
      <Modal
        id="uploadImageModal"
        title={t("upload_image")}
        Content={
          <UploadImage
            type={publicacion_uuid ? "listing" : "post"}
            setUrl={setUrl}
            setCleanUpload={setCleanUpload}
          />
        }
        size="modal-lg"
        onCloseModal={() => {
          if (cleanUpload) cleanUpload();
        }}
      />
    </section>
  );
};

// Cambia la definición para aceptar la función como prop
interface ProductDescriptionProps {
  paragraphs: NewProductType["product_description"]["paragraphs"];
  sections: NewProductType["product_description"]["sections"];
  onSave: (desc: NewProductType["product_description"]) => void;
}

const ProductDescription = ({
  paragraphs,
  sections,
  onSave,
}: ProductDescriptionProps) => {
  const [description, setDescription] = useState({
    paragraphs: paragraphs || [],
    sections: sections || [],
  });

  // Agregar un nuevo párrafo
  const handleAddParagraph = () => {
    setDescription(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, { type: "text", text: "Nuevo párrafo" }],
    }));
  };

  const handleAddList = () => {
    setDescription(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, { type: "list", items: ["Nuevo ítem"] }],
    }));
  };

  // Eliminar un párrafo
  const handleDeleteParagraph = (index: number) => {
    setDescription(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  // Agregar una nueva sección
  const handleAddSection = () => {
    setDescription(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "Nueva sección",
          list: [],
        },
      ],
    }));
  };

  // Eliminar una sección
  const handleDeleteSection = (index: number) => {
    setDescription(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  // Editar texto de un párrafo
  const handleEditParagraphText = (index: number, value: string) => {
    setDescription(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) =>
        i === index ? { ...p, text: value } : p,
      ),
    }));
  };

  // Editar items de un párrafo tipo lista
  const handleEditParagraphListItem = (
    pIndex: number,
    itemIndex: number,
    value: string,
  ) => {
    setDescription(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) =>
        i === pIndex && p.type === "list"
          ? {
              ...p,
              items: p.items?.map((item, idx) =>
                idx === itemIndex ? value : item,
              ),
            }
          : p,
      ),
    }));
  };

  // Agregar item a lista de párrafo
  const handleAddParagraphListItem = (pIndex: number) => {
    setDescription(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) =>
        i === pIndex && p.type === "list"
          ? { ...p, items: [...(p.items || []), "Nuevo ítem"] }
          : p,
      ),
    }));
  };

  // Eliminar item de lista de párrafo
  const handleDeleteParagraphListItem = (pIndex: number, itemIndex: number) => {
    setDescription(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) =>
        i === pIndex && p.type === "list"
          ? { ...p, items: p.items?.filter((_, idx) => idx !== itemIndex) }
          : p,
      ),
    }));
  };

  // Editar título de sección
  const handleEditSectionTitle = (secIndex: number, value: string) => {
    setDescription(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === secIndex ? { ...s, title: value } : s,
      ),
    }));
  };

  // Editar contenido de un item de sección
  const handleEditSectionListItem = (
    secIndex: number,
    itemIndex: number,
    keyOrValue: "key" | "value",
    value: string,
  ) => {
    setDescription(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === secIndex
          ? {
              ...s,
              list: s.list.map((item, idx) =>
                idx === itemIndex
                  ? {
                      ...item,
                      content: {
                        ...item.content,
                        [keyOrValue]: value,
                      },
                    }
                  : item,
              ),
            }
          : s,
      ),
    }));
  };

  // Agregar item a sección
  const handleAddSectionListItem = (secIndex: number) => {
    setDescription(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === secIndex
          ? {
              ...s,
              list: [
                ...s.list,
                {
                  type: "key-value",
                  icon: "check",
                  content: { key: "Nuevo key", value: "Nuevo value" },
                },
              ],
            }
          : s,
      ),
    }));
  };

  // Eliminar item de sección
  const handleDeleteSectionListItem = (secIndex: number, itemIndex: number) => {
    setDescription(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === secIndex
          ? { ...s, list: s.list.filter((_, idx) => idx !== itemIndex) }
          : s,
      ),
    }));
  };

  onSave(description);

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
          <div className="mb-40 border hover-border-main-600 transition-1 p-10">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>Parrafos y listas</h6>
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-success rounded-pill flex-align d-inline-flex gap-8 px-48 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  title="Más opciones"
                >
                  <i className="ph-fill ph-plus-circle text-lg" />
                  Agregar
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    className="dropdown-item"
                    onClick={handleAddParagraph}
                  >
                    Párrafo
                  </button>
                  <button className="dropdown-item" onClick={handleAddList}>
                    Lista
                  </button>
                </div>
              </div>
            </div>
            {description.paragraphs.map((paragraph, index) => {
              let item = null;
              switch (paragraph.type) {
                case "text":
                  item = (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-2 gap-2"
                    >
                      <input
                        type="text"
                        className="form-control flex-grow-1"
                        value={paragraph.text}
                        onChange={e =>
                          handleEditParagraphText(index, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="group border border-white px-8 py-8 rounded-circle text-danger text-sm hover-bg-danger-600 hover-text-white hover-border-danger-600 transition-2 flex-center gap-8"
                        onClick={() => handleDeleteParagraph(index)}
                      >
                        <i className="ph-fill ph-trash-simple text-lg" />
                      </button>
                    </div>
                  );
                  break;
                case "list":
                  item = (
                    <div key={index} className="mb-2">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-semibold">Lista</span>
                        <button
                          type="button"
                          className="group border border-white px-8 py-8 rounded-circle text-danger text-sm hover-bg-danger-600 hover-text-white hover-border-danger-600 transition-2 flex-center gap-8"
                          onClick={() => handleDeleteParagraph(index)}
                        >
                          <i className="ph-fill ph-trash-simple text-lg" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="bg-success-200 text-success-600 hover-bg-success-600 hover-text-white flex-center rounded-pill gap-5 px-10 mb-8"
                        onClick={() => handleAddParagraphListItem(index)}
                      >
                        <i className="ph-fill ph-plus-circle text-lg" />
                        Agregar elemento
                      </button>
                      <ul className="list-inside mt-2 mb-2 ms-3">
                        {paragraph.items?.map((item, pIndex) => (
                          <li
                            key={pIndex}
                            className="text-gray-400 mb-2 d-flex align-items-center gap-2"
                          >
                            <input
                              type="text"
                              className="form-control flex-grow-1"
                              value={item}
                              onChange={e =>
                                handleEditParagraphListItem(
                                  index,
                                  pIndex,
                                  e.target.value,
                                )
                              }
                            />
                            <button
                              type="button"
                              className="group border border-white px-8 py-8 rounded-circle text-danger text-sm hover-bg-danger-600 hover-text-white hover-border-danger-600 transition-2 flex-center gap-8"
                              onClick={() =>
                                handleDeleteParagraphListItem(index, pIndex)
                              }
                            >
                              <i className="ph-fill ph-trash-simple text-lg" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                  break;
                default:
                  break;
              }
              return item;
            })}
          </div>
          <div className="mb-40 border hover-border-main-600 transition-1 p-10">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>Secciones</h6>
              <button
                type="button"
                className="btn btn-sm btn-success rounded-pill flex-align d-inline-flex gap-8 px-48"
                onClick={handleAddSection}
              >
                <i className="ph-fill ph-plus-circle text-lg" />
                Agregar sección
              </button>
            </div>
            {description.sections.map((section, secIndex) => (
              <div
                key={secIndex}
                className="mb-40 rounded-3 p-2 position-relative"
              >
                <button
                  type="button"
                  className="group border border-white px-8 py-8 rounded-circle text-danger text-sm hover-bg-danger-600 hover-text-white hover-border-danger-600 transition-2 flex-center gap-8 position-absolute end-0 top-0 m-2"
                  onClick={() => handleDeleteSection(secIndex)}
                >
                  <i className="ph-fill ph-trash-simple text-lg" />
                </button>
                <input
                  type="text"
                  className="form-control mb-2 fw-semibold"
                  value={section.title}
                  onChange={e =>
                    handleEditSectionTitle(secIndex, e.target.value)
                  }
                />
                <div className="d-flex align-items-center gap-2 mb-2">
                  <button
                    type="button"
                    className="bg-success-200 text-success-600 hover-bg-success-600 hover-text-white flex-center rounded-pill gap-5 px-10 my-8"
                    onClick={() => handleAddSectionListItem(secIndex)}
                  >
                    <i className="ph-fill ph-plus-circle text-lg" />
                    Agregar elemento
                  </button>
                </div>
                <ul className="mt-2">
                  {section.list.map((item, isecIndex) => (
                    <li
                      key={isecIndex}
                      className="text-gray-400 mb-14 flex-align gap-14 align-items-center"
                    >
                      <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                        <i
                          className={
                            icons.find(x => x.label == item.icon)?.code
                          }
                        />
                      </span>
                      <input
                        type="text"
                        className="form-control d-inline-block w-auto me-2"
                        style={{ maxWidth: 180, display: "inline-block" }}
                        value={"key" in item.content ? item.content.key : ""}
                        onChange={e =>
                          handleEditSectionListItem(
                            secIndex,
                            isecIndex,
                            "key",
                            e.target.value,
                          )
                        }
                        placeholder="Key"
                      />
                      <input
                        type="text"
                        className="form-control d-inline-block w-auto"
                        style={{ maxWidth: 180, display: "inline-block" }}
                        value={
                          "value" in item.content ? item.content.value : ""
                        }
                        onChange={e =>
                          handleEditSectionListItem(
                            secIndex,
                            isecIndex,
                            "value",
                            e.target.value,
                          )
                        }
                        placeholder="Value"
                      />
                      <button
                        type="button"
                        className="group border border-white px-8 py-8 rounded-circle text-danger text-sm hover-bg-danger-600 hover-text-white hover-border-danger-600 transition-2 flex-center gap-8"
                        onClick={() =>
                          handleDeleteSectionListItem(secIndex, isecIndex)
                        }
                      >
                        <i className="ph-fill ph-trash-simple text-lg" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
