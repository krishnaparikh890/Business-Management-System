import Sidebar from "../Components/Sidebar";
import Navbar2 from "../Components/Navbar2";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="fixed top-0 left-64 right-0 z-50 bg-white shadow">
          <Navbar2 />
        </div>
        <main className="pt-20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}