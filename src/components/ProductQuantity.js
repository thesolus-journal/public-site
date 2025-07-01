import { useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

import "../css/ProductQuantity.css";

function ProductQuantity({ product }) {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useProductContext();
  const [additionalQuantity, setAdditionalQuantity] = useState(0);

  function handleIncreaseQuantity() {
    setAdditionalQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    if (additionalQuantity > 0) {
      setAdditionalQuantity((prev) => prev - 1);
    }
  }

  function handleAddToCart() {
    const productInCart = cart.find((item) => item.id === product.id);
    const existingQuantity = productInCart?.quantity || 0;
    const finalQuantity = existingQuantity + additionalQuantity;

    if (productInCart) {
      updateQuantity(product.id, finalQuantity);
    } else {
      addToCart(product);
      if (additionalQuantity > 1) {
        updateQuantity(product.id, additionalQuantity);
      }
    }
    setAdditionalQuantity(0);
    alert("Item has been added to your cart!");
  }

  return (
    <>
      <h4>Quantity:</h4>
      <div className="product-quantity">
        <div className="adjustor">
          <div className="display">
            <span className="quantity">{additionalQuantity}</span>
          </div>
          <div className="buttons">
            <button onClick={handleIncreaseQuantity}>+</button>
            <button
              onClick={handleDecreaseQuantity}
              disabled={additionalQuantity === 0}
              style={{
                opacity: additionalQuantity === 0 ? 0.5 : 1,
                cursor: additionalQuantity === 0 ? "not-allowed" : "pointer",
                marginTop: "0.5rem",
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="action-buttons">
          <button
            onClick={handleAddToCart}
            disabled={additionalQuantity === 0}
            style={{
              opacity: additionalQuantity === 0 ? 0.5 : 1,
              cursor: additionalQuantity === 0 ? "not-allowed" : "pointer",
            }}
          >
            Add to Cart
          </button>
          <button onClick={() => navigate("/personalize")}>Personalize</button>
        </div>
      </div>
    </>
  );
}

export default ProductQuantity;
