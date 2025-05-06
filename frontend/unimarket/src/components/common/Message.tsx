import { useAppSelector } from "../../hooks";
import { useTranslation } from "react-i18next";

const Message = () => {
  const { t } = useTranslation("Message");

  const { type, message, showMessage } = useAppSelector(state => state.alert);

  let icon = "ph ph-info";
  switch (type) {
    case "success":
      icon = "ph-fill ph-check-circle";
      break;

    case "warning":
      icon = "ph-fill ph-warning";
      break;

    case "danger":
      icon = "ph-fill ph-warning";
      break;

    default:
      icon = "ph-fill ph-info";
      break;
  }

  return showMessage ? (
    <div className="position-fixed bottom-0 end-0">
      <div className={`alert alert-${type}`} role="alert">
        <div className="flex-align gap-16 ">
          <span className={`icon text-xl d-flex`}>
            <i className={icon} />
          </span>
          {t(`${message}`)}
        </div>
      </div>
    </div>
  ) : null;
};

export default Message;
