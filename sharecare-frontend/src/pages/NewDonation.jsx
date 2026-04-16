import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/NewDonation.css";

function NewDonation() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    itemName: "",
    description: "",
    quantity: "",
    condition: "good",
    location: "",
    transportMode: "ngo_pickup",
    images: []
  });

  const [previewImages, setPreviewImages] = useState([]);

  /* HANDLE TEXT INPUTS */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

  };

  /* HANDLE IMAGE UPLOAD */

  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    setForm(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    const newPreviews = files.map(file => URL.createObjectURL(file));

    setPreviewImages(prev => [...prev, ...newPreviews]);

  };

  /* REMOVE IMAGE */

  const removeImage = (index) => {

    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));

    setPreviewImages(prev =>
      prev.filter((_, i) => i !== index)
    );

  };

  /* SUBMIT FORM */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("category", form.category);
      formData.append("itemName", form.itemName);
      formData.append("description", form.description);
      formData.append("quantity", form.quantity);
      formData.append("condition", form.condition);
      formData.append("location", form.location);
      formData.append("transportMode", form.transportMode);

      form.images.forEach((image) => {
        formData.append("images", image);
      });

      await API.post("/items", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Donation submitted successfully");

      navigate("/donor-dashboard");

    } catch (error) {

      console.error("Donation Error:", error.response?.data || error);

      alert(
        error.response?.data?.message || "Error submitting donation"
      );

    }

  };

  return (
    <>
      <Navbar variant="profile" />

      <div className="donation-page">

        <div
          className="back-link"
          onClick={() => navigate("/donor-dashboard")}
        >
          ← Back to Dashboard
        </div>

        <div className="donation-card">

          <h2>Donate an Item</h2>

          <p className="subtitle">
            Fill in the details below to list your donation
          </p>

          <form onSubmit={handleSubmit} className="donation-form">

            <label>Category</label>

            <select name="category" value={form.category} onChange={handleChange} required>

              <option value="">Select category</option>
              <option value="wearables">Wearables</option>
              <option value="education">Educational Resources</option>
              <option value="medical">Medical Equipment</option>
              <option value="essentials">Non Medical Essentials</option>

            </select>

            <label>Item Name</label>

            <input
              name="itemName"
              value={form.itemName}
              placeholder="e.g., Winter Jackets, Medical Masks"
              onChange={handleChange}
              required
            />

            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              placeholder="Provide details about the item, including brand, size, or specifications"
              onChange={handleChange}
              required
            />

            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              placeholder="Number of items"
              onChange={handleChange}
              required
            />

            <label>Condition</label>

            <select name="condition" value={form.condition} onChange={handleChange}>

              <option value="new">New / Unused</option>
              <option value="good">Good Condition</option>
              <option value="fair">Fair Condition</option>

            </select>

            <label>Location</label>

            <input
              name="location"
              value={form.location}
              placeholder="City or area where item is located"
              onChange={handleChange}
              required
            />

            <label>Image Upload</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            <small>Upload clear photos of the item (optional)</small>

            {previewImages.length > 0 && (

              <div className="image-preview-container">

                {previewImages.map((img, index) => (

                  <div key={index} className="preview-box">

                    <img
                      src={img}
                      alt="preview"
                      className="preview-image"
                    />

                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>

                  </div>

                ))}

              </div>

            )}

            <label>Transport Mode</label>

            <select
              name="transportMode"
              value={form.transportMode}
              onChange={handleChange}
            >

              <option value="ngo_pickup">Pickup by NGO</option>
              <option value="self_delivery">I will deliver</option>
              <option value="shipping">Shipping service</option>

            </select>

            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/donor-dashboard")}
              >
                Cancel
              </button>

              <button type="submit" className="submit-btn">
                Submit Donation
              </button>

            </div>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default NewDonation;