import React from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineMail,
  HiOutlineTruck,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import "../css/FAQ.css";

/**
 * FAQ component displays a list of frequently asked questions and their answers.
 * @component
 * @returns {JSX.Element} The FAQ page element.
 */
const faqs = [
  {
    icon: <HiOutlineCurrencyDollar />,
    title: "Proceed payment",
    q: "I haven't paid successfully for my order, will it still be delivered?",
    a: "Your order will be packaged and shipped once the payment has been successfully completed. If your payment hasn't gone through yet, don't worry, you'll receive an email with the current payment status and instructions to help you complete the process!",
  },
  {
    icon: <HiOutlineMail />,
    title: "Confirmation email",
    q: "When and how will I receive my order confirmation?",
    a: "Order confirmations are typically sent within 2 hours after your purchase is complete. If you need urgent assistance, please don't hesitate to send us a direct message on Instagram at @thesolus.journal or contact us here. We're here to help!",
  },
  {
    icon: <HiOutlineTruck />,
    title: "Order shipment",
    q: "How can I track the status of my shipment?",
    a: "We'll send you updates on your order and shipment status directly to your email address. Keep an eye on your inbox, and feel free to reach out if you have any questions along the way.",
  },
  {
    icon: <HiOutlineCheckCircle />,
    title: "Delivery complete",
    q: "Can I request a refund or return for my order?",
    a: "At this time, we do not have a refund policy in place. However, your satisfaction is incredibly important to us. If you have any concerns, feedback, or special requests, please don't hesitate to reach out here. We're always happy to listen and assist in any way we can.",
  },
];

function FAQ() {
  return (
    <div className="faq-page">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-header">
              <div className="faq-icon">{faq.icon}</div>
              <h3>{faq.title}</h3>
            </div>
            <div className="faq-content">
              <p>
                <strong>Q:</strong> {faq.q}
              </p>
              <p>
                <strong>A:</strong> {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
