import React, { useState } from "react";
import { LogOut, LayoutDashboard, Settings, Sparkles, TrendingUp, Menu, X, ArrowUpCircle, ArrowDownCircle, PieChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, NavLink } from "react-router-dom";
import { removeStore } from "../../../services/api";

const Asidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeStore();
    navigate("/");
  };

  const menu = [
    { name: "Income", path: "/dash/income", icon: <ArrowUpCircle size={22} /> },
    { name: "Expense", path: "/dash/expense", icon: <ArrowDownCircle size={22} /> },
    { name: "Analytics", path: "/analytics", icon: <PieChart size={22} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
  ];

  return (
    <>
      {/* 📱 Mobile Toggle Button - Desktop var 'hidden' rahil */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] p-3 bg-emerald-500 text-[#0a0f1e] rounded-2xl shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* 🌫️ Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* 🚀 Main Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[70] w-72 bg-[#0f172a] flex flex-col text-white shadow-2xl border-r border-slate-800 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Glow Effect */}
        <div className="absolute top-[-5%] left-[-5%] w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="p-8 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500 rounded-lg shadow-lg">
              <Sparkles size={20} className="text-[#0a0f1e]" />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic">FIN<span className="text-emerald-400">PRO</span></h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-slate-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-2 relative z-10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Navigation</p>
          
          <NavLink 
            to="/dash" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition-all ${isActive ? 'bg-emerald-500 text-[#0a0f1e]' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={22} />
            Dashboard
          </NavLink>

          {menu.map((item) => (
            <NavLink 
              to={item.path} 
              key={item.name} 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition-all ${isActive ? 'bg-emerald-500 text-[#0a0f1e]' : 'text-slate-400 hover:bg-white/5'}`}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800/50 relative z-10">
          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-3 w-full p-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl font-black transition-all border border-rose-500/20"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Asidebar;