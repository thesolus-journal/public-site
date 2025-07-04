import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineMail,
  HiOutlineTruck,
} from "react-icons/hi";
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

  return (
    <div className="payment-page">
      <h2>SELF CHECKOUT!</h2>

      <div className="payment-content">
        <div className="barcode">
          <img src="qr_code.png" alt="Payment Barcode" />
          <div className="total-amount-display">
            Total to Pay: VND {displayAmount.toLocaleString()}
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
              <h3>Pay with your banking apps or Zalopay:</h3>
              <ol>
                <li>Scan the QR code using your Zalopay or Banking app.</li>
                <li>
                  Enter the total payment amount and include your email in the
                  payment note.
                </li>
              </ol>
              <h3>If you are using your smartphone</h3>
              <ol>
                <li>Save the QR code image to your phone.</li>
                <li>Open your ZaloPay or Banking app.</li>
                <li>Click on the QR scan function.</li>
                <li>
                  When the camera is on, find the button (near the scan screen)
                  to select the saved image from your photo library.
                </li>
                <li>
                  After the app successfully scan the QR image, enter the total
                  amount and add your email in the note.
                </li>
              </ol>
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
