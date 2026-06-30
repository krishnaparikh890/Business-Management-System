import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./Pages/Dashboard";
import Staff from "./Pages/Staff";
import AddStaff from "./Components/AddStaff";
import Editstaff from "./Components/Editstaff";
import SuccessModal from "./Components/SuccessModal";
import PaymentVoucher from "./Pages/PaymentVoucher";
import CreateVoucher from './Components/CreateVoucher';
import Memo from './Pages/Memo';
import MemoDetail from './Components/MemoDetail';
import CreateMemo from './Components/CreateMemo';
import Notification from "./Pages/Notification";
import Officebudget from "./Pages/Officebudget";
import Circulars from "./Pages/Circulars";
import Logistics from "./Pages/Logistics";
import MaintenanceModule from "./Pages/MaintenanceModule";
import CapacityBuilding from "./Pages/CapacityBuilding";
import InventoryModule from "./Pages/InventoryModule";
import ProcurementModule from "./Pages/ProcurementModule";
import MasterPayrollModule from "./Pages/MasterPayrollModule";
import Sidebar from "./Components/Sidebar";


export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Staff" element={<Staff />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="/edit-staff" element={<Editstaff />} />
        <Route path="/Payment-voucher" element={<PaymentVoucher />} />
        <Route path="/success-modal" element={<SuccessModal />} />
        <Route path="/CreateVoucher" element={<CreateVoucher />} />
        <Route path="/Memo" element={<Memo />} />
        <Route path="/Officebudget" element={<Officebudget />} />
        <Route path="/memo/:id" element={<MemoDetail />} />
        <Route path="/CreateMemo" element={<CreateMemo />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Circulars" element={<Circulars />} />
        <Route path="/Logistics" element={<Logistics />} />
        <Route path="/MaintenanceModule" element={<MaintenanceModule />} />
        <Route path="/CapacityBuilding" element={<CapacityBuilding />} />
        <Route path="/InventoryModule" element={<InventoryModule />} />
        <Route path="/ProcurementModule" element={<ProcurementModule />} />
        <Route path="/MasterPayrollModule" element={<MasterPayrollModule />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}