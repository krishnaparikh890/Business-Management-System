import React, { useState } from "react";
import notificationsData from "../Data/Notification.json";
import NotificationCard from "../components/NotificationCard";
import { Bell, ArrowLeft, X } from "lucide-react";

const Notification = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectToday, setSelectToday] = useState(false);
  const [selectYesterday, setSelectYesterday] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const today = notifications.filter((item) => item.date === "Today");
  const yesterday = notifications.filter((item) => item.date === "Yesterday");


  if (selectedNotification) {
    return (
      <div className="bg-[#f5f7fb] p-10">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
          
          <div className="flex items-center justify-between border-b p-8">
            <button
              onClick={() => setSelectedNotification(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <button
              onClick={() => setSelectedNotification(null)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedNotification.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  Notifications from HR
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedNotification.date} • {selectedNotification.time}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Message</h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedNotification.title}
              </p>
            </div>

           
            <div className="flex gap-4">
              {!selectedNotification.read && (
                <button
                  onClick={() => {
                    markRead(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => {
                  deleteNotification(selectedNotification.id);
                  setSelectedNotification(null);
                }}
                className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="bg-[#f5f7fb] p-10">
     
      

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
        {/* Top */}
        <div className="flex justify-between items-center border-b p-8">
          <h2 className="text-2xl font-bold">
            Notifications ({unreadCount} unread)
          </h2>
          <button
            onClick={markAllRead}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:opacity-90"
          >
            Mark All As Read
          </button>
        </div>

        {/* Content - Full Width (No Scroll) */}
        <div className="p-8">
          {/* TODAY */}
          {today.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold">Today</h3>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectToday}
                    onChange={() => setSelectToday(!selectToday)}
                  />
                  Select all
                </label>
              </div>
              {today.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNotification(item)}
                  className="cursor-pointer"
                >
                  <NotificationCard
                    notification={item}
                    onDelete={deleteNotification}
                    onMarkRead={markRead}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Yesterday */}
          {yesterday.length > 0 && (
            <div>
              <div className="flex justify-between items-center mt-10 mb-5">
                <h3 className="font-semibold">
                  Yesterday 18th November, 2022
                </h3>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectYesterday}
                    onChange={() => setSelectYesterday(!selectYesterday)}
                  />
                  Select all
                </label>
              </div>
              {yesterday.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNotification(item)}
                  className="cursor-pointer"
                >
                  <NotificationCard
                    notification={item}
                    onDelete={deleteNotification}
                    onMarkRead={markRead}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {notifications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;