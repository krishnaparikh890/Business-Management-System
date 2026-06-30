import React from "react";
import {
    FiChevronDown,
    FiCalendar,
    FiPlus,
    FiPaperclip,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Memo from "../Pages/Memo";

const CreateMemo = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                {/* Heading */}
                <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                    Create Memo
                </h1>

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Memo Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Memo title
                        </label>

                        <input
                            type="text"
                            placeholder="Enter title"
                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Send To */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Send to
                        </label>

                        <div className="relative">
                            <select className="w-full h-12 border border-gray-300 rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Select option</option>
                                <option>HR</option>
                                <option>Accounts</option>
                                <option>Manager</option>
                            </select>

                            <FiChevronDown className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">

                    {/* CC1 */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CC1
                        </label>

                        <div className="relative">
                            <select className="w-full h-12 border border-gray-300 rounded-lg px-4 appearance-none">
                                <option>Select option</option>
                            </select>

                            <FiChevronDown className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* CC Action */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CC 1 Action
                        </label>

                        <div className="relative">
                            <select className="w-full h-12 border border-gray-300 rounded-lg px-4 appearance-none">
                                <option>Select option</option>
                            </select>

                            <FiChevronDown className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Add Button */}
                    <div className="flex items-end">
                        <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100">
                            <FiPlus size={20} />
                        </button>
                    </div>

                </div>

                {/* Date */}
                <div className="mt-6 max-w-sm">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                    </label>

                    <div className="relative">

                        <input
                            type="date"
                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <FiCalendar className="absolute right-4 top-4 text-gray-500 pointer-events-none" />

                    </div>
                </div>

                {/* Memo Body */}
                <div className="mt-6">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Memo Body
                    </label>

                    <textarea
                        rows={5}
                        placeholder="Enter memo"
                        className="w-full border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                </div>

                {/* Attachment */}
                <div className="mt-8">

                    <h2 className="text-lg font-semibold mb-3">
                        Attachment
                    </h2>

                    <div className="flex items-center gap-3 text-gray-700 border rounded-lg px-4 py-3">

                        <FiPaperclip size={20} />

                        <span className="text-sm">
                            REQUEST FOR FARS FOR OCTOBER 2022 IFO GRM CONSULTING LTD.pdf
                        </span>

                    </div>

                </div>

                {/* Upload */}
                <div className="mt-4">
                    <input
                        type="file"
                        className="block w-full text-sm text-gray-600
            file:mr-4
            file:px-4
            file:py-2
            file:border-0
            file:rounded-md
            file:bg-blue-100
            file:text-blue-700
            hover:file:bg-blue-200"
                    />
                </div>

                {/* Button */}
                <div className="mt-10">

                  <Link to="/memo/1">   
                       <button className="bg-[#2F80ED] hover:bg-blue-700 text-white px-7 py-3 rounded-lg text-sm font-medium">
              Send Memo
            </button>
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default CreateMemo;