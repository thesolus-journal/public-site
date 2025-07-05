import React, { createContext, useState, useContext } from "react";

/**
 * @typedef {object} CouponContextValue
 * @property {number} discountPercent - The current discount percentage applied.
 * @property {string} couponCode - The currently applied coupon code.
 * @property {function(string): boolean} applyCoupon - Function to apply a coupon code.
 * @property {function(): void} clearCoupon - Function to clear the applied coupon.
 */

/**
 * CouponContext provides the coupon state and related functions to its children.
 * @type {React.Context<CouponContextValue>}
 */
const CouponContext = createContext();

/**
 * useCouponContext is a custom hook that provides access to the CouponContext value.
 * @returns {CouponContextValue}
 */
export const useCouponContext = () => useContext(CouponContext);

// In the future, you might fetch this from an API
const availableCoupons = [
  { code: "DISCOUNT10", discount: 10 },
  { code: "SOLUS20", discount: 20 },
  { code: "WELCOME5", discount: 5 },
];

/**
 * CouponProvider is a component that provides the CouponContext to its children.
 * It manages the coupon state and provides functions to interact with coupons.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element}
 */
export const CouponProvider = ({ children }) => {
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = (code) => {
    const normalizedCode = code.trim().toUpperCase();
    const coupon = availableCoupons.find((c) => c.code === normalizedCode);

    if (coupon) {
      setDiscountPercent(coupon.discount);
      setCouponCode(coupon.code);
      return true;
    } else {
      setDiscountPercent(0);
      setCouponCode("");
      return false;
    }
  };

  const clearCoupon = () => {
    setDiscountPercent(0);
    setCouponCode("");
  };

  return (
    <CouponContext.Provider
      value={{ discountPercent, couponCode, applyCoupon, clearCoupon }}
    >
      {children}
    </CouponContext.Provider>
  );
};
