import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/NgoDashboard.css";

function NgoDashboard() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [requestedItems, setRequestedItems] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchMyRequests();
  }, []);

  /* ================= FETCH ITEMS ================= */
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/items", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setItems(res.data);

    } catch (err) {
      console.log("Fetch items error:", err);
    }
  };

  /* ================= FETCH MY REQUESTS ================= */
  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/requests/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const requestedIds = res.data.map(r => r.item._id);
      setRequestedItems(requestedIds);

    } catch (err) {
      console.log("Fetch requests error:", err);
    }
  };

  /* ================= REQUEST ================= */
  const handleRequest = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/requests",
        {
          itemId,
          message: "Need this item"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request sent");

      // instant UI update
      setRequestedItems(prev => [...prev, itemId]);

    } catch (err) {
      console.log(err);
      alert("Request failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="ngo-dashboard">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1>NGO Dashboard</h1>
            <p>Manage requests, donations & transport</p>
          </div>

          <button className="btn-primary">
            + New Request
          </button>
        </div>

        {/* SEARCH */}
        <div className="search-bar">
          <input placeholder="Search items..." />
          <select>
            <option>All Categories</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="dashboard-card">

          <h3>Available Donations</h3>

          <table className="modern-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Donor</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4">No donations available</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.donor?.name}</td>

                    <td>
                      {requestedItems.includes(item._id) ? (
                        <span className="badge assigned">Requested</span>
                      ) : item.status === "available" ? (
                        <div className="action-buttons">

                          <button
                            className="btn-primary"
                            onClick={() => handleRequest(item._id)}
                          >
                            Request
                          </button>

                          <button
                            className="btn-secondary"
                            onClick={() => setSelectedItem(item)}
                          >
                            View
                          </button>

                        </div>
                      ) : (
                        <span className="badge assigned">Unavailable</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

        {/* MODAL */}
        {selectedItem && (
          <div className="modal">
            <div className="modal-content">

              <h3>Donation Details</h3>

              <p><strong>Item:</strong> {selectedItem.itemName}</p>
              <p><strong>Category:</strong> {selectedItem.category}</p>
              <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
              <p><strong>Condition:</strong> {selectedItem.condition}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
              <p><strong>Description:</strong> {selectedItem.description}</p>

              <button
                className="btn-primary"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>

            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default NgoDashboard;