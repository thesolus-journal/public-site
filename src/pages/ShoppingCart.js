import { useProductContext } from "../contexts/ProductContext";
import { useCouponContext } from "../contexts/CouponContext";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "../css/ShoppingCart.module.css";

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
      <div key={item.id} className={styles["cart-item"]}>
        <div className={styles["item-details"]}>
          <div className={styles["item-title"]}>{displayName}</div>
          {isPersonalized ? (
            <div className={styles["item-personalization"]}>
              Personalized: {personalizationText}
            </div>
          ) : (
            <div className={styles["item-class"]}>{item.class}</div>
          )}
        </div>
        <div className={styles["item-controls-group"]}>
          <div className={styles["item-controls"]}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
          <div className={styles["item-total"]}>
            {formatPrice(item.price * item.quantity)}
          </div>
          <button
            className={styles["remove-item"]}
            onClick={() => removeFromCart(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles["cart-page"]}>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h2>Checkout</h2>
          <h3>Order Summary</h3>
          <div className={styles["cart-items"]}>{cart.map(renderCartItem)}</div>

          <div className={styles["coupon-section"]}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                if (isInvalid) setIsInvalid(false);
              }}
              className={isInvalid ? styles["invalid-coupon"] : ""}
            />
            <button onClick={handleApplyCoupon} disabled={!inputCode.trim()}>
              Apply
            </button>
          </div>

          <div className={styles["cart-total"]}>
            {discountPercent > 0 ? (
              <>
                <div className={styles["total-row"]}>
                  <span className={styles.label}>Total before discount:</span>
                  <span className={styles.value}>
                    {formatPrice(totalBeforeDiscount)}
                  </span>
                </div>
                <div className={styles["total-row"]}>
                  <span className={styles.label}>
                    Discount ({discountPercent}%):
                  </span>
                  <span className={styles.value}>
                    -{formatPrice(discountAmount)}
                  </span>
                </div>
                <div className={styles["total-row"]}>
                  <span className={styles.label}>
                    <strong>Total after discount:</strong>
                  </span>
                  <span className={styles.value}>
                    <strong>{formatPrice(totalAfterDiscount)}</strong>
                  </span>
                </div>
              </>
            ) : (
              <div className={styles["total-row"]}>
                <span className={styles.label}>
                  <strong>Total:</strong>
                </span>
                <span className={styles.value}>
                  <strong>{formatPrice(totalBeforeDiscount)}</strong>
                </span>
              </div>
            )}
          </div>

          <div className={styles["proceed-button"]}>
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
