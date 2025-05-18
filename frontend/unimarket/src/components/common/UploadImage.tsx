import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  uploadProfileImage,
  uploadListingImage,
  uploadNewListingImage,
  resetImageState,
} from "../../store/image/imageSlice";

const UploadImage = ({
  type,
  setUrl = () => {},
  isModal = true,
}: {
  type: "profile" | "listing" | "post";
  setUrl: (url: string) => void;
  isModal?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const uuid = useAppSelector(state => state.auth.uuid);
  const { url, loading } = useAppSelector(state => state.image);
  const publicacion_uuid = useAppSelector(
    state => state.listing.listing.publicacion_uuid,
  );

  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !uuid) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uuid", uuid);
    switch (type) {
      case "profile":
        await dispatch(uploadProfileImage(formData));
        break;
      case "listing":
        if (!publicacion_uuid) return;
        formData.append("publicacion_uuid", publicacion_uuid);
        await dispatch(uploadListingImage(formData));
        break;
      case "post":
        await dispatch(uploadNewListingImage(formData));
        break;
      default:
        break;
    }
    handleRemove();
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
    if (inputRef.current) inputRef.current.value = "";
    dispatch(resetImageState());
  };

  useEffect(() => {
    if (url) {
      setUrl(url);
    }
  }, [url, setUrl]);

  return (
    <form
      onSubmit={handleUpload}
      className="d-flex flex-column align-items-center gap-3"
    >
      <div className="mb-3 w-100 d-flex flex-column align-items-center">
        <label htmlFor="upload-image-input" className="form-label fw-bold">
          Selecciona una imagen
        </label>
        <input
          ref={inputRef}
          className="form-control"
          type="file"
          id="upload-image-input"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {preview && (
        <div className="mb-3 text-center">
          <img
            src={preview}
            alt="Vista previa"
            className="rounded shadow border"
            style={{ maxWidth: 220, maxHeight: 220, objectFit: "cover" }}
          />
          <div>
            <button
              type="button"
              className="btn text-danger-600 hover-bg-danger-600 hover-text-white hover-border-danger-600 transition-2 rounded-16 btn-sm mt-10"
              onClick={handleRemove}
            >
              Quitar
            </button>
          </div>
        </div>
      )}
      {url && !preview && (
        <div className="mb-3 text-center">
          <img
            src={url}
            alt="Imagen subida"
            className="rounded shadow border"
            style={{ maxWidth: 220, maxHeight: 220, objectFit: "cover" }}
          />
        </div>
      )}
      <button
        type="submit"
        className="btn btn-main w-100"
        {...(isModal ? { "data-bs-dismiss": "modal" } : {})}
        disabled={!file || loading}
      >
        {loading ? (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <i className="ph-fill ph-upload-simple me-2"></i>
        )}
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
    </form>
  );
};

export default UploadImage;
