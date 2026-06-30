import React, { useState } from "react";
import logisticsData from "../Data/LogisticsData.json";
import { Plus, ArrowLeft, Check } from "lucide-react";
import { MdOutlineAssignment, MdPayments, MdOutlinePendingActions, MdCheckCircleOutline } from "react-icons/md";
const Logistics = () => {
  const [logistics, setLogistics] = useState(logisticsData);
  const [currentView, setCurrentView] = useState("list"); 
  const [showVoucher, setShowVoucher] = useState(false);
  const [selectedLogistic, setSelectedLogistic] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    amount: "",
    requestedBy: "Ofor John Stephen",
    sentTo: "",
    dateFrom: "",
    dateTo: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    verifierSignature: "",
    authorizerSignature: "",
  });

  const totalRequests = 350;
  const totalCostIncurred = 5000000;
  const pendingRequests = logistics.filter((l) => l.status === "Pending").length;
  const approvedRequests = logistics.filter((l) => l.status === "Approved").length;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.purpose &&
      formData.amount &&
      formData.sentTo &&
      formData.dateFrom &&
      formData.dateTo &&
      formData.accountName &&
      formData.accountNumber &&
      formData.bankName
    ) {
      const newLogistic = {
        id: logistics.length + 1,
        sn: String(logistics.length + 1).padStart(2, "0"),
        title: formData.title,
        purpose: formData.purpose,
        amount: parseFloat(formData.amount),
        requestedBy: formData.requestedBy,
        sentTo: formData.sentTo,
        date: new Date().toLocaleDateString("en-GB"),
        status: "Pending",
      };
      setSelectedLogistic(newLogistic);
      setCurrentView("details");
      setFormData({
        title: "",
        purpose: "",
        amount: "",
        requestedBy: "Ofor John Stephen",
        sentTo: "",
        dateFrom: "",
        dateTo: "",
        accountName: "",
        accountNumber: "",
        bankName: "",
        verifierSignature: "",
        authorizerSignature: "",
      });
      setShowVoucher(false);
    } else {
      alert("Please fill all required fields");
    }
  };

 
  if (currentView === "list") {
    return (
      <div className="bg-[#f5f7fb] p-10">
      
        <div className="grid grid-cols-4 gap-6 mb-8">
         
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm text-gray-600 font-medium">Total request made</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <MdOutlineAssignment className="text-blue-600 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalRequests}</p>
            <p className="text-xs text-gray-500 mt-2">↑ 50 more than last year</p>
          </div>

          
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm text-gray-600 font-medium">Total cost incurred</h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <MdPayments className="text-purple-600 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalCostIncurred)}
            </p>
          </div>

         
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm text-gray-600 font-medium">Pending request</h3>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <MdOutlinePendingActions className="text-yellow-600 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
          </div>

         
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm text-gray-600 font-medium">Approved request</h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <MdCheckCircleOutline className="text-green-600 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{approvedRequests}</p>
            <p className="text-xs text-gray-500 mt-2">↓ 2% more than last year</p>
          </div>
        </div>

       
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Logistics request</h2>
          <button
            onClick={() => {
              setCurrentView("form");
              setShowVoucher(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Make Logistics Request
          </button>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">All Logistics Request</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">S/N</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Purpose</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Requested By</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sent to</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {logistics.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700">{item.sn}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.purpose}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.requestedBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.sentTo}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => {
                          setSelectedLogistic(item);
                          setCurrentView("details");
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View more
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  
  if (currentView === "form") {
    return (
      <div className="bg-[#f5f7fb] min-h-screen p-10">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        
          <button
            onClick={() => {
              setCurrentView("list");
              setShowVoucher(false);
            }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Logistics Request</h2>
            <p className="text-gray-600 text-sm">
              Kindly fill in the form below to submit a logistics request
            </p>
          </div>

        
          <form onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Enter purpose"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
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
            </div>

            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested by
                </label>
                <input
                  type="text"
                  value={formData.requestedBy}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sent to
                </label>
                <select
                  name="sentTo"
                  value={formData.sentTo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select option</option>
                  <option value="Hassania Husseni">Hassania Husseni</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date From
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date To
                </label>
                <input
                  type="date"
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            
            <button
              type="button"
              onClick={() => setShowVoucher(!showVoucher)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mb-8"
            >
              {showVoucher ? "Hide Payment Voucher" : "Attach Payment Voucher"}
            </button>

          
            {showVoucher && (
              <>
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-bold mb-6">Payment Voucher</h3>

                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        S/N
                      </label>
                      <input
                        type="text"
                        placeholder="01"
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Request Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose
                      </label>
                      <input
                        type="text"
                        value={formData.purpose}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date From
                      </label>
                      <input
                        type="text"
                        value={formData.dateFrom}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date To
                      </label>
                      <input
                        type="text"
                        value={formData.dateTo}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₦)
                    </label>
                    <input
                      type="text"
                      value={formatCurrency(parseFloat(formData.amount) || 0)}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 mb-6"
                    />
                  </div>
                </div>

               
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-bold mb-6">Beneficiary Payment Details</h3>

                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account name
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder="Enter bank name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verifier Signature
                    </label>
                    <input
                      type="text"
                      name="verifierSignature"
                      value={formData.verifierSignature}
                      onChange={handleInputChange}
                      placeholder="Sign here"
                      className="w-full px-4 py-8 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Authorizer Signature
                    </label>
                    <input
                      type="text"
                      name="authorizerSignature"
                      value={formData.authorizerSignature}
                      onChange={handleInputChange}
                      placeholder="Sign here"
                      className="w-full px-4 py-8 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

          
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
              >
                Save and Send for Approval
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

 
  if (currentView === "details") {
    return (
      <div className="bg-[#f5f7fb] min-h-screen p-10">
       
        <div className="mb-8 text-center">
          <div className="inline-block bg-white rounded-full p-8 mb-4">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
              <Check size={40} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations</h2>
          <p className="text-gray-600">
            Your logistics request has been submitted successfully
          </p>
        </div>

        
        <div className="mb-8 text-center">
          <button
            onClick={() => setCurrentView("list")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
          >
            Back to List
          </button>
        </div>

      
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView("list")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <h2 className="text-2xl font-bold mb-8">Logistics Details</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-medium">Request Title</p>
                <p className="text-lg text-gray-900">{selectedLogistic?.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Purpose</p>
                <p className="text-lg text-gray-900">{selectedLogistic?.purpose}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-medium">Amount</p>
                <p className="text-lg text-gray-900">
                  {formatCurrency(selectedLogistic?.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">From</p>
                <p className="text-lg text-gray-900">{selectedLogistic?.requestedBy}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-medium">To</p>
                <p className="text-lg text-gray-900">{selectedLogistic?.sentTo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Duration</p>
                <p className="text-lg text-gray-900">4 days - 21/11/2022 - 24/11/2022</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">Status</p>
              <p className="text-lg">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                  {selectedLogistic?.status}
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">Attachment</p>
              <p className="text-lg text-gray-900">Yes</p>
            </div>

          
            <div className="border-t pt-8 mt-8">
              <h3 className="text-lg font-bold mb-4">Invoice</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-h-96 flex items-center justify-center text-gray-500">
                <p>Invoice Document Preview</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg">
              Download
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50">
              Print
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Logistics;
