import { useTranslation } from "react-i18next";

const BottomFooter = () => {
  const { t } = useTranslation("BottomFooter");

  return (
    <div className="bottom-footer bg-color-one py-8">
      <div className="container container-lg">
        <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
          <p className="bottom-footer__text ">{t("license")}</p>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
