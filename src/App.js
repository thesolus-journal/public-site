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
import Confirmation from "./pages/Confirmation";
import NavigationBar from "./components/NavigationBar";
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <CouponProvider>
      <ProductProvider>
        <div className="page-wrapper">
          <NavigationBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/our-product" element={<Products />} />
              <Route path="/personalize" element={<Personalize />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route
                path="/shipping-information"
                element={<ShippingInformation />}
              />
            </Routes>
          </div>
          <BottomBar />
        </div>
      </ProductProvider>
    </CouponProvider>
  );
}

export default App;
