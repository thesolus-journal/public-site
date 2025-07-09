import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { useCouponContext } from "../contexts/CouponContext";
import "../css/ShippingInformation.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxHa_XHeXueFlGE9qFDU_RbHXu5v2XBy1pCpxgSv6OTkpGwc3dcizbzJEOOX6yQDQAW/exec";

/**
 * Handles the collection of shipping and contact details from the user and
 * submits the order to a Google Sheet.
 * @returns {JSX.Element} The shipping information form component.
 */
function ShippingInformation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart } = useProductContext();
  const { discountPercent = 0, couponCode } = useCouponContext() || {};
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    occupation: "",
    referral: "",
  });

  const { totalBeforeDiscount, discountAmount, totalAmount } = useMemo(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const discount = (subtotal * discountPercent) / 100;
    const finalTotal = subtotal - discount;
    return {
      totalBeforeDiscount: subtotal,
      discountAmount: discount,
      totalAmount: finalTotal,
    };
  }, [cart, discountPercent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => navigate("/shopping-cart");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cartItemsString = cart
      .map((item) => {
        const name = item.personalization
          ? `${item.name} (Personalized: ${item.personalization})`
          : item.name;
        return `${name} x${item.quantity} (${(
          item.price * item.quantity
        ).toString()} VND)`;
      })
      .join(", ");

    const formData = new FormData();
    formData.append("Name", form.name);
    formData.append("Email", form.email);
    formData.append("Phone", form.phone);
    formData.append("Address", form.address);
    formData.append("DOB", form.dob);
    formData.append("Occupation", form.occupation);
    formData.append("Referral", form.referral);
    formData.append("CartItems", cartItemsString);
    formData.append("TotalBeforeDiscount", totalBeforeDiscount.toString());
    formData.append("DiscountAmount", discountAmount.toString());
    formData.append("Total", totalAmount.toString());
    formData.append("CouponCode", couponCode);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      navigate("/payment");
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shipping-page">
      <h2>Shipping & Contact Information</h2>

      <form className="shipping-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-row">
            <label htmlFor="name">
              Full Name<span className="required">*</span>:
            </label>
            <div className="form-field-container">
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="email">
              Email Address<span className="required">*</span>:
            </label>
            <div className="form-field-container">
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="We'll send your order confirmation here"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="phone">
              Phone Number<span className="required">*</span>:
            </label>
            <div className="form-field-container">
              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Shipper will contact this number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="address">
              Shipping Address<span className="required">*</span>:
            </label>
            <div className="form-field-container">
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Where we will deliver your order"
                required
                rows={3}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="form-group">
          <div className="form-row">
            <label htmlFor="referral">How did you hear about us?</label>
            <div className="form-field-container">
              <input
                id="referral"
                type="text"
                name="referral"
                value={form.referral}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="dob">Your DOB (date of birth):</label>
            <div className="form-field-container">
              <input
                id="dob"
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="occupation">What do you do?</label>
            <div className="form-field-container">
              <select
                id="occupation"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
              >
                <option value="">Select your occupation</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="writer">Writer</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-navigation">
          <button type="button" onClick={handleBack} disabled={isSubmitting}>
            Back
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingInformation;
