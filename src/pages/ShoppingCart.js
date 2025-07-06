import { useProductContext } from "../contexts/ProductContext";
import { useCouponContext } from "../contexts/CouponContext";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import "../css/ShoppingCart.css";

/**
 * Displays the items in the shopping cart, allowing users to adjust quantities,
 * remove items, apply coupons, and proceed to shipping.
 * @returns {JSX.Element} The shopping cart page component.
 */
function ShoppingCart() {
  const { cart, updateQuantity, removeFromCart } = useProductContext();
  const { applyCoupon, discountPercent } = useCouponContext();
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const totalBeforeDiscount = useMemo(
    () =>
      cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0),
    [cart],
  );

  const discountAmount = (totalBeforeDiscount * discountPercent) / 100;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  const handleProceedToShipping = () => navigate("/shipping-information");

  const handleApplyCoupon = () => {
    const success = applyCoupon(inputCode.trim());
    setIsInvalid(!success);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderCartItem = (item) => {
    const isPersonalized =
      item.personalization || item.name.includes(" - Personalized (");
    let displayName = item.name;
    let personalizationText = item.personalization;

    if (isPersonalized && !personalizationText) {
      const parts = item.name.split(" - Personalized (");
      displayName = parts[0];
      personalizationText = parts[1]?.slice(0, -1); // Remove trailing ')'
    }

    return (
      <div key={item.id} className="cart-item">
        <div className="item-details">
          <div className="item-title">{displayName}</div>
          {isPersonalized ? (
            <div className="item-personalization">
              Personalized: {personalizationText}
            </div>
          ) : (
            <div className="item-class">{item.class}</div>
          )}
        </div>
        <div className="item-controls-group">
          <div className="item-controls">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
          <div className="item-total">
            {formatPrice(item.price * item.quantity)}
          </div>
          <button
            className="remove-item"
            onClick={() => removeFromCart(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h2>Checkout</h2>
          <h3>Order Summary</h3>
          <div className="cart-items">{cart.map(renderCartItem)}</div>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                if (isInvalid) setIsInvalid(false);
              }}
              className={isInvalid ? "invalid-coupon" : ""}
            />
            <button onClick={handleApplyCoupon} disabled={!inputCode.trim()}>
              Apply
            </button>
          </div>

          <div className="cart-total">
            {discountPercent > 0 ? (
              <>
                <div className="total-row">
                  <span className="label">Total before discount:</span>
                  <span className="value">
                    {formatPrice(totalBeforeDiscount)}
                  </span>
                </div>
                <div className="total-row">
                  <span className="label">Discount ({discountPercent}%):</span>
                  <span className="value">
                    -{formatPrice(discountAmount)}
                  </span>
                </div>
                <div className="total-row">
                  <span className="label">
                    <strong>Total after discount:</strong>
                  </span>
                  <span className="value">
                    <strong>{formatPrice(totalAfterDiscount)}</strong>
                  </span>
                </div>
              </>
            ) : (
              <div className="total-row">
                <span className="label">
                  <strong>Total:</strong>
                </span>
                <span className="value">
                  <strong>{formatPrice(totalBeforeDiscount)}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="proceed-button">
            <button onClick={handleProceedToShipping}>
              Proceed to Shipping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
