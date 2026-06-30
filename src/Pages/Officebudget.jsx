import React, { useState } from "react";
import OfficebudgetData from "../Data/OfficebudgetData.json";
import { Plus, ArrowLeft } from "lucide-react";

const Officebudget = () => {
  const [budgets, setBudgets] = useState(OfficebudgetData);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [budgetRequest, setBudgetRequest] = useState([]);
  const [formData, setFormData] = useState({
    budgetNo: "",
    description: "",
    amount: "",
    date: "",
    receivingOffice: "",
  });

  const totalBudget = 23000000;
  const amountUsed = 10000000;
  const budgetBalance = totalBudget - amountUsed;
  const budgetPercentage = (amountUsed / totalBudget) * 100;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (
      formData.budgetNo &&
      formData.description &&
      formData.amount &&
      formData.date &&
      formData.receivingOffice
    ) {
      const newRequest = {
        id: budgetRequest.length + 1,
        sn: String(budgetRequest.length + 1).padStart(2, "0"),
        budgetNo: formData.budgetNo,
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: formData.date,
        receivingOffice: formData.receivingOffice,
      };
      setBudgetRequest((prev) => [...prev, newRequest]);
      setFormData({
        budgetNo: "",
        description: "",
        amount: "",
        date: "",
        receivingOffice: "",
      });
      alert("Budget created successfully!");
    } else {
      alert("Please fill all fields");
    }
  };

 
  if (showCreateForm) {
    return (
      <div className="bg-[#f5f7fb] p-10">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
         
          <button
            onClick={() => setShowCreateForm(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Create Budget</h2>
            <p className="text-gray-600 text-sm">
              Kindly fill in the form below to create a budget
            </p>
          </div>

         
          <form onSubmit={handleCreateBudget} className="mb-12">
            <div className="grid grid-cols-2 gap-6 mb-6">
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget number
                </label>
                <input
                  type="text"
                  name="budgetNo"
                  value={formData.budgetNo}
                  onChange={handleInputChange}
                  placeholder="Enter item"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount in ₦"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

         
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receiving office
              </label>
              <select
                name="receivingOffice"
                value={formData.receivingOffice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select option</option>
                <option value="HR Office">HR Office</option>
                <option value="Finance Office">Finance Office</option>
                <option value="Operations">Operations</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

           
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
            >
              Create Budget
            </button>
          </form>

         
          {budgetRequest.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-6">Budget Request</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        S/N
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Budget No.
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Budget Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Budget Amount (₦)
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetRequest.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {request.sn}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {request.budgetNo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {request.description}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatCurrency(request.amount)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {request.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

             
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg">
                Submit for Approval
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }


  return (
    <div className="bg-[#f5f7fb] p-10">
   
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Office Budget</h1>
          <p className="text-gray-500 mt-2">View, create and send budget request.</p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-right">
            <p className="font-semibold text-sm">Ofor John</p>
            <p className="text-xs text-gray-500">HR Office</p>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-4 gap-6 mb-8">
      
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm text-gray-600 font-medium">Total annual budget</h3>
            <div className="bg-blue-100 p-2 rounded-lg">
              <span className="text-lg">💰</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalBudget)}
          </p>
          <p className="text-xs text-gray-500 mt-2">↑ 5% more than last year</p>
        </div>

       
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm text-gray-600 font-medium">Amount used, YTD</h3>
            <div className="bg-orange-100 p-2 rounded-lg">
              <span className="text-lg">📦</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(amountUsed)}
          </p>
        </div>

       
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm text-gray-600 font-medium">Total budget balance</h3>
            <div className="bg-purple-100 p-2 rounded-lg">
              <span className="text-lg">💎</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(budgetBalance)}
          </p>
        </div>

       
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm text-gray-600 font-medium">Budget % used</h3>
            <div className="bg-green-100 p-2 rounded-lg">
              <span className="text-lg">📊</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{Math.round(budgetPercentage)}%</p>
        </div>
      </div>

      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Create a Budget</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Create Budget
        </button>
      </div>

     
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">Budget History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">S/N</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Budget No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Budget Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Budgeted Amount (₦)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actual Amount (₦)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Variance (₦)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget) => (
                <tr key={budget.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{budget.sn}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{budget.budgetNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{budget.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatCurrency(budget.budgeted)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatCurrency(budget.actual)}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-medium ${
                      budget.variance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {budget.variance >= 0 ? "+" : ""}
                    {formatCurrency(budget.variance)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{budget.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Officebudget;