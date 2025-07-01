import React, { createContext, useState, useContext } from "react";

const CouponContext = createContext();

export const useCouponContext = () => useContext(CouponContext);

export const CouponProvider = ({ children }) => {
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === "DISCOUNT10") {
      setDiscountPercent(10);
      setCouponCode("DISCOUNT10");
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
