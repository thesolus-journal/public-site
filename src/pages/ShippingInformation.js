import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { useCouponContext } from "../contexts/CouponContext"; // Assuming you created this
import "../css/ShippingInformation.css";

function ShippingInformation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart } = useProductContext();
  const { discountPercent = 0 } = useCouponContext() || {};

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

  // Calculate totals here (before return)
  const totalBeforeDiscount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountAmount = (totalBeforeDiscount * discountPercent) / 100;
  const totalAmount = totalBeforeDiscount - discountAmount;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBack() {
    navigate("/shopping-cart");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const cartItemsString = cart
      .map(
        (item) =>
          `${item.title || item.name} x${item.quantity} (${item.price * item.quantity} VND)`,
      )
      .join(", ");

    const payload = new URLSearchParams();
    payload.append("Name", form.name);
    payload.append("Email", form.email);
    payload.append("Phone", form.phone);
    payload.append("Address", form.address);
    payload.append("DOB", form.dob);
    payload.append("Occupation", form.occupation);
    payload.append("Referral", form.referral);
    payload.append("CartItems", cartItemsString);
    payload.append("Total", totalAmount.toLocaleString());

    const url =
      "https://script.google.com/macros/s/AKfycbxHa_XHeXueFlGE9qFDU_RbHXu5v2XBy1pCpxgSv6OTkpGwc3dcizbzJEOOX6yQDQAW/exec";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    })
      .then((res) => res.text())
      .then(() => {
        setIsSubmitting(false);
        window.alert("Thank you for shopping with us. Your order is recorded!");
        navigate("/payment");
      })
      .catch((error) => {
        console.error("Submission error:", error);
        setIsSubmitting(false);
        window.alert("An error occurred. Please try again.");
      });
  }

  return (
    <div className="shipping-page">
      <h2>Shipping & Contact Information</h2>

      <form className="shipping-form" onSubmit={handleSubmit}>
        {/* First group: mandatory fields */}
        <div className="form-group">
          <div className="form-row">
            <label htmlFor="name">
              Full Name<span className="required">*</span>:
            </label>
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

          <div className="form-row">
            <label htmlFor="email">
              Email Address<span className="required">*</span>:
            </label>
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

          <div className="form-row">
            <label htmlFor="phone">
              Phone Number<span className="required">*</span>:
            </label>
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

          <div className="form-row">
            <label htmlFor="address">
              Shipping Address<span className="required">*</span>:
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Where we will deliver your order"
              required
            />
          </div>
        </div>

        <hr />

        {/* Second group: optional fields */}
        <div className="form-group">
          <div className="form-row">
            <label htmlFor="referral">How did you hear about us?</label>
            <input
              id="referral"
              type="text"
              name="referral"
              value={form.referral}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <div className="form-row">
            <label htmlFor="dob">Your DOB (date of birth):</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="occupation">What do you do?</label>
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
