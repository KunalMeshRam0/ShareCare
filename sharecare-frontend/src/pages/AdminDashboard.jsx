import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Overview from "../components/AdminOverview";
import Donations from "../components/AdminDonations";
import NGO from "../components/AdminNGO";
import Transport from "../components/AdminTransport";

import "../styles/dashboard.css";

function AdminDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <>
      <Navbar variant="dashboard" />

      <div className="dashboard-container">

        <h2 className="dashboard-title">Admin Dashboard</h2>
        <p className="dashboard-subtitle">
          Manage platform operations and monitor system activity
        </p>

        {/* Tabs */}
        <div className="tabs">
          <button onClick={() => setTab("overview")}>Overview</button>
          <button onClick={() => setTab("donations")}>Verifications</button>
          <button onClick={() => setTab("ngo")}>NGO Approvals</button>
          <button onClick={() => setTab("transport")}>Transport</button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {tab === "overview" && <Overview />}
          {tab === "donations" && <Donations />}
          {tab === "ngo" && <NGO />}
          {tab === "transport" && <Transport />}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;