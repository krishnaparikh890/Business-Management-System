import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

const NotificationCard = ({
  notification,
  onDelete,
  onMarkRead,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const close = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div
      className={`relative flex items-center justify-between rounded-xl border px-5 py-4 mb-3 transition
      ${
        notification.read
          ? "bg-white border-gray-200"
          : "bg-blue-50 border-blue-100"
      }`}
    >
      <div className="flex items-center gap-4">

        <img
          src={notification.avatar}
          alt=""
          className="w-11 h-11 rounded-full"
        />

        <div>

          <h4 className="text-[15px] text-gray-700 font-medium">
            {notification.title}
          </h4>

          <p className="text-xs text-gray-400 mt-1">
            {notification.time}
          </p>

        </div>
      </div>

      <div className="flex items-center gap-6">

        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        )}

        <div className="relative" ref={menuRef}>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <MoreVertical size={18} />
          </button>

          {open && (
            <div className="absolute right-0 top-10 w-44 rounded-lg border bg-white shadow-lg z-50">

              {!notification.read && (
                <button
                  onClick={() => {
                    onMarkRead(notification.id);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  Mark as Read
                </button>
              )}

              <button
                onClick={() => {
                  onDelete(notification.id);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
              >
                Delete
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;