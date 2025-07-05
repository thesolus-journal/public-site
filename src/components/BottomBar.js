import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/BottomBar.css";

/**
 * A reusable link component for the bottom bar.
 * @param {object} props - The component props.
 * @param {string} props.to - The path for the link.
 * @param {string} props.children - The text to display.
 * @returns {JSX.Element} A Link component.
 */
const BottomLink = ({ to, children }) => (
  <Link to={to} className="bottom-link">
    {children}
  </Link>
);

/**
 * Displays the footer with contact information, social media links, and other
 * relevant links.
 * @returns {JSX.Element} The footer component.
 */
function BottomBar() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert("Thank you for subscribing!");
      setEmail("");
    } else {
      alert("Please enter your email address.");
    }
  };

  return (
    <footer className="bottom-bar">
      <div className="columns">
        <div className="column">
          <h3>Keep in Touch</h3>
          <p>
            Join our newsletter for product updates, promotions, organization
            tips, and more.
          </p>
          <div className="subscribe-container">
            <input
              type="email"
              placeholder="Your email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
          <h3>Follow us on:</h3>
          <p>Support hours are Mon - Sun: 2pm - 10pm GMT+7.</p>
        </div>
        <div className="column">
          <h3>Customer Support</h3>
          <BottomLink to="/faq">FAQs</BottomLink>
          <BottomLink to="/contact-us">Contact us</BottomLink>
          <BottomLink to="/review">Send a review</BottomLink>
          <BottomLink to="/for-business">For business</BottomLink>
        </div>
        <div className="column">
          <h3>Payment Options</h3>
          <BottomLink to="/zalopay">ZaloPay</BottomLink>
          <BottomLink to="/bank-transfer">Bank transfer</BottomLink>
        </div>
      </div>
    </footer>
  );
}

export default BottomBar;
