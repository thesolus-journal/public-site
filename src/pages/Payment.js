import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineMail,
  HiOutlineTruck,
} from "react-icons/hi";
import PaymentInstructions from "../components/PaymentInstructions";
import { useProductContext } from "../contexts/ProductContext";
import { useCouponContext } from "../contexts/CouponContext";
import "../css/Payment.css";

/**
 * Payment component guides the user through the self-checkout payment process.
 * It displays a QR code for payment and outlines the steps to complete the transaction.
 * @component
 * @returns {JSX.Element} The payment page element.
 */
function Payment() {
  const navigate = useNavigate();
  const { clearCart, cart } = useProductContext();
  const { clearCoupon, discountPercent } = useCouponContext();
  const [displayAmount, setDisplayAmount] = useState(0);

  const totalBeforeDiscount = useMemo(
    () =>
      cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0),
    [cart],
  );

  const discountAmount = (totalBeforeDiscount * discountPercent) / 100;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  useEffect(() => {
    if (cart.length > 0) {
      setDisplayAmount(totalAfterDiscount);
    } else {
      const storedAmount = sessionStorage.getItem("paymentAmount");
      if (storedAmount) {
        setDisplayAmount(parseFloat(storedAmount));
      } else {
        setDisplayAmount(0);
      }
    }
  }, [cart, totalAfterDiscount]);

  function handleConfirmPayment() {
    sessionStorage.setItem("paymentAmount", totalAfterDiscount);
    clearCart();
    clearCoupon();
    navigate("/confirmation");
  }

  const formatPrice = (price) => {
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).formatToParts(price);
    return {
      number: formatted
        .filter((part) => part.type !== "currency")
        .map((part) => part.value)
        .join(""),
      symbol: formatted.find((part) => part.type === "currency").value,
    };
  };

  const { number, symbol } = formatPrice(displayAmount);

  return (
    <div className="payment-page">
      <h2>SELF CHECKOUT!</h2>

      <div className="payment-content">
        <div className="barcode">
          <img src="qr_code.png" alt="Payment Barcode" />
          <div className="total-amount-display">
            Total to Pay: <span className="price-number">{number}</span>
            <span className="price-symbol">{symbol}</span>
          </div>
        </div>

        <div className="process-steps">
          <div className="step">
            <div className="icon-circle">
              <HiOutlineShoppingCart size={24} />
            </div>
            <div className="step-text">
              <h3>Add products to cart</h3>
            </div>
          </div>

          <div className="step">
            <div className="icon-circle">
              <HiOutlineCreditCard size={24} />
            </div>
            <div className="step-text">
              <PaymentInstructions />
            </div>
          </div>

          <div className="step future">
            <div className="icon-circle">
              <HiOutlineMail size={24} />
            </div>
            <div className="step-text">
              We will send your order confirmation to the email you provided in
              the note.
            </div>
          </div>
          <div className="step future">
            <div className="icon-circle">
              <HiOutlineTruck size={24} />
            </div>
            <div className="step-text">We ship your order.</div>
          </div>
        </div>
      </div>

      <div className="confirm-button">
        <button onClick={handleConfirmPayment}>I’ve Completed Payment</button>
      </div>
    </div>
  );
}

export default Payment;
