import styles from "./App.module.css";
import { ProductProvider } from "./contexts/ProductContext";
import { CouponProvider } from "./contexts/CouponContext";
import NavigationBar from "./components/NavigationBar";
import BottomBar from "./components/BottomBar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <CouponProvider>
      <ProductProvider>
        <div className={styles["page-wrapper"]}>
          <NavigationBar />
          <MainContent />
          <BottomBar />
        </div>
      </ProductProvider>
    </CouponProvider>
  );
}

export default App;
