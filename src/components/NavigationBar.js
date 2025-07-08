import { Link, NavLink } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import "../css/NavigationBar.css";
import React, { useState, useEffect, memo } from "react";
import logo from "../assets/logo.png";

const NavItem = memo(({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
  >
    {children}
  </NavLink>
));

/**
 * Displays the top navigation menu with logo and links.
 * @returns {JSX.Element} The navigation bar component.
 */
function NavigationBar() {
  const { totalCartItems } = useProductContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navigation-bar">
      <div className="nav-content">
        <Link to="/" className="brand-link">
          <img src={logo} alt="logo" className="brand-logo" />
        </Link>
        <div className="nav-links">
          <NavItem to="/about-us">{isMobile ? "ABOUT" : "ABOUT US"}</NavItem>
          <NavItem to="/our-product">
            {isMobile ? "PRODUCT" : "OUR PRODUCT"}
          </NavItem>
          <NavItem to="/personalize">PERSONALIZE</NavItem>
          <NavItem to="/preview">PREVIEW</NavItem>
          <NavItem to="/shopping-cart">
            <span>{isMobile ? "CART" : "SHOPPING CART"}</span>
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
