import "../css/NavigationBar.css";
import { Link } from "react-router-dom";

/**
 * NavigationBar component displays the top navigation menu with logo and links.
 * @component
 * @returns {JSX.Element} The navigation bar element.
 */
function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <div className="links">
        <Link to="/about-us" className="link">
          ABOUT US
        </Link>
        <Link to="/our-product" className="link">
          OUR PRODUCT
        </Link>
        <Link to="/" className="brand-link">
          <img src="logo.png" alt="logo" className="brand-logo"></img>
        </Link>
        <Link to="/personalize" className="link">
          PERSONALIZE
        </Link>
        <Link to="/contact-us" className="link">
          CONTACT US
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
