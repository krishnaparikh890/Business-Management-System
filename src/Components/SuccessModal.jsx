import React from "react";
import Group from '../assets/Group.png';
/**
 * SuccessModal
 *
 * Generic "success" confirmation popup — use after any successful
 * create/update action (e.g. adding a new staff member).
 *
 * Usage:
 *   <SuccessModal
 *     open={showSuccess}
 *     message="You have successfully added a new staff"
 *     onContinue={() => setShowSuccess(false)}
 *   />
 */
export default function SuccessModal({
  open,
  title = "Congratulations",
  message = "You have successfully added a new staff",
  buttonText = "Continue",
  imageSrc = "/assets/Group.png", 
  onContinue,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="w-[340px] rounded-xl bg-white px-8 pb-8 pt-10 text-center shadow-xl">
        <img
          src={imageSrc}
          alt=""
          className="mx-auto mb-6 h-[90px] w-[90px] "
        />

        <h2 id="success-modal-title" className="mb-3 text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-500">{message}</p>

        <button
          onClick={onContinue}
          className="w-full rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 py-3 text-[15px] font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}