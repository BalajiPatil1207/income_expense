import { useState } from "react";
import { api } from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  Landmark,
  IndianRupee,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; 

const IncomeCreate = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState({});
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ⏳ Promise for Income storage
    const storePromise = api.post("/income/store", income);

    toast.promise(storePromise, {
      loading: 'Recording your wealth...',
      success: (res) => {
        if (res.data.success) {
          navigate("/dash");
          return `Income of ₹${income.amount} added! 💰`;
        }
        throw new Error("Failed to save income");
      },
      error: (err) => {
        return err.response?.data?.message || "Transaction failed!";
      },
    }, {
      style: {
        borderRadius: '20px',
        background: '#161d31',
        color: '#fff',
        border: '1px solid rgba(16, 185, 129, 0.2)',
      },
      success: {
        duration: 3000,
        icon: '✅',
      },
    });

    try {
      await storePromise;
    } catch (error) {
      console.log("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4 relative overflow-hidden text-white">
      
      {/* 🎭 Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="bg-[#161d31]/60 backdrop-blur-2xl rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="p-8 md:p-10 border-b border-slate-800/50 relative">
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/dash"
                className="bg-slate-800/50 hover:bg-slate-700 text-slate-300 p-3 rounded-2xl transition-all border border-slate-700 active:scale-90"
              >
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={14} /> New Entry
              </div>
            </div>
            
            <h1 className="text-4xl font-black tracking-tighter">
              Add <span className="text-emerald-400">Income</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Track your revenue streams with precision.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={submitHandler} className="p-8 md:p-10 space-y-8">
            
            {/* Amount Field */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                Amount (INR)
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:scale-110 transition-transform">
                  <IndianRupee size={24} strokeWidth={3} />
                </div>
                <input
                  type="number"
                  name="amount"
                  required
                  placeholder="0.00"
                  value={income.amount || ""}
                  onChange={inputHandler}
                  className="w-full pl-14 pr-6 py-5 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none transition-all text-2xl font-black text-white placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Source Field */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                Revenue Source
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                  <Landmark size={22} />
                </div>
                <input
                  type="text"
                  name="source"
                  required
                  placeholder="e.g. Freelance Project"
                  value={income.source || ""}
                  onChange={inputHandler}
                  className="w-full pl-14 pr-6 py-5 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:outline-none transition-all font-bold text-white placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Field */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="date"
                    name="date"
                    required
                    value={income.date || ""}
                    onChange={inputHandler}
                    className="w-full pl-14 pr-4 py-4 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all text-white font-bold [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Time Field */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Time</label>
                <div className="relative">
                  <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="time"
                    name="time"
                    required
                    value={income.time || ""}
                    onChange={inputHandler}
                    className="w-full pl-14 pr-4 py-4 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all text-white font-bold [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-[2rem] shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Zap className="animate-pulse" size={20} /> Processing...
                  </span>
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-xs">Confirm Transaction</span>
                    <CheckCircle2 size={20} strokeWidth={3} />
                  </>
                )}
              </motion.button>

              <Link
                to="/dash"
                className="block w-full text-center text-slate-500 hover:text-slate-300 font-black text-[10px] uppercase tracking-widest transition-colors py-2"
              >
                Discard & Return
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default IncomeCreate;