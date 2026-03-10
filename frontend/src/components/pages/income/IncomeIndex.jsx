import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import {
  Plus, Pencil, Trash2, Calendar, Clock, IndianRupee, Search, 
  ArrowLeft, AreaChart as ChartIcon, ListOrdered, TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IncomeIndex = () => {
  const [income, setIncome] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchIncome = async () => {
    try {
      const res = await api.get("/income");
      setIncome(res.data.data || []);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => { fetchIncome(); }, []);

  const totalIncome = income.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  
  // Filtering logic
  const filteredIncome = income.filter((inc) =>
    inc.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/income/delete/${id}`);
        fetchIncome();
      } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white w-full">
      <div className="p-4 md:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <Link to="/dash" className="p-4 bg-[#111] border border-white/10 rounded-2xl hover:bg-emerald-500 hover:text-black transition-all">
              <ArrowLeft size={22} />
            </Link>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Income Analytics</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">
                Total Entries: <span className="text-emerald-500">{filteredIncome.length}</span>
              </p>
            </div>
          </div>
          
          <Link to="/dash/income/create" className="w-full md:w-auto flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)]">
            <Plus size={20} strokeWidth={3} /> Add Income
          </Link>
        </div>

        {/* --- STATS & WAVE GRAPH --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Revenue</p>
            <h2 className="text-5xl font-black text-white tracking-tighter flex items-baseline">
              <span className="text-emerald-500 text-2xl mr-2 font-medium">₹</span>
              {totalIncome.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] h-64 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <TrendingUp size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Income Wave (Green)</span>
            </div>
            
            <div className="absolute inset-0 pt-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={income}>
                  <defs>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorGreen)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by source..."
            className="w-full pl-16 pr-8 py-5 bg-[#0A0A0A] border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold text-white placeholder:text-slate-700"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- FULL WIDTH DATA TABLE --- */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Income Source</th>
                <th className="px-8 py-6">Date & Time</th>
                <th className="px-8 py-6 text-right">Amount</th>
                <th className="px-8 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredIncome.map((inc) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    key={inc.income_id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <span className="text-lg font-bold text-white capitalize group-hover:text-emerald-400 transition-colors">{inc.source}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col text-slate-500 text-xs font-bold uppercase">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {inc.date}</span>
                        <span className="flex items-center gap-1 mt-1 opacity-60"><Clock size={12} /> {inc.time}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-xl font-black text-white tracking-tighter">+ ₹{Number(inc.amount).toLocaleString("en-IN")}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/dash/income/edit/${inc.income_id}`} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-emerald-500 hover:text-black transition-all">
                          <Pencil size={16} />
                        </Link>
                        <button onClick={() => deleteHandler(inc.income_id)} className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredIncome.length === 0 && (
            <div className="p-20 text-center text-slate-600 font-bold uppercase tracking-widest text-xs">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeIndex;