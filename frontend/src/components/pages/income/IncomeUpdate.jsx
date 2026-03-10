import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Landmark, 
  Calendar, 
  Clock, 
  TrendingUp, 
  User,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

const IncomeUpdate = () => {
  const [income, setIncome] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getOldData = async () => {
    try {
      const res = await api.get(`/income/find/${id}`);
      setIncome(res.data.data);
    } catch (error) {
      console.log("Fetch Error:", error.message);
    }
  };

  useEffect(() => {
    getOldData();
  }, [id]);

  const inputHandler = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/income/update/${id}`, income);
      navigate("/dash/income"); 
    } catch (error) {
      console.log("Update Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] p-4 md:p-10 flex items-center justify-center font-sans relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-[#161d31]/60 backdrop-blur-3xl rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Header Section */}
        <div className="p-8 md:p-10 border-b border-slate-800 flex justify-between items-center bg-[#161d31]/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-3">
              <RotateCcw size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Edit Mode</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Update <span className="text-emerald-400">Income</span>
            </h1>
            <p className="text-slate-500 font-bold text-xs mt-2 uppercase tracking-widest">Modify transaction #{id?.slice(-5)}</p>
          </div>
          <Link to="/dash/income" className="p-4 bg-[#0a0f1e] hover:bg-slate-800 text-slate-400 rounded-3xl border border-slate-800 transition-all group">
            <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Form Section */}
        <form onSubmit={submitHandler} className="p-8 md:p-10 space-y-6">
          
          {/* Source Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              <Landmark size={14} className="text-emerald-500" /> Income Source
            </label>
            <input
              type="text"
              name="source"
              required
              value={income.source || ""}
              onChange={inputHandler}
              className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500/50 rounded-2xl outline-none font-bold text-white transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Input */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                <TrendingUp size={14} className="text-emerald-500" /> Update Amount
              </label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-emerald-400 text-xl group-focus-within:scale-110 transition-transform">₹</span>
                <input
                  type="number"
                  name="amount"
                  required
                  value={income.amount || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-6 py-5 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500/50 rounded-2xl outline-none font-black text-white text-2xl transition-all"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                <Calendar size={14} className="text-emerald-500" /> Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={income.date || ""}
                onChange={inputHandler}
                className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500/50 rounded-2xl outline-none font-bold text-white transition-all [color-scheme:dark]"
              />
            </div>

            {/* Time Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                <Clock size={14} className="text-emerald-500" /> Time
              </label>
              <input
                type="time"
                name="time"
                required
                value={income.time || ""}
                onChange={inputHandler}
                className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500/50 rounded-2xl outline-none font-bold text-white transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-emerald-500 text-[#0a0f1e] font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-500/10 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              <Save size={18} strokeWidth={3} />
              Save Changes
            </motion.button>
            
            <Link 
              to="/dash/income"
              className="w-full text-center py-4 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors"
            >
              Discard Changes
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-700">
             <Sparkles size={12} />
             <p className="text-[10px] font-black uppercase tracking-widest">AI Powered Ledger Tracking</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default IncomeUpdate;