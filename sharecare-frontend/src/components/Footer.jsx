import logo from "../assets/sharecare-logo.png";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <div className="brand-row">
            <img src={logo} alt="ShareCare logo" className="footer-logo" />
            <span className="brand-name">ShareCare</span>
          </div>

          <p className="brand-desc">
            A trusted platform for donating essential goods to verified NGOs
            and communities.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Sign Up</a>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>
            For inquiries, please contact your local NGO representative.
          </p>
        </div>

      </div>

      <div className="footer-divider"></div>

      <p className="copyright">
        © 2026 ShareCare. All rights reserved.
      </p>

    </footer>
  );
}

export default Footer;