import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, MapPin, Calendar, Edit3, 
  ShieldCheck, Wallet, CreditCard, LogOut, 
  Settings, Hexagon, Sparkles, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // API Function for Image Upload
  const updateProfile = async (file) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("user_img", file);

    try {
      const res = await api.put(`/user/update/${user.user_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success) {
        // Backend return kelela updated user data session ani state madhe save kara
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        setUser(res.data.data);
        alert("Identity Verified & Profile Synced! 🚀");
      }
    } catch (error) {
      console.log("Upload Error:", error.message);
      alert("Vault Sync Failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="h-screen bg-[#0a0f1e] flex flex-col items-center justify-center gap-4 text-white">
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
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          ></motion.div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            
            {/* User Avatar Section */}
            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-48 h-48 rounded-[3rem] bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-500 p-1.5 shadow-2xl shadow-indigo-500/20 overflow-hidden"
              >
                <div className="w-full h-full rounded-[2.8rem] bg-[#0a0f1e] flex items-center justify-center overflow-hidden border border-white/5 relative">
                  {/* Dynamic Image logic */}
                  {user.user_img ? (
                    <img 
                      src={user.user_img} 
                      alt="Profile" 
                      className="w-full h-full object-cover animate-in fade-in duration-500"
                    />
                  ) : (
                    <User size={100} className="text-slate-800 group-hover:text-emerald-400 transition-all duration-500" />
                  )}

                  {/* Loading Overlay */}
                  {loading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Edit Button Triggering File Input */}
              <label 
                htmlFor="avatarInput" 
                className="absolute bottom-3 right-3 p-4 bg-emerald-500 text-slate-950 rounded-2xl border-[6px] border-[#161d31] shadow-xl cursor-pointer hover:bg-white transition-all active:scale-90"
              >
                <Edit3 size={20} strokeWidth={3} />
                <input 
                  type="file" 
                  id="avatarInput" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => updateProfile(e.target.files[0])}
                />
              </label>
            </div>

            {/* User Text Info */}
            <div className="text-center md:text-left space-y-4 text-white">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-2">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter capitalize">
                    {user.first_name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">{user.last_name}</span>
                  </h1>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                   <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> Identity Verified
                  </span>
                  <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    ID: {user.user_id}
                  </span>
                </div>
              </motion.div>

              <p className="text-slate-400 font-bold text-lg flex items-center justify-center md:justify-start gap-3 opacity-70">
                <Mail size={20} className="text-indigo-500" /> {user.email}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <button className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-xl">
                  Edit Profile
                </button>
                <button className="p-4 bg-slate-800/50 text-white rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- 2. DATA GRID (Tuza existing code) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
            {/* ... Tuze Data Points, Wallet, ani Security Logs cards yithe theva ... */}
            <div className="lg:col-span-2 bg-[#161d31]/40 border border-slate-800 p-10 rounded-[3rem]">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8">System Metrics</h3>
                <p className="text-slate-400">Security protocol active. All data points synced with local vault.</p>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Profile;