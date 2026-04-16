import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/NewRequest.css";

function NewRequest() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Request submitted");

    navigate("/ngo-dashboard");
  };

  return (
    <>
      <Navbar variant="profile" />

      <div className="request-page">

        <div
          className="back-link"
          onClick={() => navigate("/ngo-dashboard")}
        >
          ← Back to Dashboard
        </div>

        <div className="request-card">

          <h2>Make a Request</h2>

          <p className="subtitle">
            Request items needed for your NGO
          </p>

          <form onSubmit={handleSubmit} className="request-form">

            <label>Item Needed</label>
            <input
              placeholder="e.g. Winter Blankets"
            />

            <label>Quantity</label>
            <input
              type="number"
              placeholder="Number of items required"
            />

            <label>Reason</label>
            <textarea
              placeholder="Explain why your NGO needs this item"
            />

            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/ngo-dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-btn"
              >
                Submit Request
              </button>

            </div>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default NewRequest;