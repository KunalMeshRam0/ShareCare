import { useEffect, useState } from "react";
import API from "../services/api";

function AdminRequests() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/requests");
    setData(res.data);
  };

  const approve = async (id) => {
    await API.put(`/requests/${id}`);
    alert("Approved");
    fetchData();
  };

  return (
    <div className="table-container">

      <h3>Donation Requests</h3>

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
          {data.map(r => (
            <tr key={r._id}>
              <td>{r.donation.itemName}</td>
              <td>{r.ngo.name}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "pending" && (
                  <button onClick={() => approve(r._id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default AdminRequests;