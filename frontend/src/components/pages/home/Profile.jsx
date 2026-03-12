import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User, Mail, MapPin, Edit3, ShieldCheck, 
  Wallet, LogOut, Hexagon, Sparkles, 
  Activity, Fingerprint, Lock, Globe, ArrowLeft, X, Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const updateProfileImage = async (file) => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("user_img", file);

    try {
      const res = await api.put(`/user/update/${user.user_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        setUser(res.data.data);
        alert("Identity Updated! ⚡");
      }
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050810] overflow-x-hidden relative pb-20 font-sans text-white">
      
      {/* 🎭 Animated Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600 rounded-full blur-[120px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-4 md:p-10 space-y-8 relative z-10"
      >
        
        {/* --- TOP NAV --- */}
        <div className="flex justify-between items-center">
           <Link to="/dash" className="group p-4 bg-[#111827] border border-white/5 text-slate-400 rounded-3xl hover:bg-emerald-500 hover:text-black transition-all shadow-2xl">
              <ArrowLeft size={24} />
           </Link>
           
           <motion.button 
             whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
             onClick={() => setIsEditing(!isEditing)}
             className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${isEditing ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-black'}`}
           >
             {isEditing ? <><X size={18}/> Cancel</> : <><Edit3 size={18}/> Edit Profile</>}
           </motion.button>
        </div>

        {/* --- 1. HERO SECTION --- */}
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative bg-[#111827]/60 backdrop-blur-3xl rounded-[4rem] border border-white/5 p-8 md:p-16 overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* 📸 Avatar with Floating Edit Icon */}
            <div className="relative">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-56 h-56 rounded-[3.5rem] bg-gradient-to-tr from-indigo-500 via-emerald-500 to-teal-500 p-1 shadow-2xl overflow-hidden relative"
              >
                <div className="w-full h-full rounded-[3.3rem] bg-[#0a0f1e] flex items-center justify-center overflow-hidden relative">
                  {user.user_img ? (
                    <motion.img 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      src={`http://localhost:3000/${user.user_img}`} 
                      className="w-full h-full object-cover" 
                      alt="Profile"
                    />
                  ) : (
                    <User size={100} className="text-slate-800" />
                  )}

                  {/* Loading State Overlay */}
                  <AnimatePresence>
                    {loading && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* 🖱 Floating Edit Trigger */}
              <motion.label 
                whileHover={{ scale: 1.1, rotate: -10 }} 
                whileTap={{ scale: 0.9 }}
                htmlFor="avatarInput" 
                className="absolute -bottom-2 -right-2 p-5 bg-white text-black rounded-[2rem] border-[8px] border-[#0a0f1e] shadow-2xl cursor-pointer hover:bg-emerald-400 transition-all z-20"
              >
                <Edit3 size={22} strokeWidth={3} />
                <input type="file" id="avatarInput" className="hidden" accept="image/*" onChange={(e) => updateProfileImage(e.target.files[0])} />
              </motion.label>
            </div>

            {/* Info Text with Layout Animation */}
            <div className="text-center md:text-left flex-1">
              <motion.div layout className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <ShieldCheck size={14} /> Identity Verified
              </motion.div>
              
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div 
                    key="edit-form"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="space-y-4 max-w-md"
                  >
                    <div className="flex gap-4">
                      <input type="text" defaultValue={user.first_name} className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl text-2xl font-black outline-none focus:border-emerald-500 transition-all" placeholder="First Name" />
                      <input type="text" defaultValue={user.last_name} className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl text-2xl font-black outline-none focus:border-emerald-500 transition-all" placeholder="Last Name" />
                    </div>
                    <button className="flex items-center justify-center gap-3 w-full bg-emerald-500 text-black p-5 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white transition-colors">
                      <Save size={18} /> Update Vault
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="display-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4 capitalize">
                      {user.first_name} <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">{user.last_name}</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-xl flex items-center justify-center md:justify-start gap-3 opacity-60 italic">
                      <Mail size={20} className="text-indigo-500 not-italic" /> {user.email}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* --- 2. DATA GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wallet Card */}
              <motion.div whileHover={{ y: -5 }} className="bg-[#111827]/40 border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden group shadow-xl">
                <Wallet className="absolute -right-4 -top-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors" size={160} />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Capital Assets</p>
                <h3 className="text-5xl font-black tracking-tighter italic">₹48,250</h3>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
                   <Activity size={12}/> Live Sync Active
                </div>
              </motion.div>

              {/* Activity Card */}
              <motion.div whileHover={{ y: -5 }} className="bg-[#111827]/40 border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden group shadow-xl">
                <Activity className="absolute -right-4 -top-4 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors" size={160} />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Vault Logs</p>
                <h3 className="text-5xl font-black tracking-tighter italic">142</h3>
                <div className="mt-4 flex items-center gap-2 text-indigo-500 text-[10px] font-black uppercase">
                   <Globe size={12}/> Total Interactions
                </div>
              </motion.div>
            </div>

            {/* Metrics */}
            <div className="bg-[#111827]/40 border border-white/5 p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Hexagon size={120} />
               </div>
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-2">
                 <Hexagon size={16} className="text-emerald-500" /> Security Status
               </h3>
               <div className="space-y-8">
                  {[
                    { label: "Vault Encryption", val: "94%", color: "bg-emerald-500" },
                    { label: "Identity Integrity", val: "100%", color: "bg-indigo-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>{item.label}</span>
                        <span className="text-white">{item.val}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: item.val }} className={`h-full ${item.color}`} />
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column (Security Control) */}
          <div className="space-y-8">
            <div className="bg-gradient-to-b from-indigo-500/10 to-transparent border border-white/5 p-10 rounded-[3.5rem] shadow-xl">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2 italic">
                <Lock size={14} className="text-indigo-400" /> Security Hub
              </h4>
              <div className="space-y-4">
                 {[
                   { icon: <Fingerprint size={18}/>, name: "2FA Auth", status: "Active" },
                   { icon: <Globe size={18}/>, name: "Data Sync", status: "Global" }
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-black/40 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center gap-4 text-slate-400">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">{s.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{s.name}</span>
                      </div>
                      <span className="text-[9px] font-black text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-md">{s.status}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-5 bg-white text-black rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3">
                <LogOut size={16} /> Logout Vault
              </button>
            </div>

            {/* Location Tracking */}
            <div className="bg-[#111827]/40 border border-white/5 p-8 rounded-[3rem] flex items-center gap-5">
               <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                 <MapPin size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Node</p>
                  <p className="text-sm font-bold text-white tracking-tight">Pune, Maharashtra</p>
               </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Profile;