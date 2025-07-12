import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineMail,
  HiOutlineTruck,
  HiOutlineCube,
  HiArrowLeft,
  HiArrowRight,
  HiOutlineSupport,
} from "react-icons/hi";
import styles from "../css/Confirmation.module.css";

/**
 * Displays an order confirmation message and a visual timeline of the shipping process.
 * @returns {JSX.Element} The confirmation page component.
 */
function Confirmation() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div className={styles["confirmation-page"]}>
      <h2>Thank You for Your Order!</h2>
      <p>
        We're verifying your order and will send a confirmation email shortly.
      </p>
      <div className={styles["process-steps-container"]}>
        <div className={styles["process-steps"]}>
          <div className={styles.step}>
            <div className={styles["icon-circle"]}>
              <HiOutlineShoppingCart size={24} />
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles["icon-circle"]}>
              <HiOutlineCreditCard size={24} />
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles["icon-circle"]}>
              <HiOutlineMail size={24} />
            </div>
          </div>
          <div className={`${styles.step} ${styles.future}`}>
            <div className={styles["icon-circle"]}>
              <HiOutlineTruck size={24} />
            </div>
          </div>
          <div className={`${styles.step} ${styles.future}`}>
            <div className={styles["icon-circle"]}>
              <HiOutlineCube size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles["confirmation-questions"]}>
        <div className={styles["question-item"]}>
          <div
            className={styles["icon-circle-small"]}
            onClick={() => navigate("/payment")}
          >
            <HiArrowLeft size={20} />
          </div>
          <p>
            {isMobile
              ? "I have NOT pay successfully."
              : "Oops I have NOT pay successfully, how to handle this?"}
          </p>
        </div>
        <div className={styles["question-item"]}>
          <div
            className={styles["icon-circle-small"]}
            onClick={() => navigate("/faq")}
          >
            <HiArrowRight size={20} />
          </div>
          <p>
            {isMobile
              ? "When will I receive the order?"
              : "Done with the payment, when will I receive my order?"}
          </p>
        </div>
        <div className={styles["question-item"]}>
          <div
            className={styles["icon-circle-small"]}
            onClick={() => navigate("/contact-us")}
          >
            <HiOutlineSupport size={20} />
          </div>
          <p>
            {isMobile ? (
              <>
                Need help?{" "}
                <a
                  href="https://www.instagram.com/thesolus.journal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>{" "}
                or <Link to="/contact-us">here</Link>.
              </>
            ) : (
              <>
                Need help? Contact us on{" "}
                <a
                  href="https://www.instagram.com/thesolus.journal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>{" "}
                or <Link to="/contact-us">here</Link>.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
