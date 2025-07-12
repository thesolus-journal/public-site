import React from "react";
import styles from "../css/BankTransfer.module.css";

/**
 * BankTransfer component displays information about bank transfer payment options.
 * @component
 * @returns {JSX.Element} The BankTransfer page element.
 */
function BankTransfer() {
  return (
    <div className={styles["page-container"]}>
      <h2>BANK TRANSFER</h2>
      <p>
        Details about bank transfer payment options will be available here soon.
      </p>
      <p>
        Thank you for your patience!
      </p>
    </div>
  );
}

export default BankTransfer;
