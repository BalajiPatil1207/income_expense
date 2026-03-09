import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import {
  Plus, Pencil, Trash2, TrendingUp, Calendar, Clock, IndianRupee, Search, AreaChart as ChartIcon, ListOrdered,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Recharts for Wavy Graph
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IncomeIndex = () => {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchIncome = async () => {
    try {
      const res = await api.get("/income");
      setIncome(res.data.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/income/delete/${id}`);
        fetchIncome();
      } catch (error) {
        console.error("Delete failed:", error.message);
      }
    }
  };

  useEffect(() => { fetchIncome(); }, []);

  useEffect(() => {
    const total = income.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    setTotalIncome(total);
  }, [income]);

  const filteredIncome = income.filter((inc) =>
    inc.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-[#f9fafb] min-h-screen font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50">
  
  {/* Left Side: Title and Back Button */}
  <div className="flex items-center gap-4">
    <Link
      to="/dash"
      className="p-3 bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white rounded-2xl transition-all shadow-sm group"
      title="Go Back"
    >
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
    </Link>
    
    <div>
      <h1 className="text-3xl font-black text-slate-800 tracking-tight">Income Analytics</h1>
      <p className="text-slate-500 text-sm font-medium">Monitoring your cash inflow with precision.</p>
    </div>
  </div>

  {/* Right Side: Action Button */}
  <Link
    to="/dash/income/create"
    className="w-full md:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-200 transition-all active:scale-95 group"
  >
    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
    <span>Add Income</span>
  </Link>
</div>

      {/* --- STATS & GRAPH SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
            <h2 className="text-3xl font-black text-slate-900 flex items-center">
              <IndianRupee size={24} className="text-emerald-500" />
              {totalIncome.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Entries</p>
              <h2 className="text-3xl font-black text-slate-900">{filteredIncome.length}</h2>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <ListOrdered size={24} />
            </div>
          </div>
        </div>

        {/* Wavy Graph (Sea Type) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-64">
          <div className="flex items-center gap-2 mb-4">
            <ChartIcon size={18} className="text-emerald-500" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Income Wave</span>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={income}>
              <defs>
                <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#10b981" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorInc)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- SEARCH --- */}
      <div className="bg-white p-3 rounded-2xl border border-slate-100 mb-6 flex items-center px-6 shadow-sm">
        <Search className="text-slate-400 mr-3" size={20} />
        <input
          type="text"
          placeholder="Filter by source..."
          className="w-full py-2 bg-transparent outline-none font-bold text-slate-600 placeholder:text-slate-300"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Source</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredIncome.map((inc) => (
                <tr key={inc.income_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 capitalize">{inc.source}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar size={10} /> {inc.date} | <Clock size={10} /> {inc.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-black text-slate-700 text-lg">
                      ₹{Number(inc.amount).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/dash/income/edit/${inc.income_id}`}
                        className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => deleteHandler(inc.income_id)}
                        className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncomeIndex;