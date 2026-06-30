import React, { useState } from "react";
import circularData from "../Data/CircularData.json";
import { Plus, Search, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

const Circulars = () => {
  const [circulars, setCirculars] = useState(circularData);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All memos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  const [formData, setFormData] = useState({
    title: "",
    sentFrom: "Ofor John",
    sentTo: "",
    date: "",
    message: "",
  });


  const filteredCirculars = circulars.filter((circular) => {
    const matchesSearch = circular.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "All memos" ||
      circular.status === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });


  const totalPages = Math.ceil(filteredCirculars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCirculars = filteredCirculars.slice(startIndex, endIndex);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCircular = (e) => {
    e.preventDefault();
    if (formData.title && formData.sentTo && formData.date && formData.message) {
      const newCircular = {
        id: circulars.length + 1,
        sn: String(circulars.length + 1).padStart(2, "0"),
        title: formData.title,
        sentFrom: "Admin, HR",
        sentTo: formData.sentTo,
        date: new Date(formData.date).toLocaleDateString("en-GB"),
        type: "Sent",
        status: "sent",
      };
      setCirculars((prev) => [newCircular, ...prev]);
      setFormData({
        title: "",
        sentFrom: "Ofor John",
        sentTo: "",
        date: "",
        message: "",
      });
      setShowCreateForm(false);
      alert("Circular sent successfully!");
    } else {
      alert("Please fill all fields");
    }
  };


  if (showCreateForm) {
    return (
      <div className="bg-[#f5f7fb] min-h-screen p-10">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          <button
            onClick={() => setShowCreateForm(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>


          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <span className="text-lg">📋</span>
              </div>
              <h2 className="text-2xl font-bold">Create Circulars</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Create and send circulars to designated offices.
            </p>
          </div>


          <form onSubmit={handleSendCircular}>

            <div className="grid grid-cols-2 gap-6 mb-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Circular title
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
                  Sent from
                </label>
                <input
                  type="text"
                  value={formData.sentFrom}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>


            <div className="grid grid-cols-2 gap-6 mb-6">

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
                  <option value="HR Staffs">HR Staffs</option>
                  <option value="Operations Staffs">Operations Staffs</option>
                  <option value="All Staff">All Staff</option>
                  <option value="Finance Team">Finance Team</option>
                  <option value="Management">Management</option>
                </select>
              </div>
            </div>


            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Circular message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter message..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>


            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
            >
              Send Circular
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7fb] p-10">

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">

          <div className="flex gap-4 items-center flex-1">

            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Quick search a circular"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>


            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="All memos">All memos</option>
              <option value="Sent">Sent</option>
              <option value="Received">Received</option>
            </select>
          </div>


          <div className="text-right mx-6">
            <p className="text-2xl font-bold text-gray-900">
              {circulars.length}
            </p>
            <p className="text-sm text-gray-600">Total circulars</p>
          </div>


          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Create Circular
          </button>
        </div>
      </div>


      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">All Circulars</h3>
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {startIndex + 1}
              </span>{" "}
              per page
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  S/N
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Circular Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Sent From
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Sent To
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Circular Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCirculars.map((circular) => (
                <tr key={circular.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{circular.sn}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {circular.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {circular.sentFrom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {circular.sentTo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {circular.date}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${circular.status === "sent"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {circular.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View more
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="flex justify-center items-center gap-2 p-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg ${currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Circulars;