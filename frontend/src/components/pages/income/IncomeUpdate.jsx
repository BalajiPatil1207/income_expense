import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Wallet, 
  Calendar, 
  Clock, 
  Tag, 
  User 
} from 'lucide-react';
import { motion } from 'framer-motion';

const IncomeUpdate = () => {
  const [income, setIncome] = useState({});
  const { id } = useParams(); // URL madhun ID ghenya sathi
  const navigate = useNavigate();

  // Junya values form madhe dakhvanya sathi (Prefill)
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
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden"
      >
        {/* Form Header */}
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded-xl text-white">
                <Wallet size={24} />
              </div>
              Update Income
            </h2>
            <p className="text-slate-400 text-sm mt-1">Modify your transaction details below</p>
          </div>
          <Link to="/dash/income" className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* Form Body */}
        <form onSubmit={submitHandler} className="p-8 md:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Source Input */}
            <div className="md:col-span-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Source of Income
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="text"
                  name="source"
                  required
                  placeholder="e.g. Freelance Project"
                  value={income.source || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  name="amount"
                  required
                  value={income.amount || ""}
                  onChange={inputHandler}
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="date"
                  name="date"
                  required
                  value={income.date || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            {/* Time Input */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="time"
                  name="time"
                  required
                  value={income.time || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            {/* User ID (Read Only if needed) */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                User Reference
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="text"
                  name="user_ID"
                  required
                  value={income.user_ID || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Save size={20} />
              Save Changes
            </button>
            <Link
              to="/dash/income"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-5 rounded-2xl transition-all flex items-center justify-center active:scale-95"
            >
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default IncomeUpdate;