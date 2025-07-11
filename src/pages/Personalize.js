import { useState, useMemo } from "react";
import ProductQuantity from "../components/ProductQuantity.js";
import styles from "../css/Personalize.module.css";

import coverMatcha from "../assets/personalize/matcha_cover.jpg";
import coverOatmilk from "../assets/personalize/oatmilk_cover.jpg";

const oatmilkImage = coverOatmilk;
const matchaImage = coverMatcha;

/**
 * Allows users to customize a journal by selecting a color, adding custom text,
 * and adding it to the cart.
 * @returns {JSX.Element} The personalization page component.
 */
function Personalize() {
  const [color, setColor] = useState("oatmilk");
  const [customText, setCustomText] = useState("");

  const productVariants = useMemo(
    () => ({
      oatmilk: {
        id: "1",
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Oat Milk",
        class: "Original",
        price: 169000,
        originalPrice: 189888,
        poster: coverOatmilk,
      },
      matcha: {
        id: "2",
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Matcha",
        class: "Original",
        price: 169000,
        originalPrice: 189888,
        poster: coverMatcha,
      },
    }),
    [],
  );

  const baseProduct = productVariants[color];

  const customizedProduct = useMemo(
    () => ({
      ...baseProduct,
      id: `${baseProduct.id}-custom-${customText || "blank"}`,
      personalization: customText || "...",
    }),
    [baseProduct, customText],
  );

  /**
   * Handles the color change.
   * @param {string} selectedColor - The newly selected color.
   */
  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateSavePercentage = (originalPrice, price) => {
    if (!originalPrice || !price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const getOverlayStyles = (variant) => {
    const isBundle = color === "bundle";
    const scaleFactor = isBundle ? 0.5 : 1; // Scale down by 50% in bundle view

    if (variant === "oatmilk") {
      return {
        top: "74%",
        left: "1%",
        transform: "rotate(21deg)",
        fontSize: `clamp(${8.5 * scaleFactor}px, ${
          0.9 * scaleFactor
        }vw, ${17 * scaleFactor}px)`,
        width: "60%",
        textAlign: "center",
        color: "#4F776F",
      };
    } else if (variant === "matcha") {
      return {
        top: "69%",
        left: "10%",
        transform: "rotate(1deg)",
        fontSize: `clamp(${9 * scaleFactor}px, ${
          1.0 * scaleFactor
        }vw, ${18 * scaleFactor}px)`,
        width: "60%",
        textAlign: "center",
        color: "#515151",
      };
    }
    return {}; // Default or empty styles
  };

  return (
    <div className={styles["personalize-page-container"]}>
      <h3 className={styles["page-title"]}>PERSONALIZE YOUR JOURNAL</h3>
      <div className={styles["personalize-page"]}>
        <div className={styles.content}>
          {color === "bundle" ? (
            <div className={styles["bundle-image-container"]}>
              <div
                className={`${styles["main-image"]} ${styles["image-with-overlay"]}`}
              >
                <img src={oatmilkImage} alt="Oatmilk product view" />
                {customText && (
                  <div
                    className={styles["personalization-overlay"]}
                    style={getOverlayStyles("oatmilk")}
                  >
                    {customText}
                  </div>
                )}
              </div>
              <div
                className={`${styles["main-image"]} ${styles["image-with-overlay"]}`}
              >
                <img src={matchaImage} alt="Matcha product view" />
                {customText && (
                  <div
                    className={styles["personalization-overlay"]}
                    style={getOverlayStyles("matcha")}
                  >
                    {customText}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`${styles["main-image"]} ${styles["image-with-overlay"]}`}
            >
              <img
                src={color === "oatmilk" ? oatmilkImage : matchaImage}
                alt="Main product view"
              />
              {customText && (
                <div
                  className={styles["personalization-overlay"]}
                  style={getOverlayStyles(color)}
                >
                  {customText}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.interface}>
          <div className={styles.text}>
            <h3>JOURNAL CHAPTER 1 - PUT PEN TO PURPOSES</h3>
            <h4>1st edition - Original</h4>
            <p>Journaling in A5 size (148 x 210 mm)</p>
            <p>Hardcover available in two colors</p>
            <p>Paper: 80 gsm, white</p>
            <p>Please see the detailed specifications below</p>
            <h4>Color:</h4>
            <div className={styles["color-options"]}>
              <div
                className={`${styles["color-square"]} ${styles.oatmilk} ${
                  color === "oatmilk" ? styles.selected : ""
                }`}
                onClick={() => handleColorChange("oatmilk")}
              ></div>
              <div
                className={`${styles["color-square"]} ${styles.matcha} ${
                  color === "matcha" ? styles.selected : ""
                }`}
                onClick={() => handleColorChange("matcha")}
              ></div>
            </div>
            <h4>Price:</h4>
            <div className={styles["price-display"]}>
              {baseProduct.originalPrice ? (
                <p className={styles["price-info"]}>
                  <span className={styles["current-price"]}>
                    {formatPrice(baseProduct.price)}
                  </span>
                  <span className={styles["save-info"]}>
                    . Buy now to save{" "}
                    <span className={styles["save-percentage"]}>
                      {calculateSavePercentage(
                        baseProduct.originalPrice,
                        baseProduct.price,
                      )}
                      %
                    </span>{" "}
                    from{" "}
                    <span className={styles["original-price"]}>
                      {formatPrice(baseProduct.originalPrice)}
                    </span>
                  </span>
                </p>
              ) : (
                <p className={styles["price-info"]}>
                  <span className={styles["current-price"]}>
                    {formatPrice(baseProduct.price)}
                  </span>
                </p>
              )}
            </div>

            <h4>Personalization:</h4>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter your name or message"
              className={styles["personalization-input"]}
              maxLength={40}
            />
            <p style={{ fontStyle: "italic", color: "gray" }}>
              Please expect delivery within 5-7 days for the personalized
              product.
            </p>
          </div>
          <div className={styles.product}>
            <ProductQuantity
              product={customizedProduct}
              showPersonalizeButton={false}
            />
          </div>
        </div>
      </div>
      <p style={{ fontStyle: "italic", color: "gray" }}>
        We do our best to represent colors accurately, but slight variations may
        occur due to lighting and device display differences.
      </p>
    </div>
  );
}

export default Personalize;
