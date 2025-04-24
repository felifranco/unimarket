import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import $ from "jquery";
import select2 from "select2";
import { Link, NavLink } from "react-router-dom";
import LanguageList from "./LanguageList";
import { useTranslation } from "react-i18next";
import { categories } from "../mocks/categories.json";
import { persistor } from "../store";

select2($);

const HeaderTwo = ({ category }: { category: boolean }) => {
  const { t } = useTranslation("HeaderTwo");

  const first_name = useAppSelector(state => state.auth.first_name);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
    const selectElement = $(".js-example-basic-single");
    selectElement.select2();

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleMenuClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState<number | null>(null);
  const handleCatClick = (index: number) => {
    setActiveIndexCat(activeIndexCat === index ? null : index);
  };

  const ProfileOption = () => {
    const name = first_name ? first_name : t("log_in");
    const icon = first_name ? "ph-fill ph-user-check" : "ph ph-user";
    const color = first_name ? "text-main-two-600" : "text-white";
    const to = first_name ? "/account" : "/login";
    return (
      <Link to={to} className="flex-align flex-column gap-8 item-hover-two">
        <span
          className={`text-2xl ${color} d-flex position-relative item-hover__text`}
        >
          <i className={icon} />
        </span>
        <span className={`text-md ${color} item-hover__text d-none d-lg-flex`}>
          {name}
        </span>
      </Link>
    );
  };

  const NewPost = () => {
    const to = first_name ? "/new-post" : "/login";
    return (
      <Link to={to} className="flex-align flex-column gap-8 item-hover-two">
        <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
          <i className="ph ph-newspaper-clipping" />
        </span>
        <span className="text-md text-white item-hover__text d-none d-lg-flex">
          {t("new_post")}
        </span>
      </Link>
    );
  };

  const LogOut = () => {
    return first_name ? (
      <Link
        to="/"
        onClick={() => {
          persistor.purge();
        }}
        className="flex-align flex-column gap-8 item-hover-two"
      >
        <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
          <i className="ph ph-sign-out" />
        </span>
        <span className="text-md text-white item-hover__text d-none d-lg-flex">
          {t("log_out")}
        </span>
      </Link>
    ) : null;
  };

  return (
    <>
      <div className="overlay" />
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/* ==================== Search Box Start Here ==================== */}

      <form action="#" className={`search-box ${activeSearch && "active"}`}>
        <button
          onClick={handleSearchToggle}
          type="button"
          className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        >
          <i className="ph ph-x" />
        </button>
        <div className="container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control py-16 px-24 text-xl rounded-pill pe-64"
              placeholder={t("search_product")}
            />
            <button
              type="submit"
              className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
            >
              <i className="ph ph-magnifying-glass" />
            </button>
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type="button"
          className="close-button"
        >
          <i className="ph ph-x" />{" "}
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img src="assets/images/logo/logo.png" alt="Logo" />
          </Link>
          <div className="mobile-menu__menu">
            {/* Nav Menu Start */}
            <ul className="nav-menu flex-align nav-menu--mobile">
              <li className="nav-menu__item">
                <Link to="/" className="nav-menu__link">
                  {t("home")}
                </Link>
              </li>
              <li className="nav-menu__item">
                <Link to="/shop" className="nav-menu__link">
                  {t("shop")}
                </Link>
              </li>
              <li
                onClick={() => handleMenuClick(2)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 2 ? "d-block" : ""
                }`}
              >
                <Link to="#" className="nav-menu__link">
                  {t("pages")}
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 2 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/cart"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      {" "}
                      {t("cart")}
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/wishlist"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      {t("whishlist")}
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/checkout"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      {t("checkout")}
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/become-seller"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      {t("become_seller")}
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/account"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      {t("account")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                onClick={() => handleMenuClick(3)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 3 ? "d-block" : ""
                }`}
              >
                <Link to="#" className="nav-menu__link">
                  {t("vendors")}
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 3 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/vendor"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      {t("vendors_two")}
                    </Link>
                  </li>
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      onClick={() => setActiveIndex(null)}
                      to="/vendor-details"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >
                      {t("vendor_details_two")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-menu__item">
                <Link to="/contact" className="nav-menu__link">
                  {t("contact_us")}
                </Link>
              </li>
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      {/* ======================= Middle Header Two Start ========================= */}
      <header className="header-middle style-two bg-color-neutral">
        <div className="container container-lg">
          <nav className="header-inner flex-between">
            {/* Logo Start */}
            <div className="logo">
              <Link to="/" className="link">
                <img src="assets/images/logo/logo-two.png" alt="Logo" />
              </Link>
            </div>
            {/* Logo End  */}
            {/* form Category Start */}
            <div className="flex-align gap-16">
              <div className="select-dropdown-for-home-two d-lg-none d-block">
                {/* Dropdown Select Start */}
                <ul className="header-top__right style-two flex-align flex-wrap">
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                    <LanguageList style="text-heading" />
                  </li>
                </ul>
                {/* Dropdown Select End */}
              </div>
              <form
                action="#"
                className="flex-align flex-wrap form-location-wrapper"
              >
                <div className="search-category style-two d-flex h-48 search-form d-sm-flex d-none">
                  <select
                    defaultValue={1}
                    className="js-example-basic-single border border-gray-200 border-end-0 rounded-0 border-0"
                    name="state"
                  >
                    <option value={0}>{t("all_categories")}</option>
                    {categories.map((obj, index) => (
                      <option key={index} value={obj.name}>
                        {obj.name}
                      </option>
                    ))}
                  </select>
                  <div className="search-form__wrapper position-relative">
                    <input
                      type="text"
                      className="search-form__input common-input py-13 ps-16 pe-18 rounded-0 border-0"
                      placeholder={t("search_product")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-main-two-600 flex-center text-xl text-white flex-shrink-0 w-48 hover-bg-main-two-700 d-lg-flex d-none"
                  >
                    <i className="ph ph-magnifying-glass" />
                  </button>
                </div>
              </form>
            </div>
            {/* form Category start */}
            {/* Header Middle Right start */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="header-two-activities flex-align flex-wrap gap-32">
                <button
                  type="button"
                  className="flex-align search-icon d-lg-none d-flex gap-4 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative item-hover__text">
                    <i className="ph ph-magnifying-glass" />
                  </span>
                </button>
                <ProfileOption />
                <Link
                  to="/wishlist"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-heart" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      2
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    {t("whishlist")}
                  </span>
                </Link>
                {/*<Link
                  to="/cart"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph-fill ph-shuffle" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      2
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    {t("compare")}
                  </span>
                </Link>*/}
                <NewPost />
                <Link
                  to="/cart"
                  className="flex-align flex-column gap-8 item-hover-two"
                >
                  <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-shopping-cart-simple" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                      2
                    </span>
                  </span>
                  <span className="text-md text-white item-hover__text d-none d-lg-flex">
                    {t("cart")}
                  </span>
                </Link>
                <LogOut />
              </div>
            </div>
            {/* Header Middle Right End  */}
          </nav>
        </div>
      </header>
      {/* ======================= Middle Header Two End ========================= */}
      {/* ==================== Header Two Start Here ==================== */}
      <header
        className={`header bg-white border-bottom border-gray-100 ${
          scroll && "fixed-header"
        }`}
      >
        <div className="container container-lg">
          <nav className="header-inner d-flex justify-content-between gap-8">
            <div className="flex-align menu-category-wrapper">
              {/* Category Dropdown Start */}
              <div
                className={`category-two ${
                  category === false ? "d-block" : "d-none"
                } `}
              >
                <button
                  onClick={handleCategoryToggle}
                  type="button"
                  className="category__button flex-align gap-8 fw-medium bg-main-two-600 p-16 text-white"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">
                    {t("all_categories")}
                  </span>
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div
                  className={`responsive-dropdown cat common-dropdown d-lg-none d-block nav-submenu p-0 submenus-submenu-wrapper shadow-none border border-gray-100 ${
                    activeCategory && "active"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleCategoryToggle();
                      setActiveIndexCat(null);
                    }}
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    <i className="ph ph-x" />{" "}
                  </button>
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="link">
                      <img src="assets/images/logo/logo.png" alt="Logo" />
                    </Link>
                  </div>
                  <ul className="scroll-sm p-0 py-8 overflow-y-auto">
                    {categories.map((obj, index) => (
                      <li
                        key={index}
                        onClick={() => handleCatClick(index)}
                        className={`has-submenus-submenu ${
                          activeIndexCat === index ? "active" : ""
                        }`}
                      >
                        <Link
                          to="#"
                          className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                        >
                          <span>{obj.name}</span>
                          <span className="icon text-md d-flex ms-auto">
                            <i className="ph ph-caret-right" />
                          </span>
                        </Link>
                        <div
                          className={`submenus-submenu py-16 ${
                            activeIndexCat === index ? "open" : ""
                          }`}
                        >
                          <h6 className="text-lg px-16 submenus-submenu__title">
                            {obj.name}
                          </h6>
                          <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                            {obj.subcategories.map((subcat, subIndex) => (
                              <li key={subIndex}>
                                <Link to="/shop">{subcat.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className={`category main  on-hover-item bg-main-600 text-white ${
                  category === true ? "d-block" : "d-none"
                }`}
              >
                <button
                  type="button"
                  className="category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-white"
                >
                  <span className="icon text-2xl d-xs-flex d-none">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">
                    {t("all_categories")}
                  </span>
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div className="responsive-dropdown on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper">
                  <button
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    <i className="ph ph-x" />{" "}
                  </button>
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="link">
                      <img src="assets/images/logo/logo.png" alt="Logo" />
                    </Link>
                  </div>
                  <ul className="scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto">
                    {categories.map((obj, index) => (
                      <li key={index} className="has-submenus-submenu">
                        <Link
                          to="#"
                          className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0"
                        >
                          <span className="text-xl d-flex">
                            <i className="ph ph-carrot" />
                          </span>
                          <span>{obj.name}</span>
                          <span className="icon text-md d-flex ms-auto">
                            <i className="ph ph-caret-right" />
                          </span>
                        </Link>
                        <div className="submenus-submenu py-16">
                          <h6 className="text-lg px-16 submenus-submenu__title">
                            {obj.name}
                          </h6>
                          <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                            {obj.subcategories.map((subObj, subIndex) => (
                              <li key={subIndex}>
                                <Link to="/shop">{subObj.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Category Dropdown End  */}
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                {/* Nav Menu Start */}
                <ul className="nav-menu flex-align ">
                  <li className="nav-menu__item">
                    <NavLink
                      to="/"
                      className={navData =>
                        navData.isActive
                          ? "nav-menu__link activePage"
                          : "nav-menu__link"
                      }
                    >
                      {t("home")}
                    </NavLink>
                  </li>
                  <li className="nav-menu__item">
                    <NavLink
                      to="/shop"
                      className={navData =>
                        navData.isActive
                          ? "nav-menu__link activePage"
                          : "nav-menu__link"
                      }
                    >
                      {t("shop")}
                    </NavLink>
                  </li>
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <Link to="#" className="nav-menu__link">
                      {t("pages")}
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/checkout"
                          className={navData =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          {t("checkout")}
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/become-seller"
                          className={navData =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          {t("become_seller")}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="on-hover-item nav-menu__item has-submenu">
                    <Link to="#" className="nav-menu__link">
                      {t("vendors")}
                    </Link>
                    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/vendor"
                          className={navData =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          {t("vendors_two")}
                        </NavLink>
                      </li>
                      <li className="common-dropdown__item nav-submenu__item">
                        <NavLink
                          to="/vendor-details"
                          className={navData =>
                            navData.isActive
                              ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                              : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                          }
                        >
                          {t("vendor_details_two")}
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-menu__item">
                    <NavLink
                      to="/contact"
                      className={navData =>
                        navData.isActive
                          ? "nav-menu__link activePage"
                          : "nav-menu__link"
                      }
                    >
                      {t("contact_us")}
                    </NavLink>
                  </li>
                </ul>
                {/* Nav Menu End */}
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              <div className="select-dropdown-for-home-two d-lg-block d-none">
                {/* Dropdown Select Start */}
                <ul className="header-top__right style-two flex-align flex-wrap">
                  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
                    <LanguageList style="text-heading" />
                  </li>
                </ul>
                {/* Dropdown Select End */}
              </div>
              <div className="me-8 d-lg-none d-block">
                <div className="header-two-activities flex-align flex-wrap gap-32">
                  <button
                    onClick={handleSearchToggle}
                    type="button"
                    className="flex-align search-icon d-lg-none d-flex gap-4 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative item-hover__text">
                      <i className="ph ph-magnifying-glass" />
                    </span>
                  </button>
                  <Link
                    to="/account"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative item-hover__text">
                      <i className="ph ph-user" />
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      {t("profile")}
                    </span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-heart" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                        2
                      </span>
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      {t("whishlist")}
                    </span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph-fill ph-shuffle" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                        2
                      </span>
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      {t("compare")}
                    </span>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex-align flex-column gap-8 item-hover-two"
                  >
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-shopping-cart-simple" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                        2
                      </span>
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">
                      {t("cart")}
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              >
                {" "}
                <i className="ph ph-list" />{" "}
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default HeaderTwo;
