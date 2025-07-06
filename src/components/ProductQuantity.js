import { useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

import "../css/ProductQuantity.css";

/**
 * Allows users to adjust the quantity of a product and add it to the cart.
 * @param {object} props - The component props.
 * @param {object} props.product - The product to be added to the cart.
 * @param {boolean} [props.showPersonalizeButton=true] - Whether to show the "Personalize" button.
 * @returns {JSX.Element} The product quantity component.
 */
function ProductQuantity({ product, showPersonalizeButton = true }) {
  const navigate = useNavigate();
  const { addToCart } = useProductContext();
  const [quantity, setQuantity] = useState(1);

  /**
   * Increases the quantity, ensuring it does not go above a reasonable limit.
   */
  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  /**
   * Decreases the quantity, ensuring it does not go below 1.
   */
  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  /**
   * Adds the selected quantity of the product to the cart.
   */
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      alert(`${quantity} item(s) have been added to your cart!`);
      setQuantity(1);
    }
  };

  return (
    <>
      <div className="product-quantity">
        <h4>Quantity:</h4>
        <div className="adjustor">
          <div className="display">
            <span className="quantity">{quantity}</span>
          </div>
          <div className="buttons">
            <button onClick={handleIncrease}>+</button>
            <button
              onClick={handleDecrease}
              disabled={quantity === 1}
              className={quantity === 1 ? "disabled-button" : ""}
            >
              -
            </button>
          </div>
        </div>
        <div className="action-buttons">
          <button onClick={handleAddToCart} disabled={quantity === 0}>
            Add to Cart
          </button>
          {showPersonalizeButton && (
            <button onClick={() => navigate("/personalize")}>
              Personalize
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductQuantity;
