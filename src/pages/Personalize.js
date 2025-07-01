import { useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import "../css/Personalize.css";

function Personalize() {
  const whiteImages = ["chapter_01.jpeg", "chapter_01_02.jpeg"];
  const blackImages = ["chapter_01_02.jpeg", "chapter_01.jpeg"];

  const [color, setColor] = useState("white");
  const [images, setImages] = useState(whiteImages);
  const [mainImage, setMainImage] = useState(whiteImages[0]);
  const [customText, setCustomText] = useState("");
  const [localQty, setLocalQty] = useState(0);
  const { addToCart } = useProductContext();

  const productVariants = {
    white: {
      id: "1",
      title: "Chapter 1 - White",
      price: "1000000",
      poster: "chapter_01.jpeg",
    },
    black: {
      id: "2",
      title: "Chapter 1 - Black",
      price: "1000000",
      poster: "chapter_01_02.jpeg",
    },
  };

  const baseProduct = productVariants[color];
  const customizedProduct = {
    ...baseProduct,
    id: `${baseProduct.id}-custom-${customText || "blank"}`,
    title: `${baseProduct.title} - Personalized (${customText || "..."})`,
  };

  function handleColorChange(selectedColor) {
    if (selectedColor === "white") {
      setColor("white");
      setImages(whiteImages);
      setMainImage(whiteImages[0]);
    } else {
      setColor("black");
      setImages(blackImages);
      setMainImage(blackImages[0]);
    }
  }

  function handleAddToCart() {
    for (let i = 0; i < localQty; i++) {
      addToCart(customizedProduct);
    }
    setLocalQty(0);
  }

  function handleIncreaseQuantity() {
    setLocalQty((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    if (localQty > 1) {
      setLocalQty((prev) => prev - 1);
    }
  }

  return (
    <div className="product-page">
      <div className="content">
        <h3>PERSONALIZE YOUR JOURNAL</h3>
        <div className="main-image image-with-overlay">
          <img src={mainImage} alt="main display" />
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
          <h3>{baseProduct.title}</h3>
          <h4>1st edition - Premium</h4>
          <p>Journaling in A5 size (148 x 210 mm)</p>
          <p>Hardcover available in two colors</p>
          <p>Paper: 80 gsm, ivory-colored</p>
          <p>Please see the detailed specifications below</p>
          <h4>Color:</h4>
          <div className="color-options">
            <div
              className={`color-square white ${color === "white" ? "selected" : ""}`}
              onClick={() => handleColorChange("white")}
            ></div>
            <div
              className={`color-square black ${color === "black" ? "selected" : ""}`}
              onClick={() => handleColorChange("black")}
            ></div>
          </div>

          <h4>Personalization:</h4>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter your name or message"
          />

          <h4>Quantity:</h4>
          <div className="quantity-display">
            <div className="number">
              <span className="quantity">{localQty}</span>
            </div>
            <div className="buttons">
              <button onClick={handleIncreaseQuantity}>+</button>
              <button
                onClick={handleDecreaseQuantity}
                className={localQty === 1 ? "inactive" : ""}
              >
                -
              </button>
            </div>
          </div>

          <button
            className="order-button"
            onClick={handleAddToCart}
            disabled={localQty === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personalize;
