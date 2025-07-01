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

function Confirmation() {
  const navigate = useNavigate();

  return (
    <div
      className="confirmation-page"
      style={{ padding: "2rem", textAlign: "center" }}
    >
      <h2>Thank You for Your Order!</h2>
      <p>
        We're verifying your order and will send a confirmation email shortly.
      </p>
      <div>
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
              <h3>Payment</h3>
            </div>
          </div>

          <div className="step">
            <div className="icon-circle">
              <HiOutlineMail size={24} />
            </div>
            <div className="step-text">
              <h3>Receive confirmation email.</h3>
            </div>
          </div>
          <div className="step future">
            <div className="icon-circle">
              <HiOutlineTruck size={24} />
            </div>
            <div className="step-text">We ship your order.</div>
          </div>
          <div className="step future">
            <div className="icon-circle">
              <HiOutlineCube size={24} />
            </div>
            <div className="step-text">Receive your order.</div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#222",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Back to Homepage
      </button>
    </div>
  );
}

export default Confirmation;
