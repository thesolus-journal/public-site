import React, { useState } from "react";
import "../css/Review.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxNjNhtE-jXRQip0mGZ6Zq_bTWwziBOI8JzfLN3HbRpra9P9bWeDQg-d3bBdLwPQm0R/exec"; // Placeholder URL

/**
 * Review component displays a form for users to leave a review.
 * @component
 * @returns {JSX.Element} The review page element.
 */
function Review() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    review: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = new FormData();
    dataToSend.append("Name", formData.name);
    dataToSend.append("Email", formData.email);
    dataToSend.append("Rating", formData.rating);
    dataToSend.append("Review", formData.review);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      alert("Thank you for your review! We appreciate your feedback.");
      setFormData({
        name: "",
        email: "",
        rating: 0,
        review: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-page">
      <h2>LEAVE A REVIEW</h2>
      <p className="review-intro">
        We'd love to hear about your experience with us!
      </p>

      <form className="review-form" onSubmit={handleSubmit}>
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
          <label htmlFor="rating">Rating*</label>
          <div className="form-field-container">
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    type="button"
                    key={ratingValue}
                    className={
                      (hoverRating || formData.rating) >= ratingValue
                        ? "on"
                        : "off"
                    }
                    onClick={() => handleRatingClick(ratingValue)}
                    onMouseEnter={() => handleMouseEnter(ratingValue)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="review">Your Review*</label>
          <div className="form-field-container">
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Please share your experience here"
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
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Review;
