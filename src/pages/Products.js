import { useState, useMemo } from "react";
import ProductQuantity from "../components/ProductQuantity.js";
import "../css/Products.css";

const oatmilkImages = ["chapter_01.jpeg", "chapter_01_02.jpeg"];
const matchaImages = ["chapter_01_02.jpeg", "chapter_01.jpeg"];

/**
 * Displays the main product page, allowing users to view product details,
 * select colors, and add products to their cart.
 * @returns {JSX.Element} The products page component.
 */
function Products() {
  const [color, setColor] = useState("oatmilk");
  const [mainImage, setMainImage] = useState(oatmilkImages[0]);

  const products = useMemo(
    () => ({
      oatmilk: {
        id: 1,
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Oat Milk",
        class: "Premium",
        price: 1000000,
        poster: "chapter_01.jpeg",
      },
      matcha: {
        id: 2,
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Matcha",
        class: "Premium",
        price: 1000000,
        poster: "chapter_01_02.jpeg",
      },
    }),
    [],
  );

  const images = color === "oatmilk" ? oatmilkImages : matchaImages;
  const currentProduct = products[color];

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
      <h3 className="page-title">OUR PRODUCT</h3>
      <div className="product-page">
        <div className="content">
          <div className="main-image">
            <img src={mainImage} alt="Main product view" />
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
            <p>Paper: 80 gsm, ivory-colored</p>
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
          </div>
          <div className="product">
            <ProductQuantity product={currentProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
