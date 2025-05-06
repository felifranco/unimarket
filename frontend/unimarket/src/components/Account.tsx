import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountProductCard from "./AccountProductCard";
import SellingProductCard from "./SellingProductCard";
import { categories } from "../mocks/categories.json";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMyListings } from "../store/listing/listingSlice";

const Account = () => {
  const { t } = useTranslation("Account");

  const dispatch = useAppDispatch();

  const nombre_completo = useAppSelector(state => state.auth.nombre_completo);

  const myListings = useAppSelector(state => state.listing.myListings);

  const followers = 480589;
  const stars = 4.8;
  const votes = "12k";

  const [grid, setGrid] = useState(false);

  const [active, setActive] = useState(false);
  const sidebarController = () => {
    setActive(!active);
  };

  const handleEdit = () => {};

  useEffect(() => {
    dispatch(fetchMyListings());
  }, [dispatch]);

  return (
    <section className="vendor-two-details py-80">
      <div className={`side-overlay ${active && "show"}`}></div>
      <div className="container container-lg">
        <div className="vendor-two-details-wrapper d-flex flex-wrap align-items-start gap-24">
          {/* Shop Sidebar Start */}
          <div className={`shop-sidebar ${active && "active"}`}>
            <button
              onClick={sidebarController}
              type="button"
              className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 text-white border-main-600"
            >
              <i className="ph ph-x" />
            </button>
            <div className="d-flex flex-column gap-12 px-lg-0 px-3 py-lg-0 py-4">
              <div className="bg-neutral-600 rounded-8 p-24">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="w-80 h-80 flex-center bg-white rounded-8 flex-shrink-0">
                    <img
                      src="assets/images/thumbs/vendors-two-icon1.png"
                      alt=""
                    />
                  </span>
                  <div className="d-flex flex-column gap-24">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-uppercase group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8 w-100"
                    >
                      {t("edit")}
                      <span className="text-xl d-flex text-main-two-600 group-item-white transition-2">
                        {" "}
                        <i className="ph-fill ph-pencil-simple" />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="mt-32">
                  <h6 className="text-white fw-semibold mb-12">
                    <Link to="/vendor-details" className="">
                      {nombre_completo}
                    </Link>
                  </h6>
                  <span className="text-xs text-white mb-12">
                    {followers} {t("followers")}
                  </span>
                  <div className="flex-align gap-6">
                    <div className="flex-align gap-8">
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
                    <span className="text-xs fw-medium text-white">
                      {stars}
                    </span>
                    <span className="text-xs fw-medium text-white">
                      ({votes})
                    </span>
                  </div>
                </div>
                <div className="mt-32 d-flex flex-column gap-8">
                  <Link
                    to="#"
                    className="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"
                  >
                    {t("about_store")}
                  </Link>
                  <Link
                    to="#"
                    className="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"
                  >
                    {t("contact_info")}
                  </Link>
                </div>
              </div>
              <div className="border border-gray-50 rounded-8 p-24">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  {t("product_category")}
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  {categories.map((category, index) => (
                    <li key={index} className="mb-24">
                      <Link
                        to="#"
                        className="text-gray-900 hover-text-main-600"
                      >
                        {`${category.name}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                  {t("best_selling_products")}
                </h6>
                <div className="d-flex flex-column gap-24">
                  {myListings.map((product, index) => (
                    <SellingProductCard key={index} {...product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Shop Sidebar End */}
          <div className="vendor-two-details__contents">
            {/* Inner Banner Start */}
            <div
              className="inner-banner-two bg-img rounded-16 overflow-hidden"
              style={{
                backgroundImage: `url('assets/images/thumbs/inner-banner-two-bg.png')`,
              }}
            >
              <div className="row">
                <div className="col-6 d-xl-block d-none" />
                <div className="col-xl-6 d-xl-flex">
                  <div className="text-center py-32">
                    <h6 className="text-white">Daily Offer</h6>
                    <h3 className="my-32 text-white">SALE 48% OFF</h3>
                    <Link
                      to="/shop"
                      className="btn btn-main d-inline-flex align-items-center rounded-8 gap-8"
                    >
                      Shop Now
                      <span className="icon text-xl d-flex">
                        <i className="ph ph-shopping-cart" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Inner Banner End */}
            {/* Search Filter Start */}
            <div className="d-flex align-items-center justify-content-between flex-wrap mt-40 mb-32 gap-16">
              <form action="#" className="input-group w-100 max-w-418">
                <input
                  type="text"
                  className="form-control common-input rounded-start-3"
                  placeholder={`${t("search")}...`}
                />
                <button
                  type="submit"
                  className="input-group-text border-0 bg-main-two-600 rounded-end-3 text-white text-2xl hover-bg-main-two-700 px-24"
                >
                  <i className="ph ph-magnifying-glass" />
                </button>
              </form>
              <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-16 flex-grow-1">
                <span className="text-gray-900">
                  {t("showing")} 1-20 {t("of")} 85 {t("results")}
                </span>
                <div className="d-flex align-items-center gap-8 d-sm-flex d-none">
                  <button
                    onClick={() => setGrid(true)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid === true && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      grid === false && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className="ph ph-squares-four" />
                  </button>
                </div>
                <div className="flex-align gap-8">
                  <span className="text-gray-900 flex-shrink-0 d-sm-block d-none">
                    {t("sort_by")}:
                  </span>
                  <select
                    className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                    defaultValue={1}
                  >
                    <option value={1}>{t("sort_by_options.latest")}</option>
                    <option value={1}>{t("sort_by_options.oldest")}</option>
                  </select>
                </div>
                <button
                  onClick={sidebarController}
                  type="button"
                  className="w-48 h-48 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>
            {/* Search Filter End */}
            {/* Products Start */}
            <div
              className={`list-grid-wrapper grid-cols-4 ${grid && "list-view"}`}
            >
              {myListings.map((product, index) => {
                return <AccountProductCard key={index} {...product} />;
              })}
            </div>
            {/* Products End */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
