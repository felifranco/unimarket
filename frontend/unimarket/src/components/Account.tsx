import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation("Account");

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <form action="#">
          <div className="row gy-4">
            {/* Login Card Start */}
            <div className="col-xl-6 pe-xl-5">
              <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                <h6 className="text-xl mb-32">{t("login")}</h6>
                <div className="mb-24">
                  <label
                    htmlFor="username"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("username_or_email")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="username"
                    placeholder="First Name"
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="password"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("password")}
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="common-input"
                      id="password"
                      placeholder="Enter Password"
                      defaultValue="password"
                    />
                    <span
                      className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                      id="#password"
                    />
                  </div>
                </div>
                <div className="mb-24 mt-48">
                  <div className="flex-align gap-48 flex-wrap">
                    <button type="submit" className="btn btn-main py-18 px-40">
                      {t("log-in")}
                    </button>
                    <div className="form-check common-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="remember"
                      />
                      <label
                        className="form-check-label flex-grow-1"
                        htmlFor="remember"
                      >
                        {t("remember-me")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-48">
                  <Link
                    to="#"
                    className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                  >
                    {t("forgot-password")}
                  </Link>
                </div>
              </div>
            </div>
            {/* Login Card End */}
            {/* Register Card Start */}
            <div className="col-xl-6">
              <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                <h6 className="text-xl mb-32">{t("register")}</h6>
                <div className="mb-24">
                  <label
                    htmlFor="usernameTwo"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("username")} <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="usernameTwo"
                    placeholder="Write a username"
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="emailTwo"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("email-address")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="email"
                    className="common-input"
                    id="emailTwo"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="enter-password"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("password")} <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="common-input"
                      id="enter-password"
                      placeholder="Enter Password"
                      defaultValue="password"
                    />
                    <span
                      className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                      id="#enter-password"
                    />
                  </div>
                </div>
                <div className="my-48">
                  <p className="text-gray-500">
                    {t("share-data-text")}{" "}
                    <Link
                      to="#"
                      className="text-main-600 text-decoration-underline"
                    >
                      {" "}
                      {t("privacy-policy")}
                    </Link>
                    .
                  </p>
                </div>
                <div className="mt-48">
                  <button type="submit" className="btn btn-main py-18 px-40">
                    {t("Register")}
                  </button>
                </div>
              </div>
            </div>
            {/* Register Card End */}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Account;
