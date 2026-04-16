import React from 'react'
import Navbar from '../components/Navbar.jsx'
import '../styles/LandingPage.css'


const LandingPage = () => {
  return (
    <div>
        <div>
            <Navbar variant="auth"/>
        </div>
        <div className='content'>
          <section className='welcome-section'>
            <div className='welcome-content'>
              <h1>Welcome to ShareCare!</h1>
              <h3>A Trusted Platform for Donating Essential Goods</h3>
              <p>Connect donors with verified NGOs to ensure essential items reach those who need them most. A transparent, secure platform for meaningful impact.</p>
            </div>

            <div className='donation-link-buttons'>
              <a href="#" className='donate-link'>Donate Now</a>
              <a href="#" className='ngo-link'>Request Items</a>
            </div>
          </section>


          {/* Supported Categories */}
<section className="categories-section">
  <h2>Supported Categories</h2>

  <div className="categories-grid">
    <div className="category-card">
      <h3>Non-Medical Essentials</h3>
      <p>Food, household items, and daily necessities</p>
    </div>

    <div className="category-card">
      <h3>Educational Resources</h3>
      <p>Books, stationery, and learning materials</p>
    </div>

    <div className="category-card">
      <h3>Medical Equipment</h3>
      <p>Healthcare supplies and medical devices</p>
    </div>

    <div className="category-card">
      <h3>Wearables</h3>
      <p>Clothing, footwear, and accessories</p>
    </div>
  </div>
</section>


{/* How It Works */}
<section className="how-section">
  <h2>How It Works</h2>

  <div className="steps-container">
    <div className="step">
      <div className="circle">1</div>
      <h4>List an item</h4>
      <p>Add details about your donation</p>
    </div>

    <div className="step">
      <div className="circle">2</div>
      <h4>Verification</h4>
      <p>Our team reviews your listing</p>
    </div>

    <div className="step">
      <div className="circle">3</div>
      <h4>Request by NGO</h4>
      <p>Verified NGOs request items</p>
    </div>

    <div className="step">
      <div className="circle">4</div>
      <h4>Pickup / Delivery</h4>
      <p>Arrange transport logistics</p>
    </div>

    <div className="step">
      <div className="circle">5</div>
      <h4>Completion</h4>
      <p>Confirm successful delivery</p>
    </div>
  </div>
</section>


{/* Platform Impact */}
<section className="impact-section">
  <h2>Platform Impact</h2>

  <div className="impact-cards">
    <div className="impact-card">
      <h1>12,450</h1>
      <p>Items Donated</p>
    </div>

    <div className="impact-card">
      <h1>285</h1>
      <p>NGOs Registered</p>
    </div>

    <div className="impact-card">
      <h1>8,320</h1>
      <p>Active Donors</p>
    </div>
  </div>
</section>


{/* Footer */}
<footer className="footer">
  <div className="footer-container">

    <div>
      <h3>ShareCare</h3>
      <p>
        A trusted platform for donating essential goods to verified NGOs and communities.
      </p>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <p>Home</p>
      <p>Login</p>
      <p>Sign Up</p>
    </div>

    <div>
      <h4>Contact</h4>
      <p>For inquiries, please contact your local NGO representative.</p>
    </div>

  </div>

  <div className="copyright">
    © 2026 ShareCare. All rights reserved.
  </div>
</footer>


          
        </div>
      </div>
  )
}

export default LandingPage