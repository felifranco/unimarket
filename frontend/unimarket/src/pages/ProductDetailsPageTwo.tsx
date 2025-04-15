import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import ProductDetailsTwo from "../components/ProductDetailsTwo";
import NewArrivalTwo from "../components/NewArrivalTwo";
import ShippingTwo from "../components/ShippingTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
//import ScrollToTop from "react-scroll-to-top";

const ProductDetailsPageTwo = () => {
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
      <Breadcrumb title={"product_details"} />

      {/* ProductDetailsTwo */}
      <ProductDetailsTwo />

      {/* NewArrivalTwo */}
      <NewArrivalTwo />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default ProductDetailsPageTwo;
