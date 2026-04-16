import "../styles/DonorDashboard.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function DonorDashboard() {
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [transport, setTransport] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchDonations();
    fetchTransport();
  }, []);

  /* ================= FETCH REQUESTS ================= */
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/requests/donor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH DONATIONS ================= */
  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/items/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDonations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH TRANSPORT ================= */
  const fetchTransport = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/transport/donor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransport(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= APPROVE / REJECT ================= */
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/requests/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="donor-container">
        {/* HEADER */}
        <div className="donor-header">
          <div>
            <h1>Donor Dashboard</h1>
            <p>Manage donations, requests & deliveries</p>
          </div>

          <button className="primary-btn">+ New Donation</button>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Requests</p>
            <h2>{requests.length}</h2>
          </div>

          <div className="stat-card">
            <p>Active Deliveries</p>
            <h2>{transport.length}</h2>
          </div>

          <div className="stat-card">
            <p>My Donations</p>
            <h2>{donations.length}</h2>
          </div>
        </div>

        {/* MY DONATIONS */}
        <div className="card">
          <h3>My Donations</h3>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="3">No donations yet</td>
                </tr>
              ) : (
                donations.map((d) => (
                  <tr key={d._id}>
                    <td>{d.itemName}</td>
                    <td>{d.category}</td>
                    <td>
                      <span className={`badge ${d.status}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* NGO REQUESTS */}
        <div className="card">
          <h3>NGO Requests</h3>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>NGO</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="4">No requests available</td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={r._id}>
                    <td>{r.item?.itemName}</td>
                    <td>{r.ngo?.name}</td>
                    <td>
                      <span className={`badge ${r.status}`}>
                        {r.status}
                      </span>
                    </td>

                    <td>
                      {r.status === "pending" ? (
                        <div className="action-group">
                          <button
                            className="approve-btn"
                            onClick={() =>
                              updateStatus(r._id, "approved")
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              updateStatus(r._id, "rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        "Done"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* DELIVERY */}
        <div className="card">
          <h3>Delivery Tracking</h3>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>NGO</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transport.length === 0 ? (
                <tr>
                  <td colSpan="3">No deliveries yet</td>
                </tr>
              ) : (
                transport.map((t) => (
                  <tr key={t._id}>
                    <td>{t.item?.itemName}</td>
                    <td>{t.to?.name}</td>
                    <td>
                      <span className={`badge ${t.status}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DonorDashboard;