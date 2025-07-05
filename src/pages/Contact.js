import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Contact.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxPr67q1E7aletsvL5Pr7NMWRhpgmicHqjrMcoWCsfX_JFfsLUp_tV_d5L-zSIXtLTK/exec";

/**
 * Contact component displays a contact form for user inquiries.
 * @component
 * @returns {JSX.Element} The contact page element.
 */
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = new FormData();
    dataToSend.append("Name", formData.name);
    dataToSend.append("Email", formData.email);
    dataToSend.append("Phone", formData.phone);
    dataToSend.append("Topic", formData.topic);
    dataToSend.append("Message", formData.message);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      alert("Thank you for your message! We will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <h2>CONTACT US</h2>
      <p className="contact-intro">
        Have a question? You might find the answer in our{" "}
        <Link to="/faq">FAQs!</Link>
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Your Name*</label>
          <div className="form-field-container">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="email">Email*</label>
          <div className="form-field-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="phone">Phone*</label>
          <div className="form-field-container">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="topic">Topics*</label>
          <div className="form-field-container">
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            >
              <option value="">Select a topic</option>
              <option value="order_question">
                I have a question about my order
              </option>
              <option value="payment_help">
                I need help with payment or checkout
              </option>
              <option value="discount_code">
                My discount code isn't working
              </option>
              <option value="feedback">I'd love to leave some feedback</option>
              <option value="website_issue">
                I found an issue with the website
              </option>
              <option value="collaboration">
                I want to collaborate or partner with you
              </option>
              <option value="wholesale">
                I'm interested in wholesale options
              </option>
              <option value="other">Something else not listed</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="message">Message*</label>
          <div className="form-field-container">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please type your messages here"
              rows="8"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-navigation">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
