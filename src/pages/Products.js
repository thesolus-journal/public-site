import { useState, useMemo } from "react";
import ProductQuantity from "../components/ProductQuantity.js";
import { Link } from "react-router-dom";
import "../css/Products.css";

import oatmilkFirst from "../assets/products/oatmilk/oatmilk_1.jpg";
import oatmilkSecond from "../assets/products/oatmilk/oatmilk_2.jpg";
import oatmilkThird from "../assets/products/oatmilk/oatmilk_3.jpg";
import oatmilkFourth from "../assets/products/oatmilk/oatmilk_4.jpg";

import matchaFirst from "../assets/products/matcha/matcha_1.jpg";
import matchaSecond from "../assets/products/matcha/matcha_2.jpg";
import matchaThird from "../assets/products/matcha/matcha_3.jpg";
import matchaFourth from "../assets/products/matcha/matcha_4.jpg";

import bundleFirst from "../assets/products/bundle/bundle_1.jpg";
import bundleSecond from "../assets/products/bundle/bundle_2.jpg";
import bundleThird from "../assets/products/bundle/bundle_3.jpg";
import bundleFourth from "../assets/products/bundle/bundle_4.jpg";

import detailsFirst from "../assets/details/inside_1.jpg";
import detailsSecond from "../assets/details/inside_2.jpg";

import galleryFirst from "../assets/gallery/gallery_1.jpg";
import gallerySecond from "../assets/gallery/gallery_2.jpg";
import galleryThird from "../assets/gallery/gallery_3.jpg";
import galleryFourth from "../assets/gallery/gallery_4.jpg";

const oatmilkImages = [
  oatmilkFirst,
  oatmilkSecond,
  oatmilkThird,
  oatmilkFourth,
];
const matchaImages = [matchaFirst, matchaSecond, matchaThird, matchaFourth];
const bundleImages = [bundleFirst, bundleSecond, bundleThird, bundleFourth];

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
        price: 169000,
        originalPrice: 189000,
        poster: "chapter_01.jpeg",
      },
      matcha: {
        id: 2,
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Matcha",
        class: "Premium",
        price: 169000,
        originalPrice: 189000,
        poster: "chapter_01_02.jpeg",
      },
      bundle: {
        id: 3,
        name: "Journal Chapter 1 - Put Pen to Purposes - Color: Oat Milk & Matcha",
        class: "Premium",
        price: 315000,
        originalPrice: 378000,
        poster: "chapter_01_03.jpeg",
      },
    }),
    [],
  );

  const images =
    color === "oatmilk"
      ? oatmilkImages
      : color === "matcha"
        ? matchaImages
        : bundleImages;
  const currentProduct = products[color];

  /**
   * Handles the color change and updates the main image.
   * @param {string} selectedColor - The newly selected color.
   */
  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    setMainImage(
      selectedColor === "oatmilk"
        ? oatmilkImages[0]
        : selectedColor === "matcha"
          ? matchaImages[0]
          : bundleImages[0],
    );
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
              <div
                className={`color-square bundle ${
                  color === "bundle" ? "selected" : ""
                }`}
                onClick={() => handleColorChange("bundle")}
              ></div>
            </div>
            <h4>Price:</h4>
            <div className="price-display">
              {currentProduct.originalPrice ? (
                <p className="price-info">
                  <span className="current-price">
                    {formatPrice(currentProduct.price)}
                  </span>
                  <span className="save-info">
                    . Buy now to save{" "}
                    <span className="save-percentage">
                      {calculateSavePercentage(
                        currentProduct.originalPrice,
                        currentProduct.price,
                      )}
                      %
                    </span>{" "}
                    % % from{" "}
                    <span className="original-price">
                      {formatPrice(currentProduct.originalPrice)}
                    </span>
                  </span>
                </p>
              ) : (
                <p className="price-info">
                  <span className="current-price">
                    {formatPrice(currentProduct.price)}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="product">
            <ProductQuantity product={currentProduct} />
          </div>
        </div>
      </div>
      <p style={{ fontStyle: "italic", color: "gray" }}>
        We do our best to represent colors accurately, but slight variations may
        occur due to lighting and device display differences.
      </p>
      <div className="section-divider"></div>
      <div className="product-details-container">
        <div className="product-details-image">
          <img src={detailsFirst} alt="Product Details 1" />
          <img src={detailsSecond} alt="Product Details 2" />
        </div>
        <div className="product-details-text">
          <div className="product-specifications">
            <h3>Product Specifications</h3>
            <p>
              <strong>Size:</strong> A5 (148 x 210 mm)
            </p>
            <p>
              <strong>Cover:</strong> Durable hardcover
            </p>
            <p>
              <strong>Paper:</strong> 80 gsm, white paper
            </p>
            <p>
              <strong>Pages:</strong> 160 total
            </p>
          </div>
          <div className="inside-journal">
            <h3>Inside the Journal</h3>
            <p>Designed for 3 months of growth and clarity.</p>
            <p>Structured in a repeating cycle:</p>
            <ul>
              <li>Monthly Goals</li>
              <li>Weekly Plans</li>
              <li>Weekly Reflections</li>
              <li>Monthly Reflections</li>
            </ul>
            <p>Includes:</p>
            <ul>
              <li>Guided reflection prompts for deeper self-discovery</li>
              <li>4 bonus templates for clarity, creativity, and focus</li>
              <li>10 dedicated pages for meeting notes</li>
              <li>
                100+ dot grid pages for free writing, sketching, or
                brainstorming
              </li>
              <li>Undated layout - start anytime, no wasted pages</li>
            </ul>
          </div>
          <div className="additional-features">
            <h3>Additional Features</h3>
            <ul>
              <li>Elastic closure band for secure, on-the-go journaling</li>
              <li>
                Name personalization available{" "}
                <Link to="/personalize" className="bold-underline-link">
                  here
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="product-photos-container">
        <div className="product-photos-image">
          <img src={galleryFirst} alt="Product Details 1" />
          <img src={gallerySecond} alt="Product Details 2" />
        </div>
        <div className="product-photos-image">
          <img src={galleryThird} alt="Product Details 1" />
          <img src={galleryFourth} alt="Product Details 2" />
        </div>
      </div>
    </div>
  );
}

export default Products;
