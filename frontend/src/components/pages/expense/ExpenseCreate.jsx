import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Tag,
  Calendar,
  Clock,
  SendHorizontal,
  WalletMinimal,
  Sparkles,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ExpenseCreate = () => {
  // 🕒 Auto-fill current date and time
  const [expense, setExpense] = useState({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postPromise = api.post("/expense/store", expense);

    toast.promise(
      postPromise,
      {
        loading: "Authorizing transaction...",
        success: "Expense logged in vault! 📉",
        error: (err) => err.response?.data?.message || "Transaction failed",
      },
      {
        style: {
          borderRadius: "20px",
          background: "#161d31",
          color: "#fff",
          border: "1px solid rgba(244, 63, 94, 0.2)", // Slight rose tint
        },
      },
    );

    try {
      await postPromise;
      navigate("/dash");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] p-4 md:p-10 flex items-center justify-center font-sans relative overflow-hidden">
      {/* 🌌 Cyberpunk Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-rose-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-[#161d31]/60 backdrop-blur-3xl rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Header Section */}
        <div className="p-8 md:p-10 border-b border-slate-800 flex justify-between items-center bg-[#161d31]/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full mb-3">
              <Flame size={14} className="text-rose-400 animate-pulse" />
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">
                Outflow Track
              </span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
              Log <span className="text-rose-400">Expense</span>
            </h1>
            <p className="text-slate-500 font-bold text-[10px] mt-2 uppercase tracking-[0.2em]">
              Deploying capital to category
            </p>
          </div>
          <Link
            to="/dash"
            className="p-4 bg-[#0a0f1e] hover:bg-slate-800 text-slate-400 rounded-3xl border border-slate-800 transition-all group"
          >
            <ArrowLeft
              size={22}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Form Section */}
        <form onSubmit={submitHandler} className="p-8 md:p-10 space-y-6">
          {/* Category Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              <Tag size={14} className="text-rose-500" /> Expense Source
            </label>
            <input
              type="text"
              name="source"
              required
              placeholder="Ex. Cloud Server, Dining, Rent"
              value={expense.source || ""}
              onChange={inputHandler}
              className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-rose-500/50 rounded-2xl outline-none font-bold text-white transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Input */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                <WalletMinimal size={14} className="text-rose-500" /> Amount to
                deduct
              </label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-rose-400 text-xl">
                  ₹
                </span>
                <input
                  type="number"
                  name="amount"
                  required
                  placeholder="0.00"
                  value={expense.amount || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-6 py-5 bg-[#0a0f1e]/50 border border-slate-800 focus:border-rose-500/50 rounded-2xl outline-none font-black text-white text-3xl transition-all"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                <Calendar size={14} className="text-rose-500" /> Timestamp
              </label>
              <input
                type="date"
                name="date"
                required
                value={expense.date || ""}
                onChange={inputHandler}
                className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-rose-500/50 rounded-2xl outline-none font-bold text-white transition-all [color-scheme:dark]"
              />
            </div>

            {/* Time Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                <Clock size={14} className="text-rose-500" /> Precise Time
              </label>
              <input
                type="time"
                name="time"
                required
                value={expense.time || ""}
                onChange={inputHandler}
                className="w-full px-6 py-4 bg-[#0a0f1e]/50 border border-slate-800 focus:border-rose-500/50 rounded-2xl outline-none font-bold text-white transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-rose-500 text-[#0a0f1e] font-black py-5 rounded-[2rem] shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-3 mt-6 uppercase tracking-[0.2em] text-xs disabled:opacity-50"
          >
            <SendHorizontal
              size={20}
              className={loading ? "animate-ping" : ""}
            />
            {loading ? "Syncing Ledger..." : "Commit Transaction"}
          </motion.button>

          <div className="flex items-center justify-center gap-2 text-slate-800 pt-4 border-t border-slate-800/30">
            <Sparkles size={12} />
            <p className="text-[9px] font-black uppercase tracking-[0.3em]">
              End-to-End Encrypted Entry
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ExpenseCreate;
