import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import {
  ArrowLeft,
  Save,
  IndianRupee,
  Tag,
  Calendar,
  MessageSquare,
  Loader2,
  TrendingDown,
  Sparkles,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

const ExpenseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    date: "",
    description: "",
  });

  // 1. Fetch Existing Data with loading state
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/expense/find/${id}`);
        const data = res.data.data;
        setFormData({
          amount: data.amount,
          source: data.source,
          date: data.date.split("T")[0],
          description: data.description || "",
        });
      } catch (error) {
        toast.error("Entry not found in vault");
        setTimeout(() => navigate("/dash/expense"), 2000);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExpense();
  }, [id, navigate]);

  // 2. Handle Update with Toast Promise
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    const updatePromise = api.put(`/expense/update/${id}`, formData);

    toast.promise(updatePromise, {
      loading: 'Recalibrating budget...',
      success: 'Expense updated successfully! 🌹',
      error: 'Protocol update failed.',
    }, {
      style: {
        borderRadius: '20px',
        background: '#161d31',
        color: '#fff',
        border: '1px solid rgba(244, 63, 94, 0.2)',
      }
    });

    try {
      await updatePromise;
      navigate("/dash/expense"); 
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0f1e] gap-4">
        <Zap className="animate-bounce text-rose-500" size={40} />
        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Database...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0f1e] p-4 md:p-12 flex justify-center items-center relative overflow-hidden font-sans">
      
      {/* 🔴 Background Cinematic Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-slate-500 hover:text-rose-400 mb-8 transition-all font-black uppercase text-[10px] tracking-[0.2em]"
        >
          <div className="p-3 bg-[#161d31] border border-slate-800 rounded-2xl group-hover:border-rose-500/50 transition-all shadow-xl">
            <ArrowLeft size={18} />
          </div>
          Return to Ledger
        </button>

        <div className="bg-[#161d31]/60 backdrop-blur-3xl rounded-[3rem] border border-slate-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-5 bg-[#0a0f1e] text-rose-500 rounded-3xl border border-slate-800 shadow-inner">
                <TrendingDown size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-rose-500 animate-pulse" />
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Update Protocol</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                  Edit <span className="text-rose-500">Expense</span>
                </h1>
                <p className="text-slate-600 text-[10px] font-bold mt-2 uppercase">TXN ID: {id?.slice(-8).toUpperCase()}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Amount */}
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Adjust Transaction Value
                </label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <IndianRupee className="text-rose-500" size={24} />
                  </div>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-3xl py-6 pl-16 pr-6 text-white text-3xl font-black focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Source/Category */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Spending Source
                </label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    type="text"
                    required
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:border-rose-500/50 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Calendar Log</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:border-rose-500/50 outline-none transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Description/Notes */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Transaction Brief</label>
                <div className="relative">
                  <MessageSquare className="absolute left-5 top-6 text-slate-600" size={18} />
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-[2rem] py-5 pl-14 pr-6 text-white font-bold focus:border-rose-500/50 outline-none transition-all resize-none"
                    placeholder="Optional details..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={updating}
                type="submit"
                className="w-full bg-rose-500 text-[#0a0f1e] py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-2xl shadow-rose-500/20 disabled:opacity-50"
              >
                {updating ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Synchronize Changes</>}
              </motion.button>
            </div>
          </form>

          {/* Bottom Badge */}
          <div className="mt-10 flex justify-center">
             <div className="px-4 py-2 bg-[#0a0f1e] border border-slate-800 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">End-to-End Encrypted Ledger</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpenseUpdate;