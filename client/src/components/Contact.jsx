import React, { useState } from "react";
import "../styles/contact.css";

function Contact() {
  const [email, setEmail] = useState("");

  return (
    <section className="contact-section flex-center">
      <div className="contact-container flex-center">
        <div className="contact-text flex-center">
          <h3 className="contact-heading">Effortless savings for both your time and your wallet!</h3>
          <span className="contact-text">
            Sign up and we'll send the best deals to you
          </span>
        </div>
        <div className="contact-input-container flex-center">
          <input
            type="text"
            className="header-input contact-input"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button className="btn contact-btn">subscribe</button>
        </div>
      </div>
    </section>
  );
}

export default Contact;
