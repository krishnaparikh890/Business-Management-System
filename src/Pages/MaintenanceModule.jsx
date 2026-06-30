import React, { useState } from 'react';

import data from '../Data/maintenanceData.json';

export default function MaintenanceModule() {
 
  const [currentView, setCurrentView] = useState('dashboard');

 
  const [formData, setFormData] = useState({
    itemName: '',
    number: '',
    date: '',
    maintenanceType: '',
    recurringOption: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-700">
      
     
      {currentView === 'dashboard' && (
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(data?.summaryCards || []).map((card) => (
              <div key={card.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-4xl font-bold text-slate-800">{card.count}</span>
                  <h3 className="text-sm font-medium text-slate-500">{card.title}</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                    <span>↑</span> {card.trend}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  ⚙️
                </div>
              </div>
            ))}
          </div>

         
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Schedule a Maintenance</h2>
              <p className="text-xs text-slate-400 mt-0.5">View and create schedule for maintenance</p>
            </div>
            <button 
              onClick={() => setCurrentView('form')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-md"
            >
              Schedule Maintenance
            </button>
          </div>

         
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-base font-bold text-slate-800 mb-6">Scheduled Maintenance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              <div className="md:col-span-5 border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                <div className="flex justify-between items-center mb-4 px-2">
                  <button className="text-slate-400 hover:text-slate-600">‹</button>
                  <span className="text-sm font-bold text-slate-700">November 2022</span>
                  <button className="text-slate-400 hover:text-slate-600">›</button>
                </div>
                <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
                  {['S','M','T','W','T','F','S'].map((d, i) => (
                    <span key={i} className="text-slate-400 font-semibold">{d}</span>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <div key={day} className="flex justify-center items-center h-8">
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-slate-600 font-medium
                        ${day === 18 ? 'bg-blue-600 text-white shadow-sm' : ''}
                        ${day === 17 ? 'text-blue-500 font-bold border border-blue-200' : ''}
                        ${day === 3 ? 'bg-orange-100 text-orange-600' : ''}
                      `}>
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

           
              <div className="md:col-span-7 space-y-4 flex flex-col justify-center">
                {(data?.upcomingEvents || []).map((event) => (
                  <div key={event.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 block font-medium">{event.date}</span>
                      <p className="text-sm font-semibold text-slate-700">{event.title}</p>
                    </div>
                    <button 
                      onClick={() => setCurrentView('detail')}
                      className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition self-start sm:self-center"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    
      {currentView === 'form' && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
         
          <div className="p-6 border-b border-slate-100">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 mb-4"
            >
              ‹ Back to Dashboard
            </button>
            <h2 className="text-xl font-bold text-slate-800">Schedule Maintenance</h2>
            <p className="text-xs text-slate-400 mt-1">Kindly fill in the form below to schedule a maintenance.</p>
          </div>

         
          <form onSubmit={(e) => { e.preventDefault(); setCurrentView('detail'); }} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Item name</label>
                <select name="itemName" onChange={handleInputChange} className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                  <option value="">Select item</option>
                  <option value="2Hp Hisense Air Condition">2Hp Hisense Air Condition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Number</label>
                <select name="number" onChange={handleInputChange} className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                  <option value="">Select option</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Date</label>
                <input type="date" name="date" onChange={handleInputChange} className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Maintenance type</label>
                <select name="maintenanceType" onChange={handleInputChange} className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                  <option value="">Select option</option>
                  <option value="Recurring">Recurring</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Recurring option</label>
                <select name="recurringOption" onChange={handleInputChange} className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                  <option value="">Select option</option>
                  <option value="Every two months">Every two months</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold shadow-md transition"
              >
                Schedule Maintenance
              </button>
            </div>
          </form>
        </div>
      )}

     
      {currentView === 'detail' && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 mb-4"
            >
              ‹ Back
            </button>
            <h2 className="text-xl font-bold text-slate-800">Scheduled Maintenance</h2>
            
           
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Item name</span>
                <span className="text-sm font-semibold text-slate-700 block mt-1">{formData.itemName || '2Hp Hisense Air Condition'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Number</span>
                <span className="text-sm font-semibold text-slate-700 block mt-1">{formData.number || '3'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                <span className="text-sm font-semibold text-slate-700 block mt-1">{formData.date || '18/11/2022'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Maintenance type</span>
                <span className="text-sm font-semibold text-slate-700 block mt-1">{formData.maintenanceType || 'Recurring'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recurring type</span>
                <span className="text-sm font-semibold text-slate-700 block mt-1">{formData.recurringOption || 'Every two months'}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1 border border-green-200">
                  ● Completed
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition">
                Attach Payment Invoice
              </button>
            </div>
          </div>

         
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[400px] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Maintenance Breakdown</h3>
            </div>

            
            <div className="flex flex-col items-center justify-center my-auto py-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap justify-center">
                To Be Designed
              </h2>
              <div className="text-4xl md:text-5xl mt-3 flex justify-center items-center gap-1 select-none">
                <span>😍</span>
                <span className="text-amber-400 text-3xl">✨</span>
                <span className="text-amber-400 text-3xl">✨</span>
                <span>😍</span>
              </div>
            </div>

         
            <div className="pt-4 flex justify-start">
              <button 
                type="button"
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 hover:opacity-95 text-white text-xs font-semibold px-9 py-2.5 rounded shadow-sm transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}