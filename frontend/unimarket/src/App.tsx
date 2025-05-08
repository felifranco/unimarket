import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavigateHelper } from "./helper/NavigateHelper";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import HomePageTwo from "./pages/HomePageTwo";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo";
import NewPostPage from "./pages/NewPostPage";
import CartPage from "./pages/CartPage";
//import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import VendorTwoPage from "./pages/VendorTwoPage";
import VendorTwoDetailsPage from "./pages/VendorTwoDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import Message from "./components/common/Message";
import config from "./config/configurations";
import { useAppDispatch, useAppSelector } from "./hooks";
import { cleanMessage } from "./store/alert/alertSlice";

function App() {
  const dispatch = useAppDispatch();
  const showMessage = useAppSelector(state => state.alert.showMessage);

  useEffect(() => {
    setTimeout(() => {
      if (showMessage) {
        dispatch(cleanMessage());
      }
    }, 3000);
  }, [dispatch, showMessage]);

  return (
    <BrowserRouter
      basename={config.USE_BASE_PATH ? `/${config.BASE_PATH}` : ""}
    >
      <NavigateHelper />
      <RouteScrollToTop />
      <PhosphorIconInit />
      <Routes>
        <Route path="/" element={<HomePageTwo />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product-details" element={<ProductDetailsPageTwo />} />
        <Route path="/new-post" element={<NewPostPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/vendor" element={<VendorTwoPage />} />
        <Route path="/vendor-details" element={<VendorTwoDetailsPage />} />
      </Routes>
      <Message />
    </BrowserRouter>
  );
}

export default App;
