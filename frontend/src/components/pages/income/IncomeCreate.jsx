import { useState } from "react";
import { api } from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  Landmark,
  IndianRupee,
  Calendar,
  Clock,
  ArrowLeft,
  PlusCircle,
} from "lucide-react";

const IncomeCreate = () => {
  const navigate = useNavigate();

  const [income, setIncome] = useState({
  });

  const inputHandler = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/income/store", income);
      if(res.data.success) {
        navigate("/dash");
      }
    } catch (error) {
      console.log("Error details:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl shadow-gray-200 overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
          <div className="flex justify-between items-center">
            <Link
              to="/dash"
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-black tracking-tight">
              Add New Income
            </h1>
            <div className="w-9"></div> {/* Balancer */}
          </div>
          <p className="text-green-100 text-sm mt-2 text-center font-medium">
            Record your earnings and grow your wealth
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={submitHandler} className="p-8 space-y-6">
          {/* Amount Field */}
          <div className="relative">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
              Income Amount
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600">
                <IndianRupee size={22} />
              </div>
              <input
                type="number"
                name="amount"
                required
                placeholder="0.00"
                value={income.amount || ""}
                onChange={inputHandler}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white focus:outline-none transition-all text-xl font-bold"
              />
            </div>
          </div>

          {/* Source Field */}
          <div className="relative">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
              Income Source
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                <Landmark size={20} />
              </div>
              <input
                type="text"
                name="source"
                required
                placeholder="Salary, Freelance, Gift..."
                value={income.source || ""}
                onChange={inputHandler}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white focus:outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date Field */}
            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="date"
                  name="date"
                  required
                  value={income.date || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-sm font-bold"
                />
              </div>
            </div>

            {/* Time Field */}
            <div className="relative">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                Time
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="time"
                  name="time"
                  required
                  value={income.time || ""}
                  onChange={inputHandler}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-sm font-bold"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-gray-200 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 group"
            >
              <span>Confirm Income</span>
              <PlusCircle
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>

            <Link
              to="/dash"
              className="block w-full text-center text-gray-400 hover:text-gray-600 font-bold text-sm transition-colors py-2"
            >
              Cancel & Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeCreate;
