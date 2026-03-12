import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import {
  ArrowLeft, Pencil, Trash2, Plus, Search,
  Calendar, Clock, TrendingDown, LayoutGrid,
  ArrowDownCircle, ReceiptIndianRupee, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseIndex = () => {
  const [expense, setExpense] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchExpense = async () => {
    try {
      const res = await api.get("/expense");
      setExpense(res.data.data || []);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await api.delete(`/expense/delete/${id}`);
        fetchExpense();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => { fetchExpense(); }, []);

  useEffect(() => {
    const total = expense.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    setTotalAmount(total);
  }, [expense]);

  const filteredExpense = expense.filter((exp) =>
    exp.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 bg-[#050505] min-h-screen font-sans text-slate-100 relative overflow-hidden">
      
      {/* 🔴 Background Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-rose-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- 1. HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
        <div className="flex items-center gap-6">
          <Link to="/dash" className="group p-4 bg-[#111] border border-white/5 text-slate-500 rounded-3xl hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-xl">
            <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
              Expense <span className="text-rose-500 not-italic">Vault</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Capital Outflow Protocol Active</p>
            </div>
          </div>
        </div>

        <Link to="/dash/expense/create" className="group w-full md:w-auto flex items-center justify-center gap-4 bg-white text-black hover:bg-rose-500 hover:text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95">
          <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" /> 
          Register Expense
        </Link>
      </div>

      {/* --- 2. ANALYTICS & STATS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 relative z-10">
        
        <div className="space-y-6">
          {/* Total Amount Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#0A0A0A] p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
               <ReceiptIndianRupee size={180} className="text-rose-500" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Net Debited</p>
            <h2 className="text-6xl font-black text-white tracking-tighter">
              <span className="text-rose-500 text-3xl font-medium mr-2">₹</span>
              {totalAmount.toLocaleString("en-IN")}
            </h2>
          </motion.div>

          {/* Metrics Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-[#0A0A0A] p-8 rounded-[3rem] border border-white/5 shadow-2xl flex items-center justify-between border-l-4 border-l-rose-500">
            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1">Active Vouchers</p>
              <h2 className="text-4xl font-black text-white tracking-tighter">{filteredExpense.length}</h2>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl text-rose-500">
               <LayoutGrid size={24} />
            </div>
          </motion.div>
        </div>

        {/* --- 3. WAVE GRAPH --- */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-[#0A0A0A] p-8 rounded-[3rem] border border-white/5 shadow-2xl h-[380px] relative">
          <div className="flex justify-between items-center mb-10 px-4">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><TrendingDown size={18} /></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spending Velocity</span>
             </div>
             <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/20">LIVE DATA</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expense}>
                <defs>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '20px', padding: '15px' }}
                  itemStyle={{ color: '#f43f5e', fontWeight: '900' }}
                  cursor={{ stroke: '#f43f5e', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#f43f5e" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#expenseGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* --- 4. SEARCH & FILTER --- */}
      <div className="relative mb-8 z-10">
        <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
        <input
          type="text"
          placeholder="Filter by source or category..."
          className="w-full pl-16 pr-8 py-6 bg-[#0A0A0A] border border-white/5 rounded-3xl outline-none font-bold text-white focus:border-rose-500/40 transition-all placeholder:text-slate-800"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- 5. DATA TABLE --- */}
      <div className="bg-[#0A0A0A] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="px-10 py-8 text-center">Reference</th>
                <th className="px-8 py-8">Voucher Details</th>
                <th className="px-8 py-8">Timestamp</th>
                <th className="px-8 py-8 text-right">Value</th>
                <th className="px-10 py-8 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredExpense.map((exp, idx) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={exp.expense_id} 
                    className="group hover:bg-white/[0.02] transition-all"
                  >
                    <td className="px-10 py-8 text-center">
                      <span className="text-[10px] font-black text-slate-700 group-hover:text-rose-500 transition-colors">#{idx + 1}</span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-black transition-all">
                           <ArrowDownCircle size={20} />
                        </div>
                        <span className="font-black text-white capitalize text-lg tracking-tight group-hover:translate-x-1 transition-transform">{exp.source}</span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-2 tracking-tighter uppercase">
                             <Calendar size={12} className="text-rose-500" /> {exp.date}
                          </span>
                          <span className="text-[10px] font-bold text-slate-600 flex items-center gap-2">
                             <Clock size={12} /> {exp.time || "12:00 PM"}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                        <span className="font-black text-white text-2xl tracking-tighter group-hover:text-rose-500 transition-colors">
                          ₹{Number(exp.amount).toLocaleString("en-IN")}
                        </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center justify-end gap-3">
                        <Link to={`/dash/expense/edit/${exp.expense_id}`} className="p-4 bg-white/5 text-slate-500 hover:text-white hover:bg-emerald-500 rounded-2xl transition-all">
                          <Pencil size={18} />
                        </Link>
                        <button onClick={() => deleteHandler(exp.expense_id)} className="p-4 bg-white/5 text-slate-500 hover:text-white hover:bg-rose-500 rounded-2xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredExpense.length === 0 && (
            <div className="py-24 text-center text-slate-700 font-black uppercase tracking-[0.5em] text-[10px]">
               End of Records
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseIndex;