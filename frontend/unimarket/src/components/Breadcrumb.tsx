import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Breadcrumb = ({ title }: { title: string }) => {
  const { t } = useTranslation("Breadcrumb");

  return (
    <div className="breadcrumb mb-0 py-26 bg-main-two-50">
      <div className="container container-lg">
        <div className="breadcrumb-wrapper flex-between flex-wrap gap-16">
          <h6 className="mb-0">{t(title)}</h6>
          <ul className="flex-align gap-8 flex-wrap">
            <li className="text-sm">
              <Link
                to="/"
                className="text-gray-900 flex-align gap-8 hover-text-main-600"
              >
                <i className="ph ph-house" />
                {t("home")}
              </Link>
            </li>
            <li className="flex-align">
              <i className="ph ph-caret-right" />
            </li>
            <li className="text-sm text-main-600"> {t(title)} </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
