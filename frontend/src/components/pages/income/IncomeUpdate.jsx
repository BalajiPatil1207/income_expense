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
  Sparkles,
  RotateCcw,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const IncomeUpdate = () => {
  const [income, setIncome] = useState({});
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getOldData = async () => {
    try {
      setFetching(true);
      const res = await api.get(`/income/find/${id}`);
      setIncome(res.data.data);
    } catch (error) {
      toast.error("Failed to retrieve record");
    } finally {
      setFetching(false);
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
    setUpdating(true);

    const updatePromise = api.put(`/income/update/${id}`, income);

    toast.promise(updatePromise, {
      loading: 'Recalibrating ledger...',
      success: () => {
        navigate("/dash/income");
        return "Transaction Synchronized! ✅";
      },
      error: (err) => err.response?.data?.message || "Update Protocol Failed!",
    }, {
      style: {
        borderRadius: '20px',
        background: '#161d31',
        color: '#fff',
        border: '1px solid rgba(16, 185, 129, 0.2)',
      }
    });

    try {
      await updatePromise;
    } catch (error) {
      console.log("Update Error:", error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <Zap className="text-emerald-500 animate-pulse" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] p-4 md:p-10 flex items-center justify-center font-sans relative overflow-hidden">
      
      {/* 🔮 Aesthetic Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-[#161d31]/60 backdrop-blur-3xl rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Header Section */}
        <div className="p-8 md:p-10 border-b border-slate-800 flex justify-between items-center bg-[#161d31]/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-3">
              <RotateCcw size={14} className="text-indigo-400 animate-spin-slow" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Update Protocol</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Modify <span className="text-emerald-400">Income</span>
            </h1>
            <p className="text-slate-500 font-bold text-[10px] mt-2 uppercase tracking-[0.2em]">Hash ID: {id?.slice(-8)}</p>
          </div>
          <Link to="/dash/income" className="p-4 bg-[#0a0f1e] hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-3xl border border-slate-800 transition-all group">
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
              className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl outline-none font-bold text-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Input */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                <TrendingUp size={14} className="text-emerald-500" /> Transaction Value
              </label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-emerald-400 text-xl">₹</span>
                <input
                  type="number"
                  name="amount"
                  required
                  value={income.amount || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-6 py-5 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl outline-none font-black text-white text-3xl transition-all"
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
                className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500 rounded-2xl outline-none font-bold text-white transition-all [color-scheme:dark]"
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
                className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-emerald-500 rounded-2xl outline-none font-bold text-white transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={updating}
              type="submit"
              className="w-full bg-emerald-500 disabled:opacity-50 text-[#0a0f1e] font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              {updating ? <Zap className="animate-spin" size={18} /> : <Save size={18} strokeWidth={3} />}
              {updating ? "Processing..." : "Update Record"}
            </motion.button>
            
            <Link 
              to="/dash/income"
              className="w-full text-center py-2 text-slate-500 hover:text-rose-400 font-black text-[10px] uppercase tracking-[0.3em] transition-colors"
            >
              Abort & Return
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-800 pt-4 border-t border-slate-800/30">
             <Sparkles size={12} />
             <p className="text-[9px] font-black uppercase tracking-[0.3em]">Ledger Integrity Verified</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default IncomeUpdate;