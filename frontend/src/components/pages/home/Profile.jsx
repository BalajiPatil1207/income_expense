import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Mail, MapPin, Edit3, ShieldCheck, Wallet, LogOut,
  Hexagon, Activity, Fingerprint, Lock, Globe, ArrowLeft, X, Save, Camera, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api, removeStore } from "../../../services/api";
import toast from "react-hot-toast";

// 🎭 Animation Configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const logoutHandler = () => {
    removeStore();
    toast.success("Vault Locked Successfully");
    navigate("/");
  };

  const updateProfileImage = async (file) => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("user_img", file);

    const uploadPromise = api.put(`/user/update/${user.user_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.promise(uploadPromise, {
      loading: "Recalibrating Biometrics...",
      success: (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        setUser(res.data.data);
        return "Identity Synced! ⚡";
      },
      error: "Sync Failed. Try again.",
    });

    try { await uploadPromise; } finally { setLoading(false); }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050810] overflow-x-hidden relative pb-20 font-sans text-white">
      
      {/* 🎭 Cinematic Glows (Animated) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-indigo-600 rounded-full blur-[130px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-emerald-600 rounded-full blur-[130px]" 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto p-4 md:p-10 space-y-8 relative z-10"
      >
        
        {/* --- TOP NAV --- */}
        <motion.div variants={cardVariants} className="flex justify-between items-center">
          <Link to="/dash" className="group p-4 bg-white/5 border border-white/10 rounded-[1.5rem] hover:bg-emerald-500 transition-all shadow-xl">
            <ArrowLeft size={24} className="group-hover:text-black transition-colors" />
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-2xl ${
              isEditing ? "bg-rose-500 text-white" : "bg-emerald-500 text-black"
            }`}
          >
            {isEditing ? <><X size={16} /> Cancel</> : <><Edit3 size={16} /> Modify Profile</>}
          </motion.button>
        </motion.div>

        {/* --- 1. HERO SECTION --- */}
        <motion.div variants={cardVariants} layout className="bg-[#111827]/40 backdrop-blur-3xl rounded-[4rem] border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            
            {/* 📸 Avatar Container */}
            <div className="relative">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.02 }}
                className="w-56 h-56 rounded-[3.5rem] bg-gradient-to-tr from-indigo-500 via-emerald-500 to-teal-500 p-1 shadow-2xl relative overflow-hidden"
              >
                <div className="w-full h-full rounded-[3.3rem] bg-[#0a0f1e] flex items-center justify-center overflow-hidden">
                  {user.user_img ? (
                    <motion.img 
                      initial={{ scale: 1.2, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      src={`http://localhost:3000/${user.user_img}`} 
                      className="w-full h-full object-cover" 
                      alt="Profile" 
                    />
                  ) : (
                    <User size={130} className="text-slate-800 group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={2} />
                  )}
                  
                  <AnimatePresence>
                    {loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <Zap className="text-emerald-400 animate-bounce" size={40} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.label 
                whileHover={{ scale: 1.1, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-2 -right-2 p-5 bg-white text-black rounded-[2rem] border-[8px] border-[#0a0f1e] cursor-pointer hover:bg-emerald-400 transition-all z-20 shadow-2xl"
              >
                <Camera size={22} strokeWidth={3} />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => updateProfileImage(e.target.files[0])} />
              </motion.label>
            </div>

            <div className="text-center md:text-left flex-1">
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <ShieldCheck size={14} /> Identity Verified
              </motion.div>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div key="edit" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4 max-w-md">
                    <div className="flex gap-4">
                      <input type="text" defaultValue={user.first_name} className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl text-xl font-bold focus:border-emerald-500 outline-none transition-all" />
                      <input type="text" defaultValue={user.last_name} className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl text-xl font-bold focus:border-emerald-500 outline-none transition-all" />
                    </div>
                    <button className="flex items-center justify-center gap-3 w-full bg-emerald-500 text-black p-5 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white transition-colors">
                      <Save size={18} /> Update Vault
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="display" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4 italic">
                      {user.first_name} <span className="text-slate-600">{user.last_name}</span>
                    </h1>
                    <p className="text-slate-500 font-bold text-xl flex items-center justify-center md:justify-start gap-3 opacity-70">
                      <Mail size={20} className="text-indigo-500" /> {user.email}
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
              
              <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-[#111827]/40 border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden group shadow-xl">
                <Wallet className="absolute -right-4 -top-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors" size={180} />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Capital Assets</p>
                <h3 className="text-5xl font-black tracking-tighter italic">₹48,250</h3>
                <div className="mt-4 flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> Live Sync
                </div>
              </motion.div>

              <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-[#111827]/40 border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden group shadow-xl">
                <Activity className="absolute -right-4 -top-4 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors" size={180} />
                <button onClick={logoutHandler} className="text-[10px] font-black text-slate-500 hover:text-rose-500 uppercase tracking-[0.3em] mb-4 transition-all">Vault Logs</button>
                <h3 className="text-5xl font-black tracking-tighter italic">142</h3>
                <div className="mt-4 flex items-center gap-2 text-indigo-500 text-[10px] font-black uppercase">
                  <Globe size={12} /> Interactions
                </div>
              </motion.div>
            </div>

            {/* SECURITY PROGRESS */}
            <motion.div variants={cardVariants} className="bg-[#111827]/40 border border-white/5 p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12 flex items-center gap-3 italic">
                <Hexagon size={16} className="text-emerald-500" /> Shield Integrity Status
              </h3>
              <div className="space-y-10">
                {[{ label: "Data Encryption", val: "94%", color: "bg-emerald-500" },
                  { label: "Identity Integrity", val: "100%", color: "bg-indigo-500" }].map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{item.label}</span> <span>{item.val}</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: item.val }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${item.color} shadow-[0_0_15px_rgba(16,185,129,0.3)]`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (SECURITY HUB) */}
          <motion.div variants={cardVariants} className="space-y-8">
            <div className="bg-gradient-to-b from-indigo-500/10 to-transparent border border-white/5 p-10 rounded-[3.5rem] shadow-2xl">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10 flex items-center gap-2 italic">
                <Lock size={14} className="text-indigo-400" /> Security Protocol
              </h4>
              <div className="space-y-4">
                {[{ icon: <Fingerprint size={18} />, name: "Biometric Auth", status: "Active" },
                  { icon: <Globe size={18} />, name: "Data Sync", status: "Global" }].map((s, i) => (
                  <motion.div key={i} whileHover={{ x: 5 }} className="flex items-center justify-between p-6 bg-black/40 rounded-[2rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="text-indigo-400">{s.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.name}</span>
                    </div>
                    <span className="text-[8px] font-black text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-md">{s.status}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#f43f5e", color: "white" }} 
                whileTap={{ scale: 0.98 }}
                onClick={logoutHandler} 
                className="w-full mt-10 py-6 bg-white text-black rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <LogOut size={18} /> Terminate Session
              </motion.button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#111827]/40 border border-white/5 p-8 rounded-[3rem] flex items-center gap-6">
              <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl shadow-inner"><MapPin size={28} /></div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Node</p>
                <p className="text-md font-bold text-white tracking-tight italic">Pune, Maharashtra</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;