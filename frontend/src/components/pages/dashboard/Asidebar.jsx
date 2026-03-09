import React from 'react'
import { LogOut, User, LayoutDashboard, Settings, Bell, PieChart as PieIcon, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { removeStore } from '../../../services/api';
const Asidebar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    removeStore();
    navigate("/");
  };
  return (
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
          
          {["Income","Expense","Reports", "Analytics", "Settings",].map((item, i) => (
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
  )
}

export default Asidebar