import React from "react";
import { Link, } from "react-router-dom";
import Home from "../home/Home";
import { LogOut, User, LayoutDashboard, Settings, Bell, PieChart as PieIcon, Sparkles, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import Asidebar from "./Asidebar";

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const data = [
    { name: "Income", value: 50000 },
    { name: "Expense", value: 22000 },
  ];
  
  const COLORS = ["#10b981", "#f43f5e"];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* --- SIDEBAR --- */}
      <Asidebar/>

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