import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import staffData from "../data/Staff.json";
import { useNavigate } from "react-router-dom";
const PER_PAGE_OPTIONS = [12, 24, 48];

export default function Staff() {
    const [allStaff, setAllStaff] = useState([]);

    useEffect(() => {
        const localStaff =
            JSON.parse(localStorage.getItem("staffList")) || [];

        setAllStaff([...staffData, ...localStaff]);
    }, []);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(12);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return allStaff;
        return allStaff.filter(
            (s) =>
                s.firstName.toLowerCase().includes(q) ||
                s.lastName.toLowerCase().includes(q) ||
                s.staffId.toLowerCase().includes(q) ||
                s.designation.toLowerCase().includes(q)
        );
    }, [search, allStaff]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const currentPage = Math.min(page, totalPages);

    const visibleStaff = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filtered.slice(start, start + perPage);
    }, [filtered, currentPage, perPage]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handlePerPageChange = (e) => {
        setPerPage(Number(e.target.value));
        setPage(1);
    };

    const handleAddNewStaff = () => {
        navigate("/add-staff");
    };

    const handleViewMore = (staffMember) => {
        navigate("/edit-staff", {
            state: { staff: staffMember },
        });
    };


    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
    }, [totalPages]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
           
            <div className="mb-5">
                <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    All Staff
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                    View, search for and add new staff
                </p>
            </div>

           
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                    <p className="text-xs text-gray-400 mb-1.5">Quick search a staff</p>
                    <div className="relative w-64">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Enter search word"
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{allStaff.length}</h2>
                    <p className="text-xs text-gray-400">Total number of staff</p>
                </div>

                <div>
                    <p className="text-xs text-gray-400 mb-1.5">Filter staff</p>
                    <select className="w-40 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>All staff</option>
                        <option>Admin</option>
                        <option>I.T</option>
                        <option>P.M</option>
                        <option>None</option>
                    </select>
                </div>

                <button
                    onClick={handleAddNewStaff}
                    className="bg-blue-500 hover:bg-blue-600 transition text-white text-sm font-medium px-5 py-2.5 rounded-lg whitespace-nowrap"
                >
                    + Add New Staff
                </button>
            </div>


            <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-gray-800">All Staff</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>Showing</span>
                        <select
                            value={perPage}
                            onChange={handlePerPageChange}
                            className="border border-gray-200 rounded-md px-2 py-1 text-gray-600 focus:outline-none"
                        >
                            {PER_PAGE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        <span>per page</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-400 text-left border-b border-gray-100">
                                <th className="py-2 font-medium">S/N</th>
                                <th className="py-2 font-medium">First Name</th>
                                <th className="py-2 font-medium">Last Name</th>
                                <th className="py-2 font-medium">Gender</th>
                                <th className="py-2 font-medium">Staff ID</th>
                                <th className="py-2 font-medium">Phone Number</th>
                                <th className="py-2 font-medium">Role</th>
                                <th className="py-2 font-medium">Designation</th>
                                <th className="py-2 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleStaff.map((person) => (
                                <tr
                                    key={person.id}
                                    className="border-b border-gray-50 last:border-0"
                                >
                                    <td className="py-3 text-gray-500">{person.sn}</td>
                                    <td className="py-3 text-gray-700">{person.firstName}</td>
                                    <td className="py-3 text-gray-700">{person.lastName}</td>
                                    <td className="py-3 text-gray-500">{person.gender}</td>
                                    <td className="py-3 text-gray-500">{person.staffId}</td>
                                    <td className="py-3 text-gray-500">{person.phone}</td>
                                    <td className="py-3 text-gray-500">{person.role}</td>
                                    <td className="py-3 text-gray-500">{person.designation}</td>
                                    <td className="py-3">
                                        <button
                                            onClick={() => handleViewMore(person)}
                                            className="text-blue-500 hover:underline text-sm"
                                        >
                                            View more
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {visibleStaff.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="py-8 text-center text-gray-400 text-sm"
                                    >
                                        No staff found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {pageNumbers.map((num) => (
                            <button
                                key={num}
                                onClick={() => setPage(num)}
                                className={`w-8 h-8 rounded-md text-sm font-medium transition ${currentPage === num
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-2 h-8 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                        >
                            {">>"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}