import { useEffect, useState } from "react";
import API from "../services/api";

function AdminNGO() {

  const [ngos, setNgos] = useState([]);

  /* ================= FETCH ================= */
  const fetchNGOs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/ngos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNgos(res.data);

    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNGOs();
  }, []);

  /* ================= APPROVE ================= */
  const approve = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/ngo/${id}`,
        { status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("NGO Approved");
      fetchNGOs();

    } catch (err) {
      console.log("Approve error:", err);
    }
  };

  /* ================= REJECT ================= */
  const reject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/ngo/${id}`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchNGOs();

    } catch (err) {
      console.log("Reject error:", err);
    }
  };

  return (
    <div className="table-container">

      <h3>NGO Registration Approvals</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Darpan ID</th>
            <th>Registration No</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {ngos.length === 0 ? (
            <tr>
              <td colSpan="7">No NGO requests</td>
            </tr>
          ) : (

            ngos.map((ngo) => (

              <tr key={ngo._id}>

                <td>{ngo._id.slice(-5)}</td>
                <td>{ngo.name}</td>
                <td>{ngo.email}</td>
                <td>{ngo.ngoDetails?.darpanId}</td>
                <td>{ngo.ngoDetails?.registrationNo}</td>

                <td>
                  <span className={`badge ${ngo.ngoDetails?.status}`}>
                    {ngo.ngoDetails?.status}
                  </span>
                </td>

                <td>

                  {ngo.ngoDetails?.status === "pending" ? (
                    <>
                      <button onClick={() => approve(ngo._id)}>
                        Approve
                      </button>

                      <button onClick={() => reject(ngo._id)}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Done</span>
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

export default AdminNGO;