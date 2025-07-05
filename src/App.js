import { useLocation } from "react-router-dom";
import "./App.css";
import { ProductProvider } from "./contexts/ProductContext";
import { CouponProvider } from "./contexts/CouponContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Personalize from "./pages/Personalize";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ShoppingCart from "./pages/ShoppingCart";
import ShippingInformation from "./pages/ShippingInformation";
import Payment from "./pages/Payment";
import ZaloPay from "./pages/ZaloPay";
import Confirmation from "./pages/Confirmation";
import FAQ from "./pages/FAQ";
import Review from "./pages/Review";
import ForBusiness from "./pages/ForBusiness";
import BankTransfer from "./pages/BankTransfer";
import NavigationBar from "./components/NavigationBar";
import BottomBar from "./components/BottomBar";

/**
 * App component serves as the main entry point for the application.
 * It sets up the routing, product context, and coupon context.
 * @component
 * @returns {JSX.Element} The main application component.
 */
function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <CouponProvider>
      <ProductProvider>
        <div className="page-wrapper">
          <NavigationBar />
          <div className={isHomePage ? "" : "main-content"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/our-product" element={<Products />} />
              <Route path="/personalize" element={<Personalize />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/zalopay" element={<ZaloPay />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route
                path="/shipping-information"
                element={<ShippingInformation />}
              />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/review" element={<Review />} />
              <Route path="/for-business" element={<ForBusiness />} />
              <Route path="/bank-transfer" element={<BankTransfer />} />
            </Routes>
          </div>
          <BottomBar />
        </div>
      </ProductProvider>
    </CouponProvider>
  );
}

export default App;
