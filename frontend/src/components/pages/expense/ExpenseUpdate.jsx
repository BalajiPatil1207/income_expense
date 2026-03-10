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
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const ExpenseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    date: "",
    description: "",
  });

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await api.get(`/expense/find/${id}`);
        const data = res.data.data;
        setFormData({
          amount: data.amount,
          source: data.source,
          date: data.date.split("T")[0],
          description: data.description || "",
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setTimeout(() => navigate("/dash/expense"), 2000);
      }
    };
    if (id) fetchExpense();
  }, [id, navigate]);

  // 2. Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(""); 
    try {
      await api.put(`/expense/update/${id}`, formData);
      navigate("/dash/expense"); 
    } catch (error) {
      setError(error.response?.data?.message || "Update failed. Please try again.");
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0f1e] gap-4">
        <Loader2 className="animate-spin text-rose-500" size={60} strokeWidth={3} />
        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Syncing Vault Data...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0f1e] p-6 md:p-12 flex justify-center items-center relative overflow-hidden font-sans">
      
      {/* 🔴 Background Cinematic Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-rose-600/5 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-slate-500 hover:text-rose-400 mb-8 transition-all font-black uppercase text-[10px] tracking-[0.2em]"
        >
          <div className="p-2 bg-[#161d31] border border-slate-800 rounded-xl group-hover:border-rose-500/50 transition-all shadow-xl">
            <ArrowLeft size={16} />
          </div>
          Back to Vault
        </button>

        <div className="bg-[#161d31]/60 backdrop-blur-3xl rounded-[3rem] border border-slate-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-5 bg-[#0a0f1e] text-rose-500 rounded-3xl border border-slate-800 shadow-inner group">
                <TrendingDown size={32} className="group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-rose-500" />
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Editor Mode</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                  Update <span className="text-rose-500">Expense</span>
                </h1>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest"
              >
                {error}
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Amount - Premium View */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Transaction Amount
                </label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-800 pr-3">
                    <IndianRupee className="text-rose-500" size={18} />
                  </div>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl py-5 pl-20 pr-6 text-white text-xl font-black focus:border-rose-500/50 outline-none transition-all placeholder:text-slate-800 shadow-inner"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Expense Category
                </label>
                <div className="relative group">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-rose-500 transition-colors" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:border-rose-500/50 outline-none transition-all shadow-inner"
                    placeholder="Ex: Netflix, Rent, Food"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Spending Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-rose-500 transition-colors" size={20} />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-white font-bold focus:border-rose-500/50 outline-none transition-all shadow-inner [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Additional Notes</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-5 top-6 text-slate-600 group-focus-within:text-rose-500 transition-colors" size={20} />
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#0a0f1e]/50 border border-slate-800 rounded-3xl py-5 pl-14 pr-6 text-white font-bold focus:border-rose-500/50 outline-none transition-all resize-none shadow-inner"
                    placeholder="Add some details about this expense..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(244, 63, 94, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={updating}
                className="w-full bg-rose-500 hover:bg-rose-600 text-[#0a0f1e] py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-rose-500/20 disabled:opacity-50 transition-all"
              >
                {updating ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Save size={20} strokeWidth={3} /> Save Changes
                  </>
                )}
              </motion.button>
              
              <p className="text-center text-slate-600 text-[9px] font-black uppercase tracking-widest mt-8">
                 TXN_REF: {id?.slice(-12).toUpperCase()} • Secure System
              </p>
            </div>
          </form>

          {/* Decorative Corner Glow */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpenseUpdate;