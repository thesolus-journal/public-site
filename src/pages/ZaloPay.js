import PaymentInstructions from "../components/PaymentInstructions";

/**
 * ZaloPay component displays the ZaloPay payment method and instructions.
 * @returns {JSX.Element} The ZaloPay page element.
 */
function ZaloPay() {
  return (
    <div className="payment-page">
      <h2>Pay with ZaloPay</h2>

      <div className="payment-content">
        <div className="barcode">
          <img src="qr_code.png" alt="Payment Barcode" />
        </div>

        <div className="">
          <div className="step">
            <div className="step-text">
              <PaymentInstructions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZaloPay;
