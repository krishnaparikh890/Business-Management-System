import React, { useState } from "react";

const PaymentVoucher = () => {
  const [rows, setRows] = useState([
    {
      class: "",
      description: "",
      qty: "",
      unitPrice: "",
      amount: "",
      vat: "",
      vatAmount: "",
      grossAmount: "",
      wht: "",
      whtAmount: "",
      netAmount: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const data = [...rows];
    data[index][field] = value;
    setRows(data);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        class: "",
        description: "",
        qty: "",
        unitPrice: "",
        amount: "",
        vat: "",
        vatAmount: "",
        grossAmount: "",
        wht: "",
        whtAmount: "",
        netAmount: "",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow p-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Payment Voucher
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Create account for a new staff
        </p>

        {/* Subject */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter subject"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-100">

              <tr className="text-gray-700">

                <th className="p-3">S/N</th>
                <th className="p-3">Class</th>
                <th className="p-3">Description</th>
                <th className="p-3">QTY</th>
                <th className="p-3">Unit Price</th>
                <th className="p-3">Amount</th>
                <th className="p-3">VAT %</th>
                <th className="p-3">VAT Amount</th>
                <th className="p-3">Gross Amount</th>
                <th className="p-3">WHT %</th>
                <th className="p-3">WHT Amount</th>
                <th className="p-3">Net Amount</th>

              </tr>

            </thead>

            <tbody>

              {rows.map((row, index) => (
                <tr key={index} className="border-t">

                  <td className="p-2 text-center">{index + 1}</td>

                  {[
                    "class",
                    "description",
                    "qty",
                    "unitPrice",
                    "amount",
                    "vat",
                    "vatAmount",
                    "grossAmount",
                    "wht",
                    "whtAmount",
                    "netAmount",
                  ].map((field) => (
                    <td key={field} className="p-2">

                      <input
                        type="text"
                        value={row[field]}
                        onChange={(e) =>
                          handleChange(index, field, e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
                      />

                    </td>
                  ))}

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Add Row */}

        <button
          onClick={addRow}
          className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          + Add another row
        </button>

        {/* Total */}

        <div className="mt-6 flex justify-end">

          <div className="text-lg font-semibold">
            Total : ₹0.00
          </div>

        </div>

        {/* Amount in words */}

        <div className="mt-6">

          <label className="block text-sm font-medium mb-2">
            Net Amount in Words
          </label>

          <input
            type="text"
            placeholder="Enter amount in words"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Beneficiary */}

        <div className="mt-10">

          <h2 className="font-semibold text-lg mb-4">
            Beneficiary Payment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>

              <label className="text-sm block mb-2">
                Account Name
              </label>

              <input
                type="text"
                placeholder="Enter account name"
                className="w-full border rounded-lg px-4 py-2"
              />

            </div>

            <div>

              <label className="text-sm block mb-2">
                Account Number
              </label>

              <input
                type="text"
                placeholder="Enter account number"
                className="w-full border rounded-lg px-4 py-2"
              />

            </div>

            <div>

              <label className="text-sm block mb-2">
                Bank Name
              </label>

              <input
                type="text"
                placeholder="Enter bank name"
                className="w-full border rounded-lg px-4 py-2"
              />

            </div>

          </div>

        </div>

        {/* Submit */}

        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
          Submit Payment Voucher
        </button>

      </div>
    </div>
  );
};

export default PaymentVoucher;