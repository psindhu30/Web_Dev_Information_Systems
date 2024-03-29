import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer class="footer-distributed">

    <div class="footer-left">

      <h3>Journey<span>High</span></h3>

      <p class="footer-links">
        <a href="/" class="link-1">Home</a>
      
        <a href="/hotels">Hotels</a>
      
        <a href="/profile">Profile</a>
        
        <a href="#">Contact</a>
      </p>

      <p class="footer-company-name">Company Name © 2015</p>
    </div>

    <div class="footer-center">

      <div>
        <i class="fa fa-map-marker"></i>
        <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
      </div>

      <div>
        <i class="fa fa-phone"></i>
        <p>+1.555.555.5555</p>
      </div>

      <div>
        <i class="fa fa-envelope"></i>
        <p><a href="mailto:support@company.com">support@company.com</a></p>
      </div>

    </div>

    <div class="footer-right">

      <p class="footer-company-about">
        <span>About the company</span>
        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
      </p>


    </div>

  </footer>
  );
}

export default Footer;
