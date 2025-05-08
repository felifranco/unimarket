import { useTranslation } from "react-i18next";

interface ModalProps {
  title: string;
  Content: React.ReactNode;
  id: string;
  size?: "modal-fullscreen" | "modal-xl" | "modal-lg" | "modal-sm";
  onCloseModal?: () => void;
  onClose?: () => void;
  onAccept?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
}

const Modal = ({
  title,
  Content,
  id,
  size = "modal-sm",
  onCloseModal = () => {},
  onClose,
  onAccept,
  onCancel,
  onSave,
  onDelete,
}: ModalProps) => {
  const { t } = useTranslation("Modal");

  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div
        className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${size}`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onCloseModal}
            ></button>
          </div>
          <div className="modal-body">{Content}</div>
          {onClose || onAccept || onCancel || onSave || onDelete ? (
            <div className="modal-footer">
              {onClose ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  {t("close")}
                </button>
              ) : null}
              {onAccept ? (
                <button
                  type="button"
                  className="btn btn-main"
                  data-bs-dismiss="modal"
                  onClick={onAccept}
                >
                  {t("accept")}
                </button>
              ) : null}
              {onCancel ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onCancel}
                >
                  {t("cancel")}
                </button>
              ) : null}
              {onSave ? (
                <button
                  type="button"
                  className="btn btn-main"
                  data-bs-dismiss="modal"
                  onClick={onSave}
                >
                  {t("save")}
                </button>
              ) : null}
              {onDelete ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={onDelete}
                >
                  {t("delete")}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
