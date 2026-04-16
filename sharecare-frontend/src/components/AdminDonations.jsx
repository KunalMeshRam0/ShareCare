import { useEffect, useState } from "react";
import API from "../services/api";

function Donations() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/admin/donations");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approve = async (id) => {
    await API.put(`/admin/donation/${id}`);
    alert("Approved");
    fetchData(); // ✅ refresh
  };

  return (
    <div className="table-container">
      <h3>Donation Verification</h3>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Donor</th>
            <th>Assigned NGO</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No donations found</td>
            </tr>
          ) : (
            data.map((d) => (
              <tr key={d._id}>
                <td>{d.itemName}</td>

                {/* ✅ FIX donor */}
                <td>{d.donor?.name || "Unknown"}</td>

                {/* ✅ FIX NGO */}
                <td>{d.assignedNGO?.name || "Not assigned"}</td>

                <td>{d.status}</td>

                <td>
                  {d.status === "pending" && (
                    <button onClick={() => approve(d._id)}>
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Donations;