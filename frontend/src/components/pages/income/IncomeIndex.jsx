import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import {
  Plus, Pencil, Trash2, Calendar, Clock, Search, 
  ArrowLeft, TrendingUp, Filter, Download
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
  const filteredIncome = income.filter((inc) =>
    inc.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/income/delete/${id}`);
        fetchIncome();
      } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white w-full font-sans selection:bg-emerald-500/30">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 p-4 md:p-10 max-w-[1400px] mx-auto space-y-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <Link to="/dash" className="group p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500 transition-all duration-300">
              <ArrowLeft size={22} className="group-hover:text-black group-hover:scale-110 transition-transform" />
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Income <span className="text-emerald-500">Vault</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                   Live Analytics • {filteredIncome.length} Entries
                 </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Link to="/dash/income/create" className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
              <Plus size={18} strokeWidth={3} /> New Entry
            </Link>
          </div>
        </div>

        {/* --- ANALYTICS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stat Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] flex flex-col justify-between shadow-2xl"
          >
            <div>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Net Liquidity</p>
              <h2 className="text-6xl font-black text-white tracking-tighter">
                <span className="text-slate-600 text-3xl font-medium mr-1">₹</span>
                {totalIncome.toLocaleString("en-IN")}
              </h2>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <TrendingUp size={14} className="text-emerald-500" /> +12.5% vs Last Month
              </div>
            </div>
          </motion.div>

          {/* Wave Graph Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 p-8 rounded-[3rem] min-h-[300px] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-emerald-500 rounded-full" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Momentum</span>
              </div>
            </div>
            
            <div className="absolute inset-0 pt-16 -bottom-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={income}>
                  <defs>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    cursor={{ stroke: '#333', strokeWidth: 2 }}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '16px', padding: '12px' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
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
          </motion.div>
        </div>

        {/* --- SEARCH & LIST --- */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search across transactions..."
                className="w-full pl-16 pr-8 py-5 bg-[#0A0A0A] border border-white/10 rounded-3xl outline-none focus:border-emerald-500/50 transition-all font-bold text-white placeholder:text-slate-700 shadow-inner"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-slate-400 hover:text-white transition-all flex items-center justify-center gap-3">
               <Filter size={18} />
               <span className="text-[10px] font-black uppercase tracking-widest">Filters</span>
            </button>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="px-10 py-7">Origin</th>
                    <th className="px-10 py-7">Timestamp</th>
                    <th className="px-10 py-7 text-right">Value</th>
                    <th className="px-10 py-7 text-center">Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {filteredIncome.map((inc, i) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: i * 0.05 }}
                        key={inc.income_id} 
                        className="hover:bg-white/[0.03] transition-all group"
                      >
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                               <TrendingUp size={20} />
                            </div>
                            <span className="text-lg font-black text-white capitalize">{inc.source}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-2 tracking-tight">
                              <Calendar size={14} className="text-emerald-500/50" /> {inc.date}
                            </span>
                            <span className="text-[10px] font-bold text-slate-600 flex items-center gap-2 uppercase tracking-widest">
                              <Clock size={14} /> {inc.time}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <span className="text-2xl font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors">
                            ₹{Number(inc.amount).toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex items-center justify-center gap-3">
                            <Link to={`/dash/income/edit/${inc.income_id}`} className="w-12 h-12 flex items-center justify-center bg-white/5 text-slate-400 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl">
                              <Pencil size={18} />
                            </Link>
                            <button onClick={() => deleteHandler(inc.income_id)} className="w-12 h-12 flex items-center justify-center bg-white/5 text-slate-400 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-xl">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            {filteredIncome.length === 0 && (
              <div className="py-32 flex flex-col items-center justify-center text-slate-600">
                <div className="p-6 bg-white/5 rounded-full mb-4">
                   <Search size={40} className="opacity-20" />
                </div>
                <p className="font-black uppercase tracking-widest text-[10px]">No encrypted data found matching query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeIndex;