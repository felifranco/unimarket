import { useEffect } from "react";
import { useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../hooks";
import { login, me } from "../store/auth/authSlice";

const Login = () => {
  const { t } = useTranslation("Login");

  const token = useAppSelector(state => state.auth.token);
  const first_name = useAppSelector(state => state.auth.first_name);

  const dispatch = useAppDispatch();

  const handleLogin = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") as string;

    try {
      await dispatch(login({ username, password, remember }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (token) {
      if (!first_name) {
        dispatch(me(token));
      } else {
        window.location.href = "/";
      }
    }
  }, [token, first_name, dispatch]);

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <form action={handleLogin}>
          <div className="row gy-4 justify-content-center">
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
                    name="username"
                    placeholder={t("enter_username")}
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
                      name="password"
                      placeholder={t("enter_password")}
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
                    <button className="btn btn-main py-18 px-40">
                      {t("log-in")}
                    </button>
                    <div className="form-check common-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="remember"
                        name="remember"
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
