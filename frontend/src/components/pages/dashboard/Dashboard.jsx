import React from "react";
import { useNavigate } from "react-router-dom";
import { removeStore } from "../../../services/api";
import Home from "../home/Home";
import { LogOut, User, LayoutDashboard, Settings, Bell, PieChart as PieIcon, Sparkles, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const logoutHandler = () => {
    removeStore();
    navigate("/");
  };

  const data = [
    { name: "Income", value: 50000 },
    { name: "Expense", value: 22000 },
  ];
  
  const COLORS = ["#10b981", "#f43f5e"];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* --- SIDEBAR --- */}
      <aside className="hidden md:flex w-72 bg-[#0f172a] flex-col text-white shadow-2xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        <div className="p-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter flex items-center gap-2"
          >
            <div className="p-2 bg-orange-500 rounded-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <span>TRACKER <span className="text-orange-500">PRO</span></span>
          </motion.h1>
        </div>
        
        <nav className="flex-1 px-6 space-y-3 relative z-10">
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl text-white font-bold shadow-lg shadow-indigo-500/20"
          >
            <LayoutDashboard size={22} /> Dashboard
          </motion.button>
          
          {["Reports", "Analytics", "Settings"].map((item, i) => (
            <motion.button 
              key={item}
              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex items-center gap-4 w-full p-4 rounded-2xl text-slate-400 font-semibold transition-all"
            >
              {item === "Settings" ? <Settings size={22} /> : <TrendingUp size={22} />}
              {item}
            </motion.button>
          ))}
        </nav>

        <div className="p-6 relative z-10">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={logoutHandler}
            className="flex items-center justify-center gap-3 w-full p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-black transition-all border border-red-500/20"
          >
            <LogOut size={20} /> Log Out
          </motion.button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Floating Top Header */}
        <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100 p-4 px-10 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">Financial Overview</h2>
            <span className="hidden lg:block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">Live Analytics</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 border-r pr-6 border-slate-200">
              <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 bg-orange-500 w-2 h-2 rounded-full ring-2 ring-white"></span>
              </button>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 pl-2 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 leading-none capitalize">{user?.first_name}</p>
                <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">Premium User</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                <User size={24} />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content Area */}
        <section className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-[2]"
            >
               <div className="mb-8">
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                  Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 capitalize">{user?.first_name}!</span>
                </h3>
                <p className="text-slate-500 font-medium mt-1">Here's what's happening with your money today.</p>
              </div>
              
              <Home />
            </motion.div>

            {/* Right Section: Analytics Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <div className="sticky top-28 bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                      <PieIcon size={20} />
                    </div>
                    <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Wealth Ratio</h4>
                  </div>
                  <Settings size={18} className="text-slate-300" />
                </div>
                
                <div className="h-72 w-full relative">
                  {/* Center Text for Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="text-3xl font-black text-slate-800">56%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saved</span>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        innerRadius={85}
                        outerRadius={110}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8 w-full space-y-4">
                  <div className="p-5 bg-slate-50 rounded-[2rem] flex justify-between items-center group hover:bg-indigo-600 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:bg-white"></div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-white">Monthly Income</span>
                    </div>
                    <span className="font-black text-slate-900 group-hover:text-white">₹50k</span>
                  </div>
                  
                  <div className="p-5 bg-slate-50 rounded-[2rem] flex justify-between items-center group hover:bg-rose-500 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 group-hover:bg-white"></div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-white">Monthly Expenses</span>
                    </div>
                    <span className="font-black text-slate-900 group-hover:text-white">₹22k</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;