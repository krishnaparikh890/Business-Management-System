import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SuccessModal from "./SuccessModal";

export default function EditStaffProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const staff = location.state?.staff;
    const [showProfileSuccess, setShowProfileSuccess] = useState(false);
    const [showRoleSuccess, setShowRoleSuccess] = useState(false);

    const [photoPreview, setPhotoPreview] = useState(null);

    const [profileData, setProfileData] = useState({
        firstName: staff?.firstName || "",
        lastName: staff?.lastName || "",
        email: staff?.email || "",
        phone: staff?.phone || "",
        gender: staff?.gender || "",
        phone2: "",
        staffId: staff?.staffId || "",
        designation: staff?.designation || "",
        officialEmail: staff?.officialEmail || staff?.email || "",
    });

    const [roleData, setRoleData] = useState({
        userId: "",
        role: "",
    });

    const handleProfileChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleChange = (e) => {
        setRoleData({
            ...roleData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();

        console.log(profileData);

        setShowProfileSuccess(true);
    };

    const handleRoleSubmit = (e) => {
        e.preventDefault();

        console.log(roleData);

        setShowRoleSuccess(true);
    };

    const staffDisplayName =
        `${profileData.firstName || "John"} ${profileData.lastName || "Otor"}`.trim();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <button
                onClick={() => navigate("/staff")}
                className="flex items-center gap-2 text-blue-500 mb-5"
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

                <h2 className="text-2xl font-semibold mb-6">
                    Edit Staff Profile
                </h2>

                <form onSubmit={handleProfileSubmit}>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="flex flex-col items-center text-center">

                            <label className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-200 cursor-pointer flex items-center justify-center mb-4">
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Staff"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-500 px-2">
                                        Update Photo
                                    </span>
                                )}
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>

                            <p className="text-xs text-gray-400">
                                Allowed format
                                <br />
                                JPG, JPEG, and PNG
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                Max file size
                                <br />
                                2MB
                            </p>

                        </div>

                        <div className="md:col-span-2 grid md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={profileData.firstName}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={profileData.lastName}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Phone number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                >
                                    <option value="">Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Phone number
                                </label>
                                <input
                                    type="text"
                                    name="phone2"
                                    placeholder="Enter phone number"
                                    value={profileData.phone2}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Staff ID
                                </label>
                                <input
                                    type="text"
                                    name="staffId"
                                    placeholder="Staff ID"
                                    value={profileData.staffId}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Designation
                                </label>
                                <select
                                    name="designation"
                                    value={profileData.designation}
                                    onChange={handleProfileChange}
                                    className="border rounded-lg p-3 w-full"
                                >
                                    <option value="">Select designation</option>
                                    <option>Manager</option>
                                    <option>Supervisor</option>
                                    <option>Officer</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 flex items-end justify-between gap-1">

                        
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Official Email
                                    </label>
                                    <input
                                        type="email"
                                        name="officialEmail"
                                        placeholder="Official Email"
                                        value={profileData.officialEmail}
                                        onChange={handleProfileChange}
                                        className="border rounded-lg p-3 w-100"
                                    />
                                </div>

                                {/* Edit Profile Button */}
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white px-20 py-3 rounded-lg font-medium whitespace-nowrap"
                                >
                                    Edit Profile
                                </button>

                            </div>
                        </div>

                    </div>

                </form>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h3 className="text-lg font-semibold mb-6">
                    Assign Role
                </h3>

                <form
                    onSubmit={handleRoleSubmit}
                    className="grid md:grid-cols-3 gap-4 items-end"
                >

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            User ID
                        </label>
                        <input
                            type="text"
                            name="userId"
                            placeholder="User ID"
                            value={roleData.userId}
                            onChange={handleRoleChange}
                            className="border rounded-lg p-3 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                            value={roleData.role}
                            onChange={handleRoleChange}
                            className="border rounded-lg p-3 w-full"
                        >
                            <option value="">Select role</option>
                            <option>Admin</option>
                            <option>Manager</option>
                            <option>Employee</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white py-3 rounded-lg font-medium"
                        >
                            Submit
                        </button>
                    </div>

                </form>

            </div>

            <SuccessModal
                open={showProfileSuccess}
                message="You have successfully updated the staff profile"
                onContinue={() => setShowProfileSuccess(false)}
            />

            <SuccessModal
                open={showRoleSuccess}
                message={
                    <>
                        You have successfully assigned a role to{" "}
                        <span className="font-semibold">{staffDisplayName}</span>
                    </>
                }
                buttonText="Ok"
                onContinue={() => setShowRoleSuccess(false)}
            />

        </div>
    );
}