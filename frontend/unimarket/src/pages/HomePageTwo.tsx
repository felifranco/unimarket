import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import BannerTwo from "../components/BannerTwo";
import PromotionalTwo from "../components/PromotionalTwo";
import TopSellingTwo from "../components/TopSellingTwo";
import TopVendorsTwo from "../components/TopVendorsTwo";
import BrandTwo from "../components/BrandTwo";
import ShippingTwo from "../components/ShippingTwo";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ColorInit from "../helper/ColorInit";
//import ScrollToTop from "react-scroll-to-top";

const HomePageTwo = () => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      {/*<ScrollToTop smooth color="#FA6400" />*/}

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderTwo category={false} />

      {/* BannerTwo */}
      <BannerTwo />

      {/* PromotionalTwo */}
      <PromotionalTwo />

      {/* TopSellingTwo */}
      <TopSellingTwo />

      {/* TopVendorsTwo */}
      <TopVendorsTwo />

      {/* BrandTwo */}
      <BrandTwo />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default HomePageTwo;
