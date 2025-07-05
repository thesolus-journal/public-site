import { Link, NavLink } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import "../css/NavigationBar.css";

/**
 * A reusable navigation link component that indicates active status.
 * @param {object} props - The component props.
 * @param {string} props.to - The path for the link.
 * @param {string} props.children - The text to display.
 * @returns {JSX.Element} A NavLink component.
 */
const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
  >
    {children}
  </NavLink>
);

/**
 * Displays the top navigation menu with logo and links.
 * @returns {JSX.Element} The navigation bar component.
 */
function NavigationBar() {
  const { totalCartItems } = useProductContext();

  return (
    <nav className="navigation-bar">
      <div className="nav-content">
        <Link to="/" className="brand-link">
          <img src="/logo.png" alt="logo" className="brand-logo" />
        </Link>
        <div className="nav-links">
          <NavItem to="/about-us">ABOUT US</NavItem>
          <NavItem to="/our-product">OUR PRODUCT</NavItem>
          <NavItem to="/personalize">PERSONALIZE</NavItem>
          <NavItem to="/shopping-cart">
            <span>SHOPPING CART</span>
            {totalCartItems > 0 && (
              <span className="cart-badge">
                {totalCartItems > 9 ? "9+" : totalCartItems}
              </span>
            )}
          </NavItem>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
