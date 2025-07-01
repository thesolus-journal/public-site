import { useState } from "react";
import ProductQuantity from "../components/ProductQuantity.js";
import "../css/Products.css";

function Products() {
  const oatmilkImages = ["chapter_01.jpeg", "chapter_01_02.jpeg"];
  const matchaImages = ["chapter_01_02.jpeg", "chapter_01.jpeg"];

  const [color, setColor] = useState("oatmilk");
  const [images, setImages] = useState(oatmilkImages);
  const [mainImage, setMainImage] = useState(oatmilkImages[0]);

  function handleColorChange(selectedColor) {
    if (selectedColor === "oatmilk") {
      setColor("oatmilk");
      setImages(oatmilkImages);
      setMainImage(oatmilkImages[0]);
    } else {
      setColor("matcha");
      setImages(matchaImages);
      setMainImage(matchaImages[0]);
    }
  }

  const products = {
    oatmilk: {
      id: 1,
      title: "Journal Chapter 1 - Put Pen to Purposes - Color: Oat Milk",
      class: "Premium",
      price: "1000000",
      poster: "chapter_01.jpeg",
    },
    matcha: {
      id: 2,
      title: "Journal Chapter 1 - Put Pen to Purposes - Color: Matcha",
      class: "Premium",
      price: "1000000",
      poster: "chapter_01_02.jpeg",
    },
  };

  const currentProduct = products[color];

  return (
    <div className="product-page">
      <div className="content">
        <h3>OUR PRODUCT</h3>
        <div className="main-image">
          <img src={mainImage} alt="main display" />
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
              className={`color-square oatmilk ${color === "oatmilk" ? "selected" : ""}`}
              onClick={() => handleColorChange("oatmilk")}
            ></div>
            <div
              className={`color-square matcha ${color === "matcha" ? "selected" : ""}`}
              onClick={() => handleColorChange("matcha")}
            ></div>
          </div>
        </div>
        <div className="product">
          <ProductQuantity product={currentProduct} />
        </div>
      </div>
    </div>
  );
}

export default Products;
