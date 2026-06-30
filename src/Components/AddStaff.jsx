import { useState, useMemo, useEffect } from "react";
import React from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";

export default function AddStaff() {
    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        role: "",
        designation: "",
        staffId: "",
        officialEmail: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

   const newStaff = {
    id: Date.now(),
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.officialEmail || formData.email,
    officialEmail: formData.officialEmail,
    phone: formData.phone,
    gender: formData.gender,
    role: formData.role,
    designation: formData.designation,
    staffId: formData.staffId,
    status: "Active",
    image: "",
};
    
    const existingStaff =
        JSON.parse(localStorage.getItem("staffList")) || [];
    existingStaff.push(newStaff);

    localStorage.setItem(
        "staffList",
        JSON.stringify(existingStaff)
    );

    setShowSuccess(true);
};

   const handleContinue = () => {

    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        role: "",
        designation: "",
        staffId: "",
        officialEmail: ""
    });

    setShowSuccess(false);
    navigate("/staff");
};

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <button
                onClick={() => navigate("/staff")}
                className="flex items-center gap-2 text-blue-500 mb-5"
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-2xl font-semibold mb-1">
                    Add New Staff
                </h2>

                <p className="text-gray-400 mb-8">
                    Create account for a new staff
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="border rounded-xl flex flex-col items-center justify-center p-6">

                            <div className="w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center mb-4">
                                <Upload size={35} className="text-gray-400" />
                            </div>

                            <input type="file" />

                            <p className="text-xs text-gray-400 mt-4 text-center">
                                JPG, PNG
                                <br />
                                Max Size 2MB
                            </p>

                        </div>

                        <div className="md:col-span-2 grid md:grid-cols-2 gap-4">

                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            >
                                <option value="">Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            >
                                <option value="">Role</option>
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>Employee</option>
                            </select>

                            <input
                                type="text"
                                name="designation"
                                placeholder="Designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="text"
                                name="staffId"
                                placeholder="Staff ID"
                                value={formData.staffId}
                                onChange={handleChange}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="email"
                                name="officialEmail"
                                placeholder="Official Email"
                                value={formData.officialEmail}
                                onChange={handleChange}
                                className="border rounded-lg p-3 md:col-span-2"
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                    >
                        Add Staff
                    </button>

                </form>

            </div>

            <SuccessModal
                open={showSuccess}
                message="You have successfully added a new staff"
                onContinue={handleContinue}
            />

        </div>
    );
}