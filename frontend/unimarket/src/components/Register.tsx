import { useEffect } from "react";
//import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks";
import { register } from "../store/auth/authSlice";
import { navigateTo } from "../helper/NavigateHelper";
import { goLogin } from "../store/auth/authSlice";

const Register = () => {
  const { t } = useTranslation("Register");

  const dispatch = useAppDispatch();

  const registered = useAppSelector(state => state.auth.registered);

  const handleRegister = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if password is strong enough
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    //if (!passwordRegex.test(password)) {
    //  alert(
    //    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
    //  );
    //  return;
    //}

    dispatch(register({ name, email, username, password }));
  };

  useEffect(() => {
    if (registered) {
      dispatch(goLogin());
      navigateTo("/login");
    }
  }, [dispatch, registered]);

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <form action={handleRegister}>
          <div className="row gy-4 justify-content-center">
            {/* Register Card Start */}
            <div className="col-xl-6">
              <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                <h6 className="text-xl mb-32">{t("register")}</h6>
                <div className="mb-24">
                  <label
                    htmlFor="usernameTwo"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("name")} <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="name"
                    name="name"
                    placeholder={t("enter_name")}
                  />
                </div>
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
                    id="username"
                    name="username"
                    placeholder={t("enter_username")}
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="emailTwo"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("email_address")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="email"
                    className="common-input"
                    id="email"
                    name="email"
                    placeholder={t("enter_email_address")}
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
                      id="password"
                      name="password"
                      placeholder={t("enter_password")}
                      defaultValue="password"
                    />
                    <span
                      className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                      id="#enter-password"
                    />
                  </div>
                </div>

                <div className="mb-24">
                  <label
                    htmlFor="password"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    {t("confirm_password")}
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="common-input"
                      id="confirm_password"
                      name="confirm_password"
                      placeholder={t("enter_confirm_password")}
                      defaultValue="confirm_password"
                    />
                    <span
                      className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                      id="#password"
                    />
                  </div>
                </div>
                {/*<div className="my-48">
                  <p className="text-gray-500">
                    {t("share_data_text")}{" "}
                    <Link
                      to="#"
                      className="text-main-600 text-decoration-underline"
                    >
                      {" "}
                      {t("privacy_policy")}
                    </Link>
                    .
                  </p>
                </div>*/}
                <div className="mt-48">
                  <button type="submit" className="btn btn-main py-18 px-40">
                    {t("register")}
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

export default Register;
