import React, { useState } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { MdLogin, MdLogout, MdClose, MdDashboard, MdPayments, MdOutlineAccountBalanceWallet, MdDescription, MdArticle, MdBuild, MdAttachMoney, MdInventory, MdNotifications, MdShoppingCart } from "react-icons/md";
import { FaUsers, FaTruck, FaUserGraduate } from "react-icons/fa";
import menu from "../data/sidebar.json";
import Frame from '../assets/Frame.png';

const icons = { MdDashboard, FaUsers, MdPayments, MdOutlineAccountBalanceWallet, MdDescription, MdArticle, MdBuild, FaTruck, MdAttachMoney, MdInventory, MdNotifications, FaUserGraduate, MdShoppingCart };

const ModalPortal = ({ children }) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] backdrop-blur-md flex items-center justify-center">
            {children}
        </div>,
        document.body
    );
};

export default function Sidebar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "1234") {
            setIsLoggedIn(true);
            setIsModalOpen(false);
        } else {
            alert("Invalid Credentials!");
        }
    };

    return (
        <>
            <aside className="fixed left-0 top-0 w-64 h-screen bg-white  flex flex-col z-20">
                <div className="p-2 ">
                    <img src={Frame} alt="Logo" className="mx-auto" />
                    <div className="px-5 py-6">
                        <button onClick={() => isLoggedIn ? setIsLoggedIn(false) : setIsModalOpen(true)} className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700">
                            {isLoggedIn ? <MdLogout size={20} /> : <MdLogin size={20} />}
                            {isLoggedIn ? "SIGN OUT" : "SIGN IN"}
                        </button>
                    </div>
                </div>
                <nav className="mt-2 flex-1 overflow-y-auto">
                    {menu.map((item) => {
                        const Icon = icons[item.icon];
                        return (
                            <NavLink key={item.id} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-5 py-3 text-[14px] ${isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-600 hover:bg-gray-100"}`}>
                                <Icon size={18} /> {item.title}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>

            {isModalOpen && (
                <ModalPortal>
                    <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-80 relative z-[10000]">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500"><MdClose size={24} /></button>
                        <h2 className="text-xl font-bold mb-4">Sign In</h2>
                        <input type="text" placeholder="Username" required className="w-full border p-2 mb-3 rounded" onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" required className="w-full border p-2 mb-4 rounded" onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
                    </form>
                </ModalPortal>
            )}
        </>
    );
}