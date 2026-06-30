import React, { useState } from 'react';
import data from '../Data/Capacity.json';
import { MdOutlineAssessment, MdPeopleOutline, MdCheckCircleOutline, MdLightbulbOutline, MdArrowBack, MdOutlineEdit } from "react-icons/md";
export default function CapacityBuildingModule() {
  const [currentView, setCurrentView] = useState('dashboard');


  const [trainings, setTrainings] = useState([
    { id: '01', description: 'Staff Health and Safety Training', date: '03/12/2022', type: 'Team training', duration: '3 weeks', mode: 'Physical', status: 'Inprogress' },
    { id: '02', description: 'Staff Health and Safety Training', date: '03/12/2022', type: 'Team', duration: '2weeks', mode: 'Online', status: 'To-do' },
    { id: '03', description: 'Staff Health and Safety Training', date: '03/12/2022', type: 'Team', duration: '3days', mode: 'Physical', status: 'Completed' },
    { id: '04', description: 'Staff Health and Safety Training', date: '03/12/2022', type: 'Team', duration: '3days', mode: 'Physical', status: 'Completed' },
    { id: '05', description: 'Staff Health and Safety Training', date: '03/12/2022', type: 'Individual', duration: '1week', mode: 'Online', status: 'Completed' }
  ]);


  const [selectedTraining, setSelectedTraining] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('')
  const [formData, setFormData] = useState({
    description: '',
    type: 'Team training',
    duration: '3 weeks',
    date: '',
    mode: 'Physical',
    staff: 'Fatima Mohammed'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleMakeRequestClick = () => {
    setCurrentView('form');
  };

  const handleSaveAndSubmit = (e) => {
    e.preventDefault();
    const newId = String(trainings.length + 1).padStart(2, '0');
    const newRequest = {
      id: newId,
      description: formData.description || 'Staff Health and Safety Training',
      date: formData.date || '23/06/2026',
      type: formData.type,
      duration: formData.duration,
      mode: formData.mode,
      status: 'Inprogress'
    };

    setTrainings([newRequest, ...trainings]);
    setSelectedTraining(newRequest);
    setUpdatedStatus('Inprogress');
    setCurrentView('detail');
  };


  const handleViewMore = (item) => {
    setSelectedTraining(item);
    setUpdatedStatus(item.status);
    setCurrentView('detail');
  };


  const handleStatusUpdate = () => {
    if (!selectedTraining) return;


    const updatedDataset = trainings.map((t) => {
      if (t.id === selectedTraining.id) {
        return { ...t, status: updatedStatus };
      }
      return t;
    });

    setTrainings(updatedDataset);
    setSelectedTraining({ ...selectedTraining, status: updatedStatus });
    setCurrentView('dashboard');
  };


  const totalRequests = trainings.length * 70;
  const totalTrained = trainings.filter(t => t.status === 'Completed').length * 200 + 400;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-700">


      {currentView === 'dashboard' && (
        <div className="max-w-6xl mx-auto space-y-6">


          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-slate-800">350</span>
                <h3 className="text-xs font-medium text-slate-400 mt-0.5">Total training request</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl">
                <MdOutlineAssessment />
              </div>            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-slate-800">800</span>
                <h3 className="text-xs font-medium text-slate-400 mt-0.5">Total staff trained</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-xl">
                <MdPeopleOutline />
              </div>            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-slate-800">300</span>
                <h3 className="text-xs font-medium text-slate-400 mt-0.5">Total training done</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center text-xl">
                <MdCheckCircleOutline />
              </div>            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-slate-800">70%</span>
                <h3 className="text-xs font-medium text-slate-400 mt-0.5">Staff training rate</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-xl">
                <MdLightbulbOutline />
              </div>
            </div>
          </div>


          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-800">Training request</h2>
            <button
              onClick={handleMakeRequestClick}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg text-xs font-semibold transition shadow-sm"
            >
              Make Training Request
            </button>
          </div>


          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">All Trainings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 bg-slate-50/50">
                    <th className="p-3 pl-4">S/N</th>
                    <th className="p-3">Training Description</th>
                    <th className="p-3">Start Date</th>
                    <th className="p-3">Training Type</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Training Mode</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 pr-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {trainings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40">
                      <td className="p-3 pl-4 text-slate-400 font-normal">{item.id}</td>
                      <td className="p-3 text-slate-700 font-semibold">{item.description}</td>
                      <td className="p-3 text-slate-500">{item.date}</td>
                      <td className="p-3 text-slate-500">{item.type}</td>
                      <td className="p-3 text-slate-500">{item.duration}</td>
                      <td className="p-3 text-slate-500">{item.mode}</td>
                      <td className="p-3">
                        <span className={`font-bold ${item.status === 'Inprogress' ? 'text-orange-500' :
                          item.status === 'To-do' ? 'text-slate-500' : 'text-green-500'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 pr-4 text-center">
                        <button
                          onClick={() => handleViewMore(item)}
                          className="text-blue-600 font-bold hover:underline"
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


      {currentView === 'form' && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
          <div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 mb-4"
            >
              ‹ Back
            </button>
            <h2 className="text-base font-bold text-slate-800">Training Request</h2>
          </div>

          <form onSubmit={handleSaveAndSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Training description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Training type</label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none">
                  <option value="Team training">Team training</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Training duration</label>
                <select name="duration" value={formData.duration} onChange={handleInputChange} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none">
                  <option value="3 weeks">3 weeks</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Training date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white text-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Training mode</label>
                <select name="mode" value={formData.mode} onChange={handleInputChange} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none">
                  <option value="Physical">Physical</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Staff to be trained</label>
                <select name="staff" value={formData.staff} onChange={handleInputChange} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none">
                  <option value="Fatima Mohammed">Select names</option>
                  <option value="Fatima Mohammed">Fatima Mohammed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-xs font-semibold px-6 py-2 rounded shadow-sm hover:opacity-95"
              >
                Save and Submit
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('dashboard')}
                className="border border-blue-400 text-blue-500 text-xs font-semibold px-6 py-2 rounded bg-white hover:bg-slate-50"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}


      {currentView === 'detail' && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-8">
          <div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 mb-4"
            >
              ‹ Back
            </button>
            <h2 className="text-base font-bold text-slate-900">{selectedTraining?.description || 'Staff Health and Safety Training'}</h2>
          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/40 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Training type</span>
              <span className="text-xs font-bold text-slate-800 block mt-1">{selectedTraining?.type || 'Team training'}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Training duration</span>
              <span className="text-xs font-bold text-slate-800 block mt-1">{selectedTraining?.duration || '3 weeks'}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Training mode</span>
              <span className="text-xs font-bold text-slate-800 block mt-1">{selectedTraining?.mode || 'Physical'}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Training status</span>
              <span className={`text-xs font-bold block mt-1 ${selectedTraining?.status === 'Inprogress' ? 'text-orange-500' : 'text-green-500'
                }`}>{selectedTraining?.status || 'Inprogress'}</span>
            </div>
          </div>


          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Training participant</h4>
            <div className="space-y-2 text-xs font-medium text-slate-600 pl-1">
              <p>1. Fatima Mohammed</p>
              <p>2. Ibrahim Bankole</p>
              <p>3. Otor John Stephen</p>
              <p>4. Abubakar Alghazali</p>
              <p>5. Ranky Akab</p>
              <p>6. Sadiq Lukman</p>
            </div>
          </div>


          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Update status</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg p-2.5 bg-white w-full sm:w-64 focus:outline-none"
              >
                <option value="Inprogress">Inprogress</option>
                <option value="To-do">To-do</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-xs font-semibold px-8 py-2.5 rounded shadow-sm hover:opacity-95 transition w-full sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}