import React, { useState, useEffect } from 'react';
import Data from '../Data/inventoryData.json';
import { MdOutlineInventory2, MdOutlineDashboard, MdPayments, MdOutlinePendingActions, MdCheckCircleOutline, MdAddBox, MdArrowBack, MdPhotoCamera, MdDevicesOther, MdCheck } from "react-icons/md";
export default function MasterInventoryModule() {
  
  const [activeTab, setActiveTab] = useState('stocks'); 
  const [view, setView] = useState('dashboard');        
  const [showSuccessModal, setShowSuccessModal] = useState(false);

 
  const [stocksList, setStocksList] = useState(Data.stocks.items);
  const [inventoryList, setInventoryList] = useState(Data.inventory.items);

 
  const [formData, setFormData] = useState({
    productName: '',
    productId: '',
    category: 'Stationeries',
    qtyPurchased: '',
    unitPrice: '',
    supplier: ''
  });


  useEffect(() => {
    if (showSuccessModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showSuccessModal]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenForm = () => {
   
    setFormData(prev => ({
      ...prev,
      category: activeTab === 'stocks' ? 'Stationeries' : 'Office equipments'
    }));
    setView('form');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'inventory') {
      
      setShowSuccessModal(true);
    } else {
     
      saveItemData();
    }
  };

  const saveItemData = () => {
    const priceNum = parseFloat(formData.unitPrice) || 0;
    const qtyNum = parseInt(formData.qtyPurchased) || 0;
    const totalCalc = priceNum * qtyNum;

    if (activeTab === 'stocks') {
      let derivedStatus = 'In stock';
      if (qtyNum === 0) derivedStatus = 'Out of Stock';
      else if (qtyNum <= 10) derivedStatus = 'Low in stock';

      const newItem = {
        sn: String(stocksList.length + 1).padStart(2, '0'),
        name: formData.productName || 'New Stock Item',
        productId: formData.productId || String(Math.floor(10000000 + Math.random() * 90000000)),
        category: formData.category,
        qty: `${qtyNum}pcs`,
        unitPrice: `₦${priceNum.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        totalAmount: `₦${totalCalc.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        inStock: `${qtyNum}pcs`,
        supplier: formData.supplier || "Big Ben's Store",
        status: derivedStatus
      };
      setStocksList([newItem, ...stocksList]);
    } else {
      const newItem = {
        sn: String(inventoryList.length + 1).padStart(2, '0'),
        name: formData.productName || 'New Asset Item',
        productId: formData.productId || String(Math.floor(10000000 + Math.random() * 90000000)),
        category: formData.category,
        qty: `${qtyNum}pcs`,
        unitPrice: `₦${priceNum.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        totalAmount: `₦${totalCalc.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        supplier: formData.supplier || "Big Ben's Store",
        status: 'All functioning'
      };
      setInventoryList([newItem, ...inventoryList]);
    }

    
    setFormData({ productName: '', productId: '', category: 'Stationeries', qtyPurchased: '', unitPrice: '', supplier: '' });
    setShowSuccessModal(false);
    setView('dashboard');
  };

 
  const currentMetrics = activeTab === 'stocks' ? Data.stocks.metrics : Data.inventory.metrics;

  return (
    
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-6 font-sans text-slate-700 overflow-x-hidden">
      
      
      {view === 'dashboard' && (
        <div className="w-full max-w-full mx-auto space-y-6 overflow-hidden">
          
        
          <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold pb-2 text-slate-400">
            <button 
              onClick={() => setActiveTab('stocks')} 
              className={`pb-2 px-1 transition ${activeTab === 'stocks' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-600'}`}
            >
              Stocks
            </button>
            <button 
              onClick={() => setActiveTab('inventory')} 
              className={`pb-2 px-1 transition ${activeTab === 'inventory' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-600'}`}
            >
              Inventory
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {currentMetrics.map((card) => (
              <div key={card.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center min-w-0">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight truncate">
                      {card.id === 2 ? (activeTab === 'stocks' ? stocksList.length : inventoryList.length) : card.value}
                    </span>
                    {card.id === 1 && <span className="text-[11px] text-slate-400 font-medium truncate">Categories</span>}
                  </div>
                  {card.id !== 1 && <h4 className="text-xs font-medium text-slate-400 truncate">{card.title}</h4>}
                  <p className={`text-[10px] font-semibold flex items-center gap-0.5 whitespace-nowrap ${card.id === 3 ? 'text-red-500' : 'text-green-500'}`}>
                    <span>{card.id === 3 ? '↓' : '↑'}</span> {card.trend}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-inner flex-shrink-0 ml-2">
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

         
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <div>
              <h2 className="text-sm font-bold text-slate-800 tracking-tight">
                Update {activeTab === 'stocks' ? 'Stock' : 'Inventory'} List
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">Update context metrics entries tables</p>
            </div>
            <button 
              onClick={handleOpenForm}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition shadow-sm whitespace-nowrap w-full sm:w-auto"
            >
              Update {activeTab === 'stocks' ? 'Stock' : 'Inventory'}
            </button>
          </div>

         
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 w-full max-w-full overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h3 className="text-xs font-bold text-slate-800">{activeTab === 'stocks' ? 'Stock List' : 'Inventory List'}</h3>
            </div>
            
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs whitespace-nowrap border-collapse table-auto">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                    <th className="p-4 pl-6">S/N</th>
                    <th className="p-4">Image</th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Product ID</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">QTY Purchased</th>
                    <th className="p-4">Unit Price</th>
                    <th className="p-4">Total Amount</th>
                    {activeTab === 'stocks' && <th className="p-4">In-Stock</th>}
                    <th className="p-4">Supplier</th>
                    <th className="p-4 pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  {(activeTab === 'stocks' ? stocksList : inventoryList).map((item) => (
                    <tr key={item.sn} className="hover:bg-slate-50/40 transition">
                      <td className="p-4 pl-6 text-slate-400 font-normal">{item.sn}</td>
                      <td className="p-4">
                        <div className="w-7 h-7 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-xs">
  {activeTab === 'stocks' ? <MdOutlineInventory2 /> : <MdDevicesOther />}
</div>
                      </td>
                      <td className="p-4 text-slate-800 font-semibold">{item.name}</td>
                      <td className="p-4 text-slate-500 font-normal">{item.productId}</td>
                      <td className="p-4 text-slate-500">{item.category}</td>
                      <td className="p-4 text-slate-700 font-semibold">{item.qty}</td>
                      <td className="p-4 text-slate-500">{item.unitPrice}</td>
                      <td className="p-4 text-slate-800 font-semibold">{item.totalAmount}</td>
                      {activeTab === 'stocks' && <td className="p-4 text-slate-500">{item.inStock}</td>}
                      <td className="p-4 text-slate-500">{item.supplier}</td>
                      <td className="p-4 pr-6">
                        <span className={`text-[11px] font-bold ${
                          item.status === 'In stock' || item.status.includes('All') ? 'text-green-500' : 
                          item.status === 'Low in stock' || item.status.includes('functioning') ? 'text-amber-500' : 'text-red-500'
                        }`}>
                          {item.status}
                        </span>
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
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
              <button 
                onClick={() => setView('dashboard')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mb-2"
              >
                <span className="flex items-center gap-1">
  <MdArrowBack size={14} /> Back
</span>
              </button>
              <h2 className="text-base font-bold text-slate-800">
                Update {activeTab === 'stocks' ? 'Stock' : 'Inventory'}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Add new item item logs</p>
            </div>
            
            <div className="flex items-center gap-3 text-right">
              <div>
                <p className="text-xs font-bold text-slate-800">Otor John</p>
                <p className="text-[10px] text-slate-400 font-medium">HR Office</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">OJ</div>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
            
          
            <div className="md:col-span-4 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50/50 min-h-[260px]">
              <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 text-lg shadow-sm mb-4">
              <MdPhotoCamera className="text-xl" />
              </div>
              <button type="button" className="text-xs font-bold text-slate-700 hover:text-blue-600">Upload photo</button>
              <p className="text-[10px] text-slate-400 font-medium mt-2">Allowed format<br />JPG, JPEG, and PNG</p>
              <p className="text-[10px] text-slate-400 font-medium mt-2">Max file size<br />2MB</p>
            </div>

          
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Product name</label>
                <input 
                  type="text" name="productName" value={formData.productName} onChange={handleInputChange}
                  placeholder="Enter product name" className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500" required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Product ID</label>
                <input 
                  type="text" name="productId" value={formData.productId} onChange={handleInputChange}
                  placeholder="Enter ID" className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500" required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
                <select 
                  name="category" value={formData.category} onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none bg-white text-slate-600"
                >
                  {activeTab === 'stocks' ? (
                    <>
                      <option value="Stationeries">Stationeries</option>
                      <option value="Detergent">Detergent</option>
                    </>
                  ) : (
                    <>
                      <option value="Office equipments">Office equipments</option>
                      <option value="Automobile">Automobile</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Furnitures">Furnitures</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">QTY purchased</label>
                <input 
                  type="number" name="qtyPurchased" value={formData.qtyPurchased} onChange={handleInputChange}
                  placeholder="Enter quantity" className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500" required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Unit price</label>
                <input 
                  type="number" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange}
                  placeholder="Enter amount" className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500" required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Total amount</label>
                <div className="w-full text-xs border border-slate-100 rounded-lg p-2.5 bg-slate-50 text-slate-500 font-semibold min-h-[38px] flex items-center">
                  ₦{((parseFloat(formData.unitPrice) || 0) * (parseInt(formData.qtyPurchased) || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Supplier</label>
                <input 
                  type="text" name="supplier" value={formData.supplier} onChange={handleInputChange}
                  placeholder="Enter supplier name" className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500" required
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white text-xs font-bold px-10 py-2.5 rounded-lg shadow-sm hover:opacity-95 transition"
                >
                  Add Item
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

    
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 max-w-xs w-full text-center space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center text-xl shadow-sm">
              <MdCheck size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800">Congratulations</h3>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                Your inventory has been updated successfully.
              </p>
            </div>
            <button 
              onClick={saveItemData}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold py-2 rounded-lg shadow-sm"
            >
              Ok
            </button>
          </div>
        </div>
      )}

    </div>
  );
}