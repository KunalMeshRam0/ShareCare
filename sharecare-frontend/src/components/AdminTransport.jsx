import { useEffect, useState } from "react";
import API from "../services/api";

function AdminTransport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/admin/transport");
    setData(res.data);
  };

  return (
    <div className="table-container">
      <h3>Transport Tracking</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>From (Donor)</th>
            <th>To (NGO)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6">No transport records</td>
            </tr>
          ) : (
            data.map((t) => (
              <tr key={t._id}>
                <td>{t._id.slice(-5)}</td>
                <td>{t.item}</td>
                <td>{t.from?.name}</td>
                <td>{t.to?.name}</td>
                <td>{t.status}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTransport;