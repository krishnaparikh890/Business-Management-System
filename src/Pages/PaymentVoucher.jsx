import React, { useState } from "react";
import CreateVoucher from '../Components/CreateVoucher';

export default function PaymentVoucher() {
  const [filter, setFilter] = useState("All");
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <CreateVoucher onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Payment Voucher
        </h1>
        <p className="text-sm text-gray-500">
          Create payment voucher
        </p>
      </div>

      
      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">250</h2>
          <p className="text-gray-500 text-sm">
            Total payment vouchers
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 outline-none text-sm"
          >
            <option>All</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>

         
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Create Payment Voucher
          </button>
        </div>
      </div>

   
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="font-semibold text-lg">
            All Payment Vouchers
          </h2>

          <div className="text-sm text-gray-600">
            Showing
            <select className="border rounded px-2 py-1 mx-2">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            per page
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3">S/N</th>
                <th className="text-left px-6 py-3">Subject</th>
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Prepared By</th>
                <th className="text-left px-6 py-3">Send To</th>
                <th className="text-left px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
             
            </tbody>
          </table>

         
          <div className="text-center py-10 text-gray-400">
            No payment vouchers found.
          </div>
        </div>
      </div>
    </div>
  );
}