import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import Post from "../components/Post";
import ShippingTwo from "../components/ShippingTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
//import ScrollToTop from "react-scroll-to-top";

const NewPostPage = () => {
  const newPostData = {
    id_usuario: 0,
    tipo_publicacion: "exchange",
    titulo: "",
    descripcion_general: "",
    sku: "",
    categorias: "",
    ubicacion: "",
    estado: "",
    estrellas: 0,
    calificacion: 0,
    vendidos: 0,
    existencias: 0,
    descripcion_producto: "",
    simbolo_moneda: "",
    precio_anterior: 0,
    precio: 0,
    insignia: "",
    imagenes: "",
    imagen_portada: "",
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
  };

  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      {/*<ScrollToTop smooth color="#FA6400" />*/}

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderTwo category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"new_post"} />

      {/* Post */}
      <Post {...newPostData} />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default NewPostPage;
