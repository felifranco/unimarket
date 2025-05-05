import { useState } from "react";
import { Link } from "react-router-dom";

const VendorTwo = () => {
  const [grid, setGrid] = useState(false);

  return (
    <section className="vendor-two py-80">
      <div className="container container-lg">
        {/* Top Search */}
        <div className="d-flex align-items-center justify-content-between flex-wrap mb-48 gap-16">
          <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-16 flex-grow-1">
            <div className="text-gray-600 text-md flex-shrink-0">
              {" "}
              <span className="text-neutral-900 fw-semibold">52</span> Results
              Found
            </div>
            <div className="d-flex align-items-center gap-8 d-sm-flex d-none">
              <button
                onClick={() => setGrid(false)}
                type="button"
                className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                  grid === false && "border-main-600 text-white bg-main-600"
                }`}
              >
                <i className="ph ph-squares-four" />
              </button>
              <button
                onClick={() => setGrid(true)}
                type="button"
                className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                  grid === true && "border-main-600 text-white bg-main-600"
                }`}
              >
                <i className="ph-bold ph-list-dashes" />
              </button>
            </div>
          </div>
        </div>
        {/* Top Search End */}
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            {/* Vendors Start */}
            <div
              className={`list-grid-wrapper vendors-two-item-wrapper grid-cols-3 ${
                grid && "list-view"
              }`}
            >
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img1.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon1.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          e-Mart Shop
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img2.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon2.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          Baishakhi
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img3.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon3.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          e-zone Shop
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img4.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon1.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          Cloth &amp; Fashion Shop
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img5.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon5.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          New Market Shop
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img6.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon6.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          Zeilla Shop
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img7.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon7.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          Ever Green Shop
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img8.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon8.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          Maple Shop
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="vendors-two-item rounded-12 overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                  <div className="vendors-two-item__thumbs h-210">
                    <img
                      src="assets/images/thumbs/vendors-two-img9.png"
                      alt=""
                      className="cover-img"
                    />
                  </div>
                  <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                        <img
                          src="assets/images/thumbs/vendors-two-icon2.png"
                          alt=""
                        />
                      </span>
                      <button
                        type="button"
                        className="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2"
                      >
                        FOLLOW
                      </button>
                    </div>
                    <div className="mt-16">
                      <h6 className="text-white fw-semibold mb-12">
                        <Link to="/vendor-details" className="">
                          New Mart
                        </Link>
                      </h6>
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
                          4.8
                        </span>
                        <span className="text-xs fw-medium text-white">
                          (12K)
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
                      <p className="text-md text-gray-900">
                        6391 Elgin St. Celina, Delaware 10299
                      </p>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                        <i className="ph ph-envelope-simple" />
                      </span>
                      <a
                        href="mailto:info@watch.com"
                        className="text-md text-gray-900 hover-text-main-60"
                      >
                        info@watch.com
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
                        083 308 1888
                      </a>
                    </div>
                  </div>
                  <Link
                    to="/vendor-details"
                    className="btn bg-neutral-600 hover-bg-neutral-700 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                  >
                    Visit Store
                    <span className="text-xl d-flex text-main-two-600">
                      {" "}
                      <i className="ph ph-storefront" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Vendors End */}
            {/* Pagination Start */}
            <ul className="pagination flex-center flex-wrap gap-16">
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  <i className="ph-bold ph-arrow-left" />
                </Link>
              </li>
              <li className="page-item active">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  01
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  02
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  03
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  04
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  05
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  06
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  07
                </Link>
              </li>
              <li className="page-item">
                <Link
                  className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                  to="#"
                >
                  <i className="ph-bold ph-arrow-right" />
                </Link>
              </li>
            </ul>
            {/* Pagination End */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorTwo;
