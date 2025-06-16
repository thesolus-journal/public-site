import "../css/NavigationBar.css";
import { Link } from "react-router-dom";

/**
 * NavigationBar component displays the top navigation menu with logo and links.
 * @component
 * @returns {JSX.Element} The navigation bar element.
 */
function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/about-us" className="nav-link">
          ABOUT US
        </Link>
        <Link to="/our-product" className="nav-link">
          OUR PRODUCT
        </Link>
        <div className="navbar-brand">
          <Link to="/" className="navbar-brand-link">
            <img src="logo.png" alt="logo" className="navbar-logo"></img>
          </Link>
        </div>
        <Link to="/personalize" className="nav-link">
          PERSONALIZE
        </Link>
        <Link to="/contact-us" className="nav-link">
          CONTACT US
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
