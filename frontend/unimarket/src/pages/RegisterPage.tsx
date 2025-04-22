import Preloader from "../helper/Preloader";

import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ShippingTwo from "../components/ShippingTwo";
import Register from "../components/Register";
//import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";

const RegisterPage = () => {
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
      <Breadcrumb title={"register"} />

      {/* Register */}
      <Register />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default RegisterPage;
