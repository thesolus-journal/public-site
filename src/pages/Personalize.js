import { useState, useMemo } from "react";
import ProductQuantity from "../components/ProductQuantity.js";
import "../css/Personalize.css";
import "../css/Products.css";

const oatmilkImages = ["chapter_01.jpeg", "chapter_01_02.jpeg"];
const matchaImages = ["chapter_01_02.jpeg", "chapter_01.jpeg"];

/**
 * Allows users to customize a journal by selecting a color, adding custom text,
 * and adding it to the cart.
 * @returns {JSX.Element} The personalization page component.
 */
function Personalize() {
  const [color, setColor] = useState("oatmilk");
  const [mainImage, setMainImage] = useState(oatmilkImages[0]);
  const [customText, setCustomText] = useState("");

  const productVariants = useMemo(
    () => ({
      oatmilk: {
        id: "1",
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Oat Milk",
        price: 1000000,
        poster: "chapter_01.jpeg",
      },
      matcha: {
        id: "2",
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Matcha",
        price: 1000000,
        poster: "chapter_01_02.jpeg",
      },
    }),
    [],
  );

  const images = color === "oatmilk" ? oatmilkImages : matchaImages;
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
   * Handles the color change and updates the main image.
   * @param {string} selectedColor - The newly selected color.
   */
  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    setMainImage(
      selectedColor === "oatmilk" ? oatmilkImages[0] : matchaImages[0],
    );
  };

  return (
    <div className="product-page-container">
      <h3 className="page-title">PERSONALIZE YOUR JOURNAL</h3>
      <div className="product-page">
        <div className="content">
          <div className="main-image image-with-overlay">
            <img src={mainImage} alt="Main product view" />
            {customText && (
              <div className="personalization-overlay">{customText}</div>
            )}
          </div>
          <div className="thumbnails">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(src)}
                className={src === mainImage ? "active" : ""}
              />
            ))}
          </div>
        </div>
        <div className="interface">
          <div className="text">
            <h3>JOURNAL CHAPTER 1 - PUT PEN TO PURPOSES</h3>
            <h4>1st edition - Premium</h4>
            <p>Journaling in A5 size (148 x 210 mm)</p>
            <p>Hardcover available in two colors</p>
            <p>Paper: 80 gsm, white</p>
            <p>Please see the detailed specifications below</p>
            <h4>Color:</h4>
            <div className="color-options">
              <div
                className={`color-square oatmilk ${
                  color === "oatmilk" ? "selected" : ""
                }`}
                onClick={() => handleColorChange("oatmilk")}
              ></div>
              <div
                className={`color-square matcha ${
                  color === "matcha" ? "selected" : ""
                }`}
                onClick={() => handleColorChange("matcha")}
              ></div>
            </div>

            <h4>Personalization:</h4>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter your name or message"
              className="personalization-input"
            />
          </div>
          <div className="product">
            <ProductQuantity
              product={customizedProduct}
              showPersonalizeButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalize;
