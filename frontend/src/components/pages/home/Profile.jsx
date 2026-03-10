import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, MapPin, Calendar, Edit3, 
  ShieldCheck, Wallet, CreditCard, LogOut, 
  Settings, Hexagon, Sparkles, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) return (
    <div className="h-screen bg-[#0a0f1e] flex flex-col items-center justify-center gap-4">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <Sparkles className="text-emerald-400" size={40} />
      </motion.div>
      <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Secure Vault...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-x-hidden relative pb-20">
      
      {/* 🎭 Background Dynamic Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-4 md:p-8 space-y-10 relative z-10"
      >
        
        {/* --- 1. HERO SECTION (Header Card) --- */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-[#161d31]/60 backdrop-blur-3xl rounded-[3.5rem] border border-slate-800 p-8 md:p-14 overflow-hidden shadow-2xl"
        >
          {/* Animated Accent line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          ></motion.div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* User Avatar with Pulse Animation */}
            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-48 h-48 rounded-[3rem] bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-500 p-1.5 shadow-2xl shadow-indigo-500/20"
              >
                <div className="w-full h-full rounded-[2.8rem] bg-[#0a0f1e] flex items-center justify-center overflow-hidden border border-white/5">
                   <User size={100} className="text-slate-800 group-hover:text-emerald-400 transition-all duration-500" />
                </div>
              </motion.div>
              <motion.button 
                whileHover={{ rotate: 90 }}
                className="absolute bottom-3 right-3 p-4 bg-emerald-500 text-slate-950 rounded-2xl border-[6px] border-[#161d31] shadow-xl"
              >
                <Edit3 size={20} strokeWidth={3} />
              </motion.button>
            </div>

            {/* User Text Info */}
            <div className="text-center md:text-left space-y-4">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-2">
                  <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter capitalize">
                    {user.first_name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">{user.last_name}</span>
                  </h1>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                   <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> Identity Verified
                  </span>
                  <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Member Since 2024
                  </span>
                </div>
              </motion.div>

              <p className="text-slate-400 font-bold text-lg flex items-center justify-center md:justify-start gap-3 opacity-70">
                <Mail size={20} className="text-indigo-500" /> {user.email}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <motion.button whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-xl">
                  Edit Profile
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} className="p-4 bg-slate-800/50 text-white rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all">
                  <Settings size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- 2. INFORMATION GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Detailed Info Cards */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-[#161d31]/40 border border-slate-800 p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Hexagon size={16} className="text-emerald-500" /> Data Points
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Contact Line", value: user.phone || "+91 98XXX XXXXX", icon: Phone, color: "text-blue-400" },
                  { label: "Home Base", value: "Maharashtra, India", icon: MapPin, color: "text-rose-400" },
                  { label: "System Role", value: "Premium User", icon: ShieldCheck, color: "text-emerald-400" },
                  { label: "Data Integrity", value: "100% Secure", icon: Activity, color: "text-indigo-400" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
                    className="p-6 bg-[#0a0f1e]/80 rounded-[2rem] border border-slate-800 transition-all flex items-center gap-5"
                  >
                    <div className={`p-4 bg-slate-900 rounded-2xl ${item.color}`}>
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-white font-black text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Account Health / Actions */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-indigo-900/20 to-[#0a0f1e] rounded-[3rem] border border-slate-800 p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
             
             <div className="space-y-8 relative z-10">
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Vault Summary</h3>
               
               <div className="space-y-4">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-default">
                    <div className="flex items-center gap-4 font-black text-xs text-slate-400 uppercase tracking-tighter">
                      <Wallet className="text-emerald-500" size={20} /> Wallet
                    </div>
                    <span className="text-white font-black">ACTIVE</span>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all cursor-default">
                    <div className="flex items-center gap-4 font-black text-xs text-slate-400 uppercase tracking-tighter">
                      <CreditCard className="text-indigo-500" size={20} /> License
                    </div>
                    <span className="text-indigo-400 font-black">PRO</span>
                  </div>
               </div>
             </div>

             <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-12 flex items-center justify-center gap-3 text-rose-500 font-black text-[10px] uppercase tracking-[0.3em] p-6 bg-rose-500/5 hover:bg-rose-500/10 rounded-[2rem] border border-rose-500/20 transition-all shadow-xl"
             >
               <LogOut size={18} strokeWidth={3} /> Terminate Session
             </motion.button>
          </motion.div>
        </div>

        {/* --- 3. RECENT ACTIVITY (Staggered Animation) --- */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#161d31]/40 rounded-[3rem] border border-slate-800 p-10 shadow-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">Security Logs</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Real-time system monitoring</p>
            </div>
            <div className="p-4 bg-[#0a0f1e] rounded-2xl border border-slate-800 animate-pulse">
              <Activity className="text-emerald-500" size={20} />
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Authentication Success", time: "2 mins ago", icon: ShieldCheck, color: "text-emerald-400" },
              { title: "Profile Attributes Synced", time: "Yesterday", icon: Sparkles, color: "text-indigo-400" },
              { title: "New API Key Generated", time: "2 weeks ago", icon: Hexagon, color: "text-orange-400" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 bg-[#0a0f1e]/40 rounded-[2rem] border border-slate-800/50 hover:border-emerald-500/20 group transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-xl bg-slate-900 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="font-black text-slate-200 text-sm tracking-tight">{item.title}</p>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Protocol: Secure_Dash_v4</p>
                  </div>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.time}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Profile;