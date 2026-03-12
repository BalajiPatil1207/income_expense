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
    { name: "Analytics", path: "/dash/analytics", icon: <PieChart size={22} /> },
    { name: "Settings", path: "/dash/settings", icon: <Settings size={22} /> },
  ];

  return (
    <>
      {/* 📱 Mobile Toggle Button - Orange Accent */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] p-3 bg-orange-500 text-[#050810] rounded-2xl shadow-lg shadow-orange-500/20"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* 🚀 Main Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[70] w-72 bg-[#050810] flex flex-col text-white shadow-2xl border-r border-white/5 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Glow Effect - Orange Pulse */}
        <div className="absolute top-[-5%] left-[-5%] w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-50"></div>

        <div className="p-8 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30">
              <Sparkles size={20} className="text-[#050810]" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic">FIN<span className="text-orange-500">PRO</span></h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-2 relative z-10">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6 ml-2">Main Navigation</p>
          
          <NavLink 
            to="/dash" 
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-4 w-full p-4 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all
              ${isActive 
                ? 'bg-white text-orange-500 shadow-[0_10px_30px_rgba(255,255,255,0.1)] scale-[1.02]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          {menu.map((item) => (
            <NavLink 
              to={item.path} 
              key={item.name} 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-4 w-full p-4 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all
                ${isActive 
                  ? 'bg-orange-500 text-black shadow-[0_10px_30px_rgba(249,115,22,0.3)] scale-[1.02]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* --- BOTTOM SECTION --- */}
        <div className="p-6 mt-auto border-t border-white/5 relative z-10">
          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-3 w-full p-4 bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all border border-rose-500/10 group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Asidebar;