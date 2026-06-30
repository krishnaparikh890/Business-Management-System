import React from "react";
import { Link, useParams } from "react-router-dom";
import memoData from "../data/Memo.json";
import { FiArrowLeft } from "react-icons/fi";
import Invoice from '../assets/Invoice.png';
import CreateMemo from "./CreateMemo";



const MemoDetail = () => {
  const { id } = useParams();

  const memo = memoData.find((item) => item.id === Number(id));

  if (!memo) {
    return (
      <div className="p-10 text-center text-red-500">
        Memo not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border border-gray-200 p-8">

        {/* Back */}

        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 text-sm mb-8 hover:underline"
        >
          <FiArrowLeft />
          Back
        </Link>

        {/* Title */}

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {memo.title}
        </h1>

        {/* Memo Info */}

        <div className="space-y-3 text-sm">

          <div className="flex">
            <span className="font-semibold w-28">Date</span>
            <span>{memo.date}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-28">From</span>
            <span>{memo.from}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-28">To</span>
            <span>{memo.to}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-28">CC1</span>
            <span>{memo.cc1}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-28">CC2</span>
            <span>{memo.cc2}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-28">CC3</span>
            <span>{memo.cc3}</span>
          </div>

          <div className="flex">
            <span className="font-semibold w-28">Attachment</span>
            <span>{memo.attachment}</span>
          </div>

        </div>

        {/* Description */}

        <div className="mt-8">

          <p className="text-sm text-gray-700 leading-7 whitespace-pre-line">
            {memo.description}
          </p>

        </div>

        {/* Divider */}

        <hr className="my-8" />

        {/* Invoice Preview */}

        {/* Conditional Invoice Preview */}
{memo.attachment === "Yes" && (
  <>
    <hr className="my-8" />
    <div className="flex justify-center">
      <img
        src={Invoice}
        alt="Invoice"
        className="border rounded-md shadow w-full max-w-lg"
      />
    </div>
  </>
)}
      </div>

    </div>
  );
};

export default MemoDetail;