import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineMail,
  HiOutlineTruck,
  HiOutlineCube,
} from "react-icons/hi";
import "../css/Confirmation.css";

/**
 * Displays an order confirmation message and a visual timeline of the shipping process.
 * @returns {JSX.Element} The confirmation page component.
 */
function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-page">
      <h2>Thank You for Your Order!</h2>
      <p>
        We're verifying your order and will send a confirmation email shortly.
      </p>
      <div className="process-steps-container">
        <div className="process-steps">
          <div className="step">
            <div className="icon-circle">
              <HiOutlineShoppingCart size={24} />
            </div>
          </div>

          <div className="step">
            <div className="icon-circle">
              <HiOutlineCreditCard size={24} />
            </div>
          </div>

          <div className="step">
            <div className="icon-circle">
              <HiOutlineMail size={24} />
            </div>
          </div>
          <div className="step future">
            <div className="icon-circle">
              <HiOutlineTruck size={24} />
            </div>
          </div>
          <div className="step future">
            <div className="icon-circle">
              <HiOutlineCube size={24} />
            </div>
          </div>
        </div>
      </div>
      <button className="home-button" onClick={() => navigate("/")}>
        Back to Homepage
      </button>
    </div>
  );
}

export default Confirmation;
