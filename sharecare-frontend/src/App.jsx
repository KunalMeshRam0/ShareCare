import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import DonorDashboard from "./pages/DonorDashboard";
import NewDonation from "./pages/NewDonation";

import ProtectedRoute from "./components/ProtectedRoute";

import NgoDashboard from "./pages/NgoDashboard";
import NewRequest from "./pages/NewRequest";

import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/donor-dashboard" element={<DonorDashboard />} /> */}
        <Route path="/new-donation" element={<NewDonation />} />
        <Route path="/donor-dashboard" element={
          <ProtectedRoute>
          <DonorDashboard/>
          </ProtectedRoute>}/>

          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          <Route path="/new-request" element={<NewRequest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;