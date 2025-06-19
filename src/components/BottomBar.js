import "../css/BottomBar.css";
import { Link } from "react-router-dom";

function BottomLink(text, link) {
  return (
    <Link to={link} className="link">
      {text}
    </Link>
  );
}

function BottomBar() {
  return (
    <footer className="bottom-bar">
      <div className="columns">
        <div className="column-social-media">
          <h3>Keep in Touch</h3>
          <p>
            Join our newsletter for product updates, promotions, organization
            tips, and more.
          </p>
          <div className="subscribe-container">
            <input type="email" placeholder="Your email" className="input" />
            <button className="button">Subscribe</button>
          </div>
          <h3>Follow us on:</h3>
          <p>Support hours are Mon - Sun: 2pm - 10pm GMT+7.</p>
        </div>
        <div className="column-support">
          <h3>Customer Support</h3>
          {BottomLink("FAQs", "/contact-us")}
          {BottomLink("Contact us", "/contact-us")}
          {BottomLink("Send a review", "/contact-us")}
          {BottomLink("For business", "/contact-us")}
        </div>
        <div className="column-misc">
          <h3>Payment Options</h3>
          {BottomLink("ZaloPay", "/contact-us")}
          {BottomLink("Bank transfer", "/contact-us")}
        </div>
      </div>
    </footer>
  );
}

export default BottomBar;
