import React, { useMemo, useState } from "react";
import memoData from "../data/Memo.json";
import {
  FiSearch,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Memo = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 16;

  const filteredData = useMemo(() => {
    return memoData.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.sentFrom.toLowerCase().includes(search.toLowerCase()) ||
        item.sentTo.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ? true : item.memoType === filter;

      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-[#f5f7fb] min-h-screen p-8">

      
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-gray-800">
          Memo
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Create and send memos to designated offices.
        </p>
      </div>

    

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

     

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

         

          <div className="w-44 h-20 rounded-lg border border-gray-200 flex flex-col justify-center px-5">

            <span className="text-3xl font-bold text-gray-800">
              300
            </span>

            <span className="text-gray-500 text-sm">
              Total memo
            </span>

          </div>

       

          <div className="relative flex-1 max-w-md">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Enter search word"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm w-48 outline-none"
          >
            <option>All</option>
            <option>Sent</option>
            <option>Received</option>
          </select>

         

          <Link to="/CreateMemo">
            <button className="bg-[#2F80ED] hover:bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-medium">
              Create Memo
            </button>
          </Link>
        </div>

    

        <div className="mt-8 overflow-auto">

          <div className="flex justify-between items-center mb-4">

            <h2 className="font-semibold text-gray-800">
              All Memos
            </h2>

            <span className="text-sm text-gray-500">
              Showing {currentData.length} per page
            </span>

          </div>

          <table className="min-w-full text-sm">

            <thead>

              <tr className="border-b text-left text-gray-500">

                <th className="py-3">S/N</th>

                <th>Memo Title</th>

                <th>Sent From</th>

                <th>Sent To</th>

                <th>Date</th>

                <th>Attachment?</th>

                <th>Memo Type</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentData.map((memo) => (

                <tr
                  key={memo.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4">{memo.id}</td>

                  <td>{memo.title}</td>

                  <td>{memo.sentFrom}</td>

                  <td>{memo.sentTo}</td>

                  <td>{memo.date}</td>

                  <td>{memo.attachment}</td>

                  <td>

                    <div className="flex items-center gap-1">

                      {memo.memoType}

                      <FiArrowUpRight size={13} />

                    </div>

                  </td>

                  <td>



                    <button className="bg-[#2F80ED] hover:bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-medium">
              view More
            </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        

        <div className="flex items-center justify-between mt-8">

          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              className="border rounded-lg p-2 hover:bg-gray-100"
            >
              <FiChevronLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-9 h-9 rounded-lg text-sm ${currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
                  }`}
              >
                {index + 1}
              </button>

            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className="border rounded-lg p-2 hover:bg-gray-100"
            >
              <FiChevronRight />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Memo;