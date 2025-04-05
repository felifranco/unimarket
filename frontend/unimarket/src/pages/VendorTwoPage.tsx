import ColorInit from "../helper/ColorInit";
//import ScrollToTop from "react-scroll-to-top";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import VendorTwo from "../components/VendorTwo";
import ShippingOne from "../components/ShippingOne";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";

const VendorTwoPage = () => {
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
      <Breadcrumb title={"All Vendors"} />

      {/* VendorTwo */}
      <VendorTwo />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default VendorTwoPage;
