import { useProductContext } from "../contexts/ProductContext";
import { useCouponContext } from "../contexts/CouponContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Cart.css";

function ShoppingCart() {
  const { cart, updateQuantity, removeFromCart } = useProductContext();
  const { couponCode, applyCoupon, discountPercent, clearCoupon } =
    useCouponContext();

  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const totalBeforeDiscount = cart.reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0,
  );

  const discountAmount = (totalBeforeDiscount * discountPercent) / 100;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  // const total = cart.reduce(
  //   (acc, item) => acc + parseInt(item.price) * item.quantity,
  //   0,
  // );

  function handleProceedToShipping() {
    navigate("/shipping-information");
  }

  function handleApplyCoupon() {
    const success = applyCoupon(inputCode.trim());
    if (success) {
      setCouponMessage("Coupon applied!");
      setIsInvalid(false);
    } else {
      setCouponMessage("Invalid code");
      setIsInvalid(true);
    }
  }

  function handleClearCoupon() {
    clearCoupon();
    setCouponMessage("");
    setInputCode("");
  }

  return (
    <div className="cart-page">
      <h2>Checkout</h2>
      <h3>Order Summary</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <div className="item-title">{item.title}</div>
                <div className="item-class">{item.class}</div>
              </div>
              <div className="item-controls-group">
                <div className="item-controls">
                  <button
                    onClick={() => {
                      if (item.quantity === 1) {
                        removeFromCart(item.id);
                      } else {
                        updateQuantity(item.id, item.quantity - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  VND {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          {/* Coupon input section */}
          <div className="coupon-section" style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className={isInvalid ? "invalid-coupon" : ""}
            />
            <button onClick={handleApplyCoupon} disabled={!inputCode.trim()}>
              Apply
            </button>
          </div>
          {/* <div className="cart-total"> */}
          {/*   <strong>Total: VND {total.toLocaleString()}</strong> */}
          {/* </div> */}
          <div className="cart-total" style={{ marginTop: "20px" }}>
            {discountPercent > 0 ? (
              <>
                <div className="total-row">
                  <span className="label">Total before discount:</span>
                  <span className="value">
                    {totalBeforeDiscount.toLocaleString()}
                  </span>
                </div>
                <div className="total-row">
                  <span className="label">Discount {discountPercent}%:</span>
                  <span className="value">
                    -{discountAmount.toLocaleString()}
                  </span>
                </div>
                <div className="total-row">
                  <span className="label">
                    <strong>Total after discount:</strong>
                  </span>
                  <span className="value">
                    <strong>VND {totalAfterDiscount.toLocaleString()}</strong>
                  </span>
                </div>
              </>
            ) : (
              <strong>Total: VND {totalBeforeDiscount.toLocaleString()}</strong>
            )}
          </div>
          <div className="proceed-button">
            <button onClick={handleProceedToShipping}>
              Proceed to Shipping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
