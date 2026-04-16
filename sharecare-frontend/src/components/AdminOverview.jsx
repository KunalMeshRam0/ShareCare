import { useEffect, useState } from "react";
import API from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function AdminOverview() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [statsRes, chartRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/admin/donation-stats")
      ]);

      setStats(statsRes.data);
      setChartData(chartRes.data);

    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ LOADING UI
  if (loading) {
    return <div className="loader">Loading dashboard...</div>;
  }

  // ❌ ERROR UI
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>

      {/* STATS */}
      <div className="card-grid">

        <div className="card fade-in">
          <h4>Total Users</h4>
          <h2>{stats.totalUsers || 0}</h2>
        </div>

        <div className="card fade-in">
          <h4>Total Donations</h4>
          <h2>{stats.totalDonations || 0}</h2>
        </div>

        <div className="card fade-in">
          <h4>Active NGOs</h4>
          <h2>{stats.ngos || 0}</h2>
        </div>

        <div className="card fade-in">
          <h4>Pending Approvals</h4>
          <h2>{stats.pending || 0}</h2>
        </div>

      </div>

      {/* CHART */}
      <div className="chart-container fade-in">
        <h3>Donation Trends</h3>

        {chartData.length === 0 ? (
          <p className="empty">No donation data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="donations"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}

export default AdminOverview;