import React, { useState, useRef, useEffect } from "react";
import {
    MdNotifications,
    MdKeyboardArrowDown,
    MdPerson,
    MdSettings,
    MdLogout
} from "react-icons/md";
import Photo from '../assets/Photo.jpg'

export default function Navbar2() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className=" relative bg-white h-20 px-8 flex justify-between items-center ">



            <div>
                <h2 className="text-lg font-semibold">
                    Welcome, Mr. Otor John
                </h2>

                <p className="text-sm text-gray-500">
                    Today is Saturday, 11th November 2022
                </p>
            </div>



            <div className="flex items-center gap-6">

                <button className="relative">
                    <MdNotifications size={22} />
                </button>
                <div
                    className="relative"
                    ref={dropdownRef}
                >

                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3"
                    >

                        <img
                            src={Photo}
                            alt=""
                            className="w-10 h-10 rounded-full"
                        />

                        <div className="text-left">

                            <h3 className="font-medium text-sm">
                                Otor John
                            </h3>

                            <p className="text-xs text-gray-500">
                                HR Officer
                            </p>

                        </div>

                        <MdKeyboardArrowDown
                            size={24}
                            className={`transition ${open ? "rotate-180" : ""
                                }`}
                        />

                    </button>



                    {open && (

                        <div className="absolute right-0 mt-4 w-52 bg-white rounded-lg shadow-lg border z-50">

                            <button className="flex items-center gap-3 w-full px-5 py-4 hover:bg-gray-100">

                                <MdPerson size={22} />

                                Profile

                            </button>

                            <button className="flex items-center gap-3 w-full px-5 py-4 hover:bg-gray-100">

                                <MdSettings size={22} />

                                Settings

                            </button>

                            <button className="flex items-center gap-3 w-full px-5 py-4 hover:bg-red-50 text-red-600">

                                <MdLogout size={22} />

                                Logout

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}