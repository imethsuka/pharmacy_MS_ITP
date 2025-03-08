import PrescriptionList from "../components/pharmacist/PrescriptionList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrescriptionDetails from "../components/pharmacist/PrescriptionDetails";

const PrescriptionManagement = () => {
  return (
    <Router>
      <Routes>
        <Route path="/prescriptions" element={<PrescriptionList />} />
        <Route path="/prescription/:id" element={<PrescriptionDetails />} />
      </Routes>
    </Router>
  );
};

export default PrescriptionManagement;