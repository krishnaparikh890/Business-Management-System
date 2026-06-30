import React, { useState } from 'react';
import Data from '../Data/procurementData.json';
import { Package, CreditCard, Clock, CheckCircle } from 'lucide-react';
export default function ProcurementModule() {


  const getIcon = (iconName) => {
    switch (iconName) {
      case '📦': return <Package size={20} className="text-blue-500" />;
      case '💳': return <CreditCard size={20} className="text-indigo-500" />;
      case '⏳': return <Clock size={20} className="text-amber-500" />;
      case '✅': return <CheckCircle size={20} className="text-green-500" />;
      default: return <Package size={20} />; // Fallback
    }
  };
 
  const [view, setView] = useState('dashboard');
  const [procurements, setProcurements] = useState(Data.items);
  const [selectedItem, setSelectedItem] = useState(null);

  
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    date: '',
    unitPrice: '',
    totalPrice: '',
    requestedBy: 'Otor John',
    sentTo: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
    verifiedBy: '',
    approvedBy: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      if (name === 'quantity' || name === 'unitPrice') {
        const qty = parseInt(updated.quantity) || 0;
        const price = parseFloat(updated.unitPrice) || 0;
        updated.totalPrice = qty * price;
      }
      return updated;
    });
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = `₦${(parseFloat(formData.totalPrice) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const newRequest = {
      sn: String(procurements.length + 1).padStart(2, '0'),
      item: formData.item || 'Requested Item',
      qty: parseInt(formData.quantity) || 0,
      amount: formattedAmount,
      requestedBy: formData.requestedBy,
      sentTo: formData.sentTo || 'Management Division',
      date: formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : '23/06/2026',
      status: 'Pending'
    };

    setProcurements([newRequest, ...procurements]);
   
    setFormData({
      item: '', quantity: '', date: '', unitPrice: '', totalPrice: '',
      requestedBy: 'Otor John', sentTo: '', accountName: '', accountNumber: '',
      bankName: '', verifiedBy: '', approvedBy: ''
    });
    setView('dashboard');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-6 font-sans text-slate-700 overflow-x-hidden">


      {view === 'dashboard' && (
        <div className="w-full max-w-6xl mx-auto space-y-6 overflow-hidden">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {Data.metrics.map((card) => (
              <div key={card.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center min-w-0">
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight block truncate">
                    {card.id === 1 ? procurements.length : card.value}
                  </span>
                  <h4 className="text-xs font-medium text-slate-400 truncate">{card.title}</h4>
                  <p className={`text-[10px] font-semibold flex items-center gap-0.5 whitespace-nowrap ${card.id === 3 ? 'text-amber-500' : 'text-green-500'}`}>
                    <span>{card.id === 3 ? '•' : '↑'}</span> {card.trend}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-inner flex-shrink-0 ml-2">
                  {getIcon(card.icon)}
                </div>
              </div>
            ))}
          </div>

        
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <div>
              <h2 className="text-sm font-bold text-slate-800 tracking-tight">Procurement request</h2>
              <p className="text-[10px] text-slate-400 font-medium">Request for, and view all, requested procurements.</p>
            </div>
            <button
              onClick={() => setView('form')}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition shadow-sm whitespace-nowrap w-full sm:w-auto"
            >
              Make Procurement Request
            </button>
          </div>

        
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 w-full max-w-full overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h3 className="text-xs font-bold text-slate-800">Procurement Request</h3>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs whitespace-nowrap border-collapse table-auto">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                    <th className="p-4 pl-6">S/N</th>
                    <th className="p-4">Item</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Requested By</th>
                    <th className="p-4">Sent To</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  {procurements.map((item) => (
                    <tr key={item.sn} className="hover:bg-slate-50/40 transition">
                      <td className="p-4 pl-6 text-slate-400 font-normal">{item.sn}</td>
                      <td className="p-4 text-slate-800 font-semibold">{item.item}</td>
                      <td className="p-4 text-slate-600">{item.qty}</td>
                      <td className="p-4 text-slate-800 font-semibold">{item.amount}</td>
                      <td className="p-4 text-slate-500">{item.requestedBy}</td>
                      <td className="p-4 text-slate-500">{item.sentTo}</td>
                      <td className="p-4 text-slate-400 font-normal">{item.date}</td>
                      <td className="p-4">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.status === 'Approved' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="text-blue-600 hover:underline font-bold text-[11px]"
                        >
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    
      {view === 'form' && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <button
              onClick={() => setView('dashboard')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mb-2"
            >
              ‹ Back to Dashboard
            </button>
            <h2 className="text-base font-bold text-slate-800">Procurement Request</h2>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-8 text-xs">

            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 border-l-2 border-blue-500 pl-2">Procurement Request Setup</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Item Name</label>
                  <input type="text" name="item" value={formData.item} onChange={handleInputChange} placeholder="Enter item name" className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Quantity</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Enter quantity" className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Unit Price (₦)</label>
                  <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} placeholder="Enter unit price" className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Total Price</label>
                  <div className="w-full border border-slate-100 bg-slate-50 text-slate-600 font-bold rounded-lg p-2.5 min-h-[38px] flex items-center">
                    ₦{(formData.totalPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sent To</label>
                  <select name="sentTo" value={formData.sentTo} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none">
                    <option value="">Select Authorizer</option>
                    <option value="Faruk Hashim">Faruk Hashim</option>
                    <option value="Admin Unit">Admin Unit</option>
                  </select>
                </div>
              </div>
              <button type="button" className="w-full sm:w-auto bg-slate-100 border border-slate-200 hover:bg-slate-200 font-bold px-4 py-2 rounded-lg transition mt-2">
                📎 Attach Payment Voucher
              </button>
            </div>

          
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 border-l-2 border-indigo-500 pl-2">Beneficiary Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Account Name</label>
                  <input type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} placeholder="Enter account name" className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Account Number</label>
                  <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="Enter account number" className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Bank Name</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="Enter bank name" className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-blue-500 outline-none" />
                </div>
              </div>
            </div>

           
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 border-l-2 border-emerald-500 pl-2">Memo Routing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Initiated By</label>
                  <div className="w-full border border-slate-100 bg-slate-50 text-slate-500 rounded-lg p-2.5 min-h-[38px] flex items-center font-medium">
                    {formData.requestedBy}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Verified By</label>
                  <select name="verifiedBy" value={formData.verifiedBy} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none">
                    <option value="">Select option</option>
                    <option value="Finance Auditor">Finance Auditor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Approved By</label>
                  <select name="approvedBy" value={formData.approvedBy} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-white outline-none">
                    <option value="">Select option</option>
                    <option value="Managing Director">Managing Director</option>
                  </select>
                </div>
              </div>
            </div>

           
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-bold px-6 py-2.5 rounded-lg shadow-sm hover:opacity-95 transition"
              >
                Save and Send for Approval
              </button>
              <button
                type="button"
                onClick={() => setView('dashboard')}
                className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-6 py-2.5 rounded-lg transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      
      {view === 'detail' && selectedItem && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <button
              onClick={() => setView('dashboard')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              ‹ Back to List
            </button>
            <span className="text-xs text-slate-400 font-medium">Reference Code: #PR-00{selectedItem.sn}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
            <div className="md:col-span-1 bg-slate-50/70 rounded-xl p-4 space-y-3.5 border border-slate-100">
              <h3 className="font-bold text-slate-800 text-xs tracking-tight border-b pb-1.5 border-slate-200">Request Metrics</h3>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Item Description</p>
                <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedItem.item}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Quantity</p>
                <p className="font-semibold text-slate-700 mt-0.5">{selectedItem.qty} Units</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Total Price</p>
                <p className="font-bold text-blue-600 text-sm mt-0.5">{selectedItem.amount}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Date Triggered</p>
                <p className="font-medium text-slate-600 mt-0.5">{selectedItem.date}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Requested By</p>
                <p className="font-medium text-slate-600 mt-0.5">{selectedItem.requestedBy}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Routing Destination</p>
                <p className="font-medium text-slate-600 mt-0.5">{selectedItem.sentTo}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Workflow Status</p>
                <span className="inline-block font-bold text-[10px] text-amber-500 bg-amber-50 border border-amber-100 rounded-md px-2 py-0.5 mt-1">{selectedItem.status}</span>
              </div>
            </div>

           
            <div className="md:col-span-2 border border-slate-200 rounded-xl p-6 bg-white space-y-6 shadow-xs flex flex-col justify-between min-h-[420px]">
              <div className="space-y-4">
               
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-indigo-600 font-extrabold text-sm tracking-wider">RELIA ENERGY</h4>
                    <p className="text-[9px] text-slate-400 font-medium">Procurement Statement &amp; Billing Contract</p>
                  </div>
                  <div className="text-right text-[9px] text-slate-400 font-medium">
                    <p>RC NO: 1057908</p>
                    <p>TIN: 2235058-0001</p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 space-y-1">
                  <p className="font-bold text-slate-700">Bill To:</p>
                  <p>The Managing Director, NNPC E&amp;P Limited</p>
                  <p>Ogba Road, Benin City, Edo State.</p>
                </div>

               
                <div className="border border-slate-100 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase">
                      <tr>
                        <th className="p-2">Description</th>
                        <th className="p-2 text-center">Qty</th>
                        <th className="p-2 text-right">Rate</th>
                        <th className="p-2 text-right pr-3">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                      <tr>
                        <td className="p-2 text-slate-800 font-semibold">{selectedItem.item}</td>
                        <td className="p-2 text-center">{selectedItem.qty}</td>
                        <td className="p-2 text-right">Calculated</td>
                        <td className="p-2 text-right pr-3 text-slate-800 font-semibold">{selectedItem.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              
              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex-1">
                  <select className="w-full border border-slate-200 rounded-lg p-2 text-xs bg-white outline-none">
                    <option value="">Select Action (Approve / Reject)</option>
                    <option value="approve">Verify &amp; Route Forward</option>
                    <option value="reject">Deny &amp; Send Back</option>
                  </select>
                </div>
                <div className="flex-1">
                  <input type="text" placeholder="Enter administrative remarks..." className="w-full border border-slate-200 rounded-lg p-2 text-xs outline-none" />
                </div>
                <button
                  onClick={() => setView('dashboard')}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs px-6 py-2 rounded-lg shadow-sm hover:opacity-95 transition text-center"
                >
                  Submit Action
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}