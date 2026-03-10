import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { User, Bell, PieChart as PieIcon, Settings, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import Asidebar from "./Asidebar";
import Home from "../home/Home";

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [stats, setStats] = useState({ income: 0, expense: 0 });

  // Data Fetching
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const [inc, exp] = await Promise.all([api.get("/income"), api.get("/expense")]);
        setStats({
          income: inc.data.data.reduce((acc, c) => acc + Number(c.amount), 0),
          expense: exp.data.data.reduce((acc, c) => acc + Number(c.amount), 0)
        });
      } catch (e) {
        console.error("Dashboard Stats Error:", e);
      }
    };
    fetchTotals();
  }, []);

  const savings = stats.income - stats.expense;
  const chartData = [
    { name: "Savings", value: savings > 0 ? savings : 0 },
    { name: "Expenses", value: stats.expense },
  ];
  const COLORS = ["#10b981", "#f43f5e"];

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] font-sans text-slate-100 overflow-hidden">
      {/* --- Sidebar Component --- */}
      <Asidebar />

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar relative">
        
        {/* --- Responsive Header --- */}
        <header className="bg-[#161d31]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800 p-4 md:p-5 px-6 md:px-10 flex justify-between items-center">
          {/* ml-14 mobile var dila aahe jyamule Asidebar cha Hamburger menu ithe fita basel */}
          <motion.h2 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-black text-white tracking-tight ml-14 md:ml-0"
          >
            Fin<span className="text-emerald-400">Dashboard</span>
          </motion.h2>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2.5 bg-slate-800/50 rounded-xl text-slate-400 hover:text-white border border-slate-700 transition-all hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 bg-rose-500 w-2 h-2 rounded-full ring-2 ring-[#161d31]"></span>
            </button>

            <Link to="/dash/profile">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 md:gap-3 group cursor-pointer bg-slate-800/30 p-1 md:pr-4 rounded-2xl border border-white/5"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
                  <User size={20} strokeWidth={2.5} />
                </div>
                <div className="text-left hidden xs:block text-sm">
                  <p className="font-black capitalize leading-none mb-1">{user?.first_name}</p>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Premium</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </header>

        {/* --- Body Content --- */}
        <div className="p-4 md:p-10 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Welcome & Home (Transactions) */}
            <div className="flex-[2] space-y-8">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter capitalize leading-tight">
                  Welcome back, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                    {user?.first_name}!
                  </span>
                </h1>
                <p className="text-slate-500 font-medium mt-4 text-lg">
                  Checking your financial pulse...
                </p>
              </motion.div>
              
              {/* Transactions List / Home Component */}
              <div className="bg-[#161d31]/30 rounded-[2.5rem] border border-slate-800/50 p-2 md:p-4">
                <Home />
              </div>
            </div>

            {/* Right Column: Analytics Card */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1"
            >
              <div className="bg-[#161d31] p-8 md:p-10 rounded-[3rem] border border-slate-800 shadow-2xl sticky top-28">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3 font-black text-slate-400 text-[10px] tracking-[0.2em] uppercase">
                    <PieIcon size={16} className="text-emerald-400" /> Wealth Ratio
                  </div>
                  <Settings size={18} className="text-slate-600 cursor-pointer" />
                </div>

                {/* Chart Section */}
                <div className="h-64 w-full relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">
                      {stats.income > 0 ? Math.round((savings / stats.income) * 100) : 0}%
                    </span>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Saved</p>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={chartData} 
                        innerRadius={70} 
                        outerRadius={95} 
                        paddingAngle={10} 
                        dataKey="value" 
                        stroke="none" 
                        cornerRadius={12}
                      >
                        {chartData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '15px', backgroundColor: '#0a0f1e', border: '1px solid #1e293b' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Quick Info */}
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[#0a0f1e]/50 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={18} className="text-emerald-500" />
                      <span className="text-xs font-bold text-slate-400">Income</span>
                    </div>
                    <span className="font-black text-white">₹{stats.income.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#0a0f1e]/50 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <TrendingDown size={18} className="text-rose-500" />
                      <span className="text-xs font-bold text-slate-400">Expenses</span>
                    </div>
                    <span className="font-black text-white">₹{stats.expense.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;