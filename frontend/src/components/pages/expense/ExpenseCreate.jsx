import React, { useState } from "react";
import { api } from "../../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ReceiptIndianRupee, 
  Tag, 
  Calendar, 
  Clock, 
  SendHorizontal,
  WalletMinimal
} from "lucide-react";
import { motion } from "framer-motion";

const ExpenseCreate = () => {
  const [expense, setExpense] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/expense/store", expense);
      navigate("/dash");
    } catch (error) {
      console.log(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff1f2] p-4 md:p-10 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(225,29,72,0.1)] border border-rose-50 overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-rose-500 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
                <ReceiptIndianRupee size={32} strokeWidth={2.5} />
                Add Expense
              </h1>
              <p className="text-rose-100 font-medium text-sm mt-1">Don't lose track of your spending.</p>
            </div>
            <Link to="/dash" className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all">
              <ArrowLeft size={20} />
            </Link>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-400 rounded-full opacity-50"></div>
        </div>

        {/* Form Section */}
        <form onSubmit={submitHandler} className="p-8 md:p-10 space-y-6">
          
          {/* Source Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
              <Tag size={14} /> Category / Source
            </label>
            <input
              type="text"
              name="source"
              required
              placeholder="Ex. Rent, Grocery, Internet"
              value={expense.source || ""}
              onChange={inputHandler}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Input */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <WalletMinimal size={14} /> Amount
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-rose-500 text-lg">₹</span>
                <input
                  type="number"
                  name="amount"
                  required
                  placeholder="0.00"
                  value={expense.amount || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl outline-none font-black text-slate-700 text-xl transition-all"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <Calendar size={14} /> Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={expense.date || ""}
                onChange={inputHandler}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl outline-none font-bold text-slate-700 transition-all"
              />
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                <Clock size={14} /> Time
              </label>
              <input
                type="time"
                name="time"
                required
                value={expense.time || ""}
                onChange={inputHandler}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl outline-none font-bold text-slate-700 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-slate-900 hover:bg-rose-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-3 mt-4"
          >
            <SendHorizontal size={20} />
            Record Expense
          </motion.button>

          <p className="text-center text-slate-400 text-xs font-medium">
            Review your entries carefully before submitting.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default ExpenseCreate;