import ColorInit from "../helper/ColorInit";
//import ScrollToTop from "react-scroll-to-top";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import VendorTwoDetails from "../components/VendorTwoDetails";
import ShippingTwo from "../components/ShippingTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";

const VendorTwoDetailsPage = () => {
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
      <Breadcrumb title={"vendor_details"} />

      {/* VendorTwoDetails */}
      <VendorTwoDetails />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default VendorTwoDetailsPage;
