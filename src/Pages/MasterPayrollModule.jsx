import React, { useState } from 'react';
import Data from '../Data/PayRollData.json';
import { MdWork, MdTrendingDown, MdAccountBalanceWallet, MdSettings } from "react-icons/md";
export default function MasterPayrollModule() {
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [innerView, setInnerView] = useState('list');


  const [payrollList, setPayrollList] = useState(() => Data?.payrollList || []);
  const [structures, setStructures] = useState(() => Data?.salaryStructures || []);
  const [taxBrackets, setTaxBrackets] = useState(() => Data?.taxBrackets || []);
  const [selectedPayslip, setSelectedPayslip] = useState(() => Data?.payrollList?.[0] || {
    id: "N/A", name: "No Data Selected", role: "N/A", basic: 0, allowances: 0, tax: 0, net: 0, status: "N/A"
  });

  
  const [breakdownForm, setBreakdownForm] = useState({ code: '', name: '', base: '', housing: '', transport: '', medical: '' });
  const [taxForm, setTaxForm] = useState({ id: '', tier: '', rate: '', minSalary: '', maxSalary: '' });
  const [runPayrollDate, setRunPayrollDate] = useState('2026-06');

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    setInnerView('list');
  };

 
  const totalGrossPayroll = payrollList.reduce((acc, emp) => acc + (emp.basic || 0) + (emp.allowances || 0), 0);
  const totalTaxDeductions = payrollList.reduce((acc, emp) => acc + (emp.tax || 0), 0);
  const totalNetPayout = payrollList.reduce((acc, emp) => acc + (emp.net || 0), 0);

  const handleAddStructure = (e) => {
    e.preventDefault();
    const newStructure = {
      code: breakdownForm.code || `STR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: breakdownForm.name,
      base: parseFloat(breakdownForm.base) || 0,
      housing: parseFloat(breakdownForm.housing) || 0,
      transport: parseFloat(breakdownForm.transport) || 0,
      medical: parseFloat(breakdownForm.medical) || 0
    };
    setStructures([...structures, newStructure]);
    setBreakdownForm({ code: '', name: '', base: '', housing: '', transport: '', medical: '' });
    setInnerView('list');
  };

  const handleAddTaxTier = (e) => {
    e.preventDefault();
    const newTax = {
      id: taxForm.id || `TX-${Math.floor(10 + Math.random() * 90)}`,
      tier: taxForm.tier,
      rate: parseFloat(taxForm.rate) || 0,
      minSalary: parseFloat(taxForm.minSalary) || 0,
      maxSalary: parseFloat(taxForm.maxSalary) || 0
    };
    setTaxBrackets([...taxBrackets, newTax]);
    setTaxForm({ id: '', tier: '', rate: '', minSalary: '', maxSalary: '' });
    setInnerView('list');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-6 font-sans text-slate-700 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        
       
        <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold pb-2 text-slate-400 overflow-x-auto no-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard Overview' },
            { id: 'payroll', label: 'Payroll Registry' },
            { id: 'breakdown', label: 'Salary Definitions' },
            { id: 'tax', label: 'Tax Brackets' },
            { id: 'payslip', label: 'Employee Payslip' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchTab(tab.id)}
              className={`pb-2 px-1 transition relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
        
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-xl md:text-2xl font-bold text-slate-800 block truncate">₦{totalGrossPayroll.toLocaleString()}</span>
                  <h4 className="text-xs font-medium text-slate-400 truncate">Total Gross Payroll</h4>
                  <p className="text-[10px] font-semibold text-blue-500 whitespace-nowrap">Active Month Run</p>
                </div>
<div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center ml-2">
  <MdWork size={20} />
</div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-xl md:text-2xl font-bold text-slate-800 block truncate">₦{totalTaxDeductions.toLocaleString()}</span>
                  <h4 className="text-xs font-medium text-slate-400 truncate">Statutory PAYE Pool</h4>
                  <p className="text-[10px] font-semibold text-red-500 whitespace-nowrap">Total Deductions</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center  ml-2"><MdTrendingDown size={20}/></div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-xl md:text-2xl font-bold text-slate-800 block truncate">₦{totalNetPayout.toLocaleString()}</span>
                  <h4 className="text-xs font-medium text-slate-400 truncate">Net Direct Payouts</h4>
                  <p className="text-[10px] font-semibold text-green-500 whitespace-nowrap">Bank Disbursable</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg font-bold ml-2"><MdAccountBalanceWallet size={20}/></div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-xl md:text-2xl font-bold text-slate-800 block truncate">{structures.length} Models</span>
                  <h4 className="text-xs font-medium text-slate-400 truncate">Salary Grade Structures</h4>
                  <p className="text-[10px] font-semibold text-purple-500 whitespace-nowrap">{taxBrackets.length} Active Tax Tiers</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold ml-2"><MdSettings size={20}/></div>
              </div>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Registry Snapshot</h3>
                  <button type="button" onClick={() => switchTab('payroll')} className="text-xs text-blue-600 font-bold hover:underline">View All Registry →</button>
                </div>
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 bg-slate-50/50">
                        <th className="p-3">Staff</th>
                        <th className="p-3 text-right">Gross Pay</th>
                        <th className="p-3 text-right">Net Remuneration</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                      {payrollList.slice(0, 4).map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-50/30">
                          <td className="p-3 font-semibold text-slate-800">{emp.name}</td>
                          <td className="p-3 text-right font-mono">₦{((emp.basic || 0) + (emp.allowances || 0)).toLocaleString()}</td>
                          <td className="p-3 text-right font-mono font-bold text-slate-800">₦{(emp.net || 0).toLocaleString()}</td>
                          <td className="p-3 text-center">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${emp.status === 'Paid' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>{emp.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              
              <div className="space-y-4">
              
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Active Salary Grades</h3>
                    <button type="button" onClick={() => switchTab('breakdown')} className="text-[11px] text-blue-600 font-semibold hover:underline">Manage</button>
                  </div>
                  <div className="space-y-2">
                    {structures.slice(0, 3).map((str) => (
                      <div key={str.code} className="flex justify-between items-center p-2 rounded-lg bg-slate-50/70 text-xs border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-700">{str.name}</p>
                          <p className="text-[10px] font-mono text-slate-400">{str.code}</p>
                        </div>
                        <span className="font-mono font-bold text-slate-800">₦{(str.base || 0).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

               
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Statutory Tax Scales</h3>
                    <button type="button" onClick={() => switchTab('tax')} className="text-[11px] text-blue-600 font-semibold hover:underline">Configure</button>
                  </div>
                  <div className="space-y-2">
                    {taxBrackets.slice(0, 3).map((tax) => (
                      <div key={tax.id} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-600 truncate max-w-[140px]">{tax.tier}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-400">₦{(tax.minSalary || 0).toLocaleString()} base</span>
                          <span className="bg-red-50 text-red-500 font-bold px-1.5 py-0.5 rounded text-[10px]">{tax.rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

       
        {activeTab === 'payroll' && innerView === 'list' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Process Global Monthly Payroll</h2>
                <p className="text-[10px] text-slate-400 font-medium">Verify employee logs, statutory percentages, and issue automated bank disbursements.</p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input type="month" value={runPayrollDate} onChange={(e) => setRunPayrollDate(e.target.value)} className="text-xs border border-slate-200 rounded-lg p-2 bg-white outline-none font-semibold text-slate-600" />
                <button type="button" onClick={() => alert(`Payroll compiled and finalized for period: ${runPayrollDate}`)} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm whitespace-nowrap flex-1 sm:flex-none">
                  Run Active Payroll
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 w-full overflow-hidden">
              <div className="p-4 border-b border-slate-50"><h3 className="text-xs font-bold text-slate-800">Current Payroll Registry</h3></div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-xs whitespace-nowrap border-collapse table-auto">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/70">
                      <th className="p-4 pl-6">ID</th>
                      <th className="p-4">Staff Member</th>
                      <th className="p-4">Designation Role</th>
                      <th className="p-4 text-right">Basic Base</th>
                      <th className="p-4 text-right">Gross Allowances</th>
                      <th className="p-4 text-right">PAYE Deduct</th>
                      <th className="p-4 text-right">Net Remuneration</th>
                      <th className="p-4 pr-6 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                    {payrollList.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/40 transition">
                        <td className="p-4 pl-6 text-slate-400 font-mono">{emp.id}</td>
                        <td className="p-4 text-slate-800 font-semibold">{emp.name}</td>
                        <td className="p-4 text-slate-500">{emp.role}</td>
                        <td className="p-4 text-right font-mono">₦{(emp.basic || 0).toLocaleString()}</td>
                        <td className="p-4 text-right font-mono text-green-600">+₦{(emp.allowances || 0).toLocaleString()}</td>
                        <td className="p-4 text-right font-mono text-red-500">-₦{(emp.tax || 0).toLocaleString()}</td>
                        <td className="p-4 text-right font-bold text-slate-800 font-mono">₦{(emp.net || 0).toLocaleString()}</td>
                        <td className="p-4 pr-6 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${emp.status === 'Paid' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>{emp.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      
        {activeTab === 'breakdown' && (
          innerView === 'list' ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Salary Compensation Grade Models</h3>
                  <p className="text-[10px] text-slate-400">Configure corporate baseline ranges and allowances.</p>
                </div>
                <button type="button" onClick={() => setInnerView('create')} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm">
                  + Create Salary Definition
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 w-full overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs whitespace-nowrap border-collapse table-auto">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/70">
                        <th className="p-4 pl-6">Structure Code</th>
                        <th className="p-4">Grade Label Name</th>
                        <th className="p-4 text-right">Basic Monthly</th>
                        <th className="p-4 text-right">Housing Remit</th>
                        <th className="p-4 text-right">Transport Allowance</th>
                        <th className="p-4 text-right pr-6">Medical Insurance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                      {structures.map((str) => (
                        <tr key={str.code} className="hover:bg-slate-50/40 transition">
                          <td className="p-4 pl-6 font-mono text-blue-600 font-bold">{str.code}</td>
                          <td className="p-4 text-slate-800 font-semibold">{str.name}</td>
                          <td className="p-4 text-right font-mono">₦{(str.base || 0).toLocaleString()}</td>
                          <td className="p-4 text-right font-mono text-slate-500">₦{(str.housing || 0).toLocaleString()}</td>
                          <td className="p-4 text-right font-mono text-slate-500">₦{(str.transport || 0).toLocaleString()}</td>
                          <td className="p-4 text-right pr-6 font-mono text-slate-500">₦{(str.medical || 0).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
              <div className="border-b pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Establish New Salary Structure Definition</h3>
                  <p className="text-[10px] text-slate-400">Map out the standard recurring payment distributions.</p>
                </div>
                <button type="button" onClick={() => setInnerView('list')} className="text-xs text-blue-600 hover:underline font-bold">‹ Back</button>
              </div>
              <form onSubmit={handleAddStructure} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Structure Code</label>
                  <input type="text" placeholder="e.g. STR-EXEC" value={breakdownForm.code} onChange={(e) => setBreakdownForm({...breakdownForm, code: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Grade Label Name</label>
                  <input type="text" placeholder="e.g. Senior Executive Group" value={breakdownForm.name} onChange={(e) => setBreakdownForm({...breakdownForm, name: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Basic Base Salary (₦)</label>
                  <input type="number" placeholder="0.00" value={breakdownForm.base} onChange={(e) => setBreakdownForm({...breakdownForm, base: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Housing Allowance (₦)</label>
                  <input type="number" placeholder="0.00" value={breakdownForm.housing} onChange={(e) => setBreakdownForm({...breakdownForm, housing: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Transport Allowance (₦)</label>
                  <input type="number" placeholder="0.00" value={breakdownForm.transport} onChange={(e) => setBreakdownForm({...breakdownForm, transport: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Medical Remittance (₦)</label>
                  <input type="number" placeholder="0.00" value={breakdownForm.medical} onChange={(e) => setBreakdownForm({...breakdownForm, medical: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" />
                </div>
                <div className="sm:col-span-2 pt-2">
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2.5 rounded-lg shadow-sm">Save Grade Profile Structure</button>
                </div>
              </form>
            </div>
          )
        )}

       
        {activeTab === 'tax' && (
          innerView === 'list' ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">PAYE Statutory Bracket Thresholds</h3>
                  <p className="text-[10px] text-slate-400">Configure tax parameters calculated over basic income ranges.</p>
                </div>
                <button type="button" onClick={() => setInnerView('create')} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm">
                  + Setup Tax Level
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 w-full overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs whitespace-nowrap border-collapse table-auto">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/70">
                        <th className="p-4 pl-6">ID Reference</th>
                        <th className="p-4">Tier Description Segment</th>
                        <th className="p-4 text-center">Tax Percentage Rate</th>
                        <th className="p-4 text-right">Floor Minimum Annualized</th>
                        <th className="p-4 text-right pr-6">Ceiling Maximum Limit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                      {taxBrackets.map((tax) => (
                        <tr key={tax.id} className="hover:bg-slate-50/40 transition">
                          <td className="p-4 pl-6 font-mono text-slate-400">{tax.id}</td>
                          <td className="p-4 text-slate-800 font-semibold">{tax.tier}</td>
                          <td className="p-4 text-center"><span className="bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold text-[11px]">{tax.rate}%</span></td>
                          <td className="p-4 text-right font-mono text-slate-500">₦{(tax.minSalary || 0).toLocaleString()}</td>
                          <td className="p-4 text-right pr-6 font-mono text-slate-500">₦{(tax.maxSalary || 0).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
              <div className="border-b pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Add Statutory Tax Tier Profile</h3>
                  <p className="text-[10px] text-slate-400">Specify global bracket rules applied automatically on global run.</p>
                </div>
                <button type="button" onClick={() => setInnerView('list')} className="text-xs text-blue-600 hover:underline font-bold">‹ Back</button>
              </div>
              <form onSubmit={handleAddTaxTier} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tier Classification Label</label>
                  <input type="text" placeholder="e.g. Upper Executive Bracket Scale" value={taxForm.tier} onChange={(e) => setTaxForm({...taxForm, tier: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Deduction Rate Percentage (%)</label>
                  <input type="number" max="100" placeholder="e.g. 12" value={taxForm.rate} onChange={(e) => setTaxForm({...taxForm, rate: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Minimum Income Bound (₦)</label>
                  <input type="number" placeholder="0.00" value={taxForm.minSalary} onChange={(e) => setTaxForm({...taxForm, minSalary: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Maximum Income Bound Ceiling Limit (₦)</label>
                  <input type="number" placeholder="0.00" value={taxForm.maxSalary} onChange={(e) => setTaxForm({...taxForm, maxSalary: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500" required />
                </div>
                <div className="sm:col-span-2 pt-2">
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2.5 rounded-lg shadow-sm">Save Tax Configuration Rule</button>
                </div>
              </form>
            </div>
          )
        )}

        {activeTab === 'payslip' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-4 bg-white border border-slate-100 shadow-sm rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 tracking-tight uppercase text-slate-400 border-b pb-2">Select Staff Ledger</h4>
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {payrollList.map((emp) => (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => setSelectedPayslip(emp)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium flex justify-between items-center transition ${
                      selectedPayslip.id === emp.id ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div>
                      <p className="font-bold">{emp.name}</p>
                      <p className="text-[10px] opacity-70 font-normal">{emp.role}</p>
                    </div>
                    <span className="font-mono font-bold text-[11px]">₦{(emp.net || 0).toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-8 bg-white border border-slate-200 shadow-md rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white font-mono text-[9px] font-bold px-4 py-1 rounded-bl-lg tracking-wider uppercase">Official Pay Stub</div>
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">RELIA ENERGY GROUP</h2>
                  <p className="text-[10px] text-slate-400 font-medium font-mono">Plot 1048 Core Operations Hub, Nigeria</p>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <p className="font-bold text-slate-700">Earnings Report Period</p>
                  <p className="font-medium font-mono">June 2026 Cycle</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-[11px]">
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Staff Full Name</p><p className="font-bold text-slate-800 mt-0.5">{selectedPayslip.name}</p></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Employee Code ID</p><p className="font-mono text-slate-700 mt-0.5">{selectedPayslip.id}</p></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Department Designation</p><p className="font-semibold text-slate-600 mt-0.5">{selectedPayslip.role}</p></div>
                <div><p className="text-[10px] text-slate-400 font-bold uppercase">Payment Mode Link</p><p className="font-medium text-slate-600 mt-0.5">Automated Wire Transfer</p></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <h4 className="font-bold text-green-600 border-b border-green-100 pb-1 uppercase text-[10px] tracking-wider">Gross Base Earnings</h4>
                  <div className="flex justify-between font-medium py-1 text-slate-600"><span>Basic Allocated Base Salary</span><span className="font-mono">₦{(selectedPayslip.basic || 0).toLocaleString()}</span></div>
                  <div className="flex justify-between font-medium py-1 text-slate-600"><span>Aggregate Operational Allowances</span><span className="font-mono text-green-600">+₦{(selectedPayslip.allowances || 0).toLocaleString()}</span></div>
                  <div className="flex justify-between font-bold border-t border-dashed pt-2 text-slate-800"><span>Total Consolidated Gross</span><span className="font-mono">₦{((selectedPayslip.basic || 0) + (selectedPayslip.allowances || 0)).toLocaleString()}</span></div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-red-500 border-b border-red-100 pb-1 uppercase text-[10px] tracking-wider">Statutory Deductions</h4>
                  <div className="flex justify-between font-medium py-1 text-slate-600"><span>PAYE National Income Tax Pool</span><span className="font-mono text-red-500">-₦{(selectedPayslip.tax || 0).toLocaleString()}</span></div>
                  <div className="flex justify-between font-medium py-1 text-slate-600"><span>Corporate Health Premium Insurance</span><span className="font-mono text-slate-400">₦0.00</span></div>
                  <div className="flex justify-between font-bold border-t border-dashed pt-2 text-slate-800"><span>Total Retained Deductions</span><span className="font-mono text-red-500">-₦{(selectedPayslip.tax || 0).toLocaleString()}</span></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 rounded-xl text-white flex justify-between items-center shadow-inner">
                <div>
                  <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Net Payable Disbursed Amount</h4>
                  <p className="text-[9px] text-slate-400 font-medium">Net take-home remuneration for active calendar cycle</p>
                </div>
                <div className="text-right font-mono font-black text-xl md:text-2xl text-emerald-400 tracking-tight">₦{(selectedPayslip.net || 0).toLocaleString()}</div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => window.print()} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-xs">🖨️ Print Slip</button>
                <button type="button" onClick={() => alert('PDF export stream compiled successfully.')} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs">Download Copy</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}