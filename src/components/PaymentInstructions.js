import React from "react";

/**
 * Displays the detailed instructions for making a payment via QR code,
 * covering both desktop and smartphone scenarios.
 * @returns {JSX.Element} The payment instructions component.
 */
function PaymentInstructions() {
  return (
    <>
      <h3>Pay with your banking apps or Zalopay:</h3>
      <ol>
        <li>Scan the QR code using your Zalopay or Banking app.</li>
        <li>
          Enter the total payment amount and include your email in the payment
          note.
        </li>
      </ol>
      <h3>If you are using your smartphone</h3>
      <ol>
        <li>Save the QR code image to your phone.</li>
        <li>Open your ZaloPay or Banking app.</li>
        <li>Click on the QR scan function.</li>
        <li>
          When the camera is on, find the button (near the scan screen) to
          select the saved image from your photo library.
        </li>
        <li>
          After the app successfully scan the QR image, enter the total amount
          and add your email in the note.
        </li>
      </ol>
    </>
  );
}

export default PaymentInstructions;
