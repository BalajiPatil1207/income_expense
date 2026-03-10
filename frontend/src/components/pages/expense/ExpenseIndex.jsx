import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Plus,
  Search,
  Calendar,
  Clock,
  TrendingDown,
  LayoutGrid,
  Filter,
  ArrowDownCircle,
  ReceiptIndianRupee
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
      setExpense(res.data.data);
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

  useEffect(() => {
    fetchExpense();
  }, []);

  useEffect(() => {
    const total = expense.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    setTotalAmount(total);
  }, [expense]);

  const filteredExpense = expense.filter((exp) =>
    exp.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 bg-[#0a0f1e] min-h-screen font-sans text-slate-100 relative overflow-hidden">
      
      {/* 🔴 Background Red Glow - Expense sathi */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]"></div>

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
        <div className="flex items-center gap-5">
          <Link to="/dash" className="p-4 bg-[#161d31] border border-slate-800 text-slate-400 rounded-3xl hover:text-rose-400 hover:border-rose-500/50 transition-all shadow-2xl">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              Expense <span className="text-rose-500 text-shadow-glow">Tracker</span>
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">Watching your outflows</p>
          </div>
        </div>
        <Link
          to="/dash/expense/create"
          className="group flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-[2rem] font-black shadow-lg shadow-rose-500/20 transition-all active:scale-95"
        >
          <Plus size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform" /> 
          ADD EXPENSE
        </Link>
      </div>

      {/* --- STATS & RED WAVE GRAPH --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
        
        {/* Total Expense Card */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#161d31] p-8 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-10%] p-4 opacity-[0.05] text-rose-500 group-hover:opacity-[0.1] transition-opacity">
              <TrendingDown size={150} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Total Outflow</p>
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter">
              <span className="text-rose-500 mr-2">₹</span>{totalAmount.toLocaleString("en-IN")}
            </h2>
          </motion.div>

          {/* Entries Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#161d31] p-8 rounded-[3rem] border border-slate-800 shadow-2xl flex items-center justify-between group">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Total Bills</p>
              <h2 className="text-5xl font-black text-white tracking-tighter group-hover:text-rose-400 transition-colors">{filteredExpense.length}</h2>
            </div>
            <div className="w-16 h-16 bg-[#0a0f1e] border border-slate-800 rounded-[1.5rem] flex items-center justify-center text-rose-500 shadow-inner">
              <LayoutGrid size={32} />
            </div>
          </motion.div>
        </div>

        {/* 🌊 Red Spending Wave Graph */}
        <div className="lg:col-span-2 bg-[#161d31] p-8 rounded-[3rem] border border-slate-800 shadow-2xl h-[340px]">
           <div className="flex justify-between items-center mb-6 px-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Spending Wave (Red Alert)</p>
              <ArrowDownCircle size={18} className="text-rose-500/50" />
           </div>
           <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={expense}>
              <defs>
                <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.3} />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '24px', backgroundColor: '#0a0f1e', border: '1px solid #f43f5e44', padding: '15px' }} 
                itemStyle={{ color: '#fff', fontWeight: '900' }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#f43f5e" 
                strokeWidth={5} 
                fillOpacity={1} 
                fill="url(#colorRed)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- SEARCH --- */}
      <div className="relative mb-8 z-10 group">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-rose-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search where you spent..."
            className="w-full pl-16 pr-8 py-5 bg-[#161d31]/60 border border-slate-800 rounded-[2rem] outline-none font-bold text-white shadow-2xl focus:border-rose-500/40 transition-all placeholder:text-slate-700"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-[#161d31] rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0f1e]/40 border-b border-slate-800">
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">ID</th>
                <th className="px-8 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Source</th>
                <th className="px-8 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <AnimatePresence>
                {filteredExpense.map((exp, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    key={exp.expense_id} 
                    className="hover:bg-rose-500/[0.02] transition-colors group"
                  >
                    <td className="px-10 py-7 text-center">
                      <span className="text-xs font-black text-slate-600 group-hover:text-rose-500/50 transition-colors">#{(idx + 1)}</span>
                    </td>
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                          {exp.source.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-black text-white capitalize text-lg tracking-tight">{exp.source}</span>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                        <span className="font-black text-rose-500 text-xl tracking-tighter">
                          - ₹{Number(exp.amount).toLocaleString("en-IN")}
                        </span>
                    </td>
                    <td className="px-8 py-7">
                       <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase rounded-lg border border-rose-500/20">Debited</span>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center justify-end gap-3">
                        <Link to={`/dash/expense/edit/${exp.expense_id}`} className="p-4 bg-[#0a0f1e] text-slate-500 hover:text-rose-400 border border-slate-800 rounded-2xl transition-all">
                          <Pencil size={18} />
                        </Link>
                        <button onClick={() => deleteHandler(exp.expense_id)} className="p-4 bg-[#0a0f1e] text-slate-500 hover:text-rose-600 border border-slate-800 rounded-2xl transition-all">
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
      </div>
    </div>
  );
};

export default ExpenseIndex;