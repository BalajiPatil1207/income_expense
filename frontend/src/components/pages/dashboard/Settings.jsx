import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, User, Shield, Bell, Eye, Trash2, 
  ChevronRight, Moon, Globe, Lock, Save, LogOut 
} from "lucide-react";
import toast from "react-hot-toast";
import { removeStore } from "../../../services/api";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const logoutHandler = () => {
    removeStore();
    navigate("/login");
    toast.success("Session Terminated! See you soon! 👋");
  };

  const sections = [
    { id: "profile", label: "Account Profile", icon: <User size={18} /> },
    { id: "security", label: "Security & Privacy", icon: <Shield size={18} /> },
    { id: "pref", label: "Preferences", icon: <Bell size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050810] text-white p-4 md:p-10 font-sans relative overflow-hidden">
      
      {/* 🎭 Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex items-center gap-6 mb-12">
          <Link to="/dash" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-5xl font-black tracking-tighter italic">VAULT <span className="text-emerald-500">SETTINGS</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage your financial identity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- SIDEBAR NAVIGATION --- */}
          <div className="space-y-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border ${
                  activeTab === s.id 
                  ? "bg-emerald-500 text-black border-emerald-500 font-black shadow-[0_10px_30px_rgba(16,185,129,0.2)]" 
                  : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  {s.icon}
                  <span className="text-[10px] uppercase tracking-widest">{s.label}</span>
                </div>
                <ChevronRight size={14} opacity={activeTab === s.id ? 1 : 0.3} />
              </button>
            ))}

            <div className="pt-10">
              <button onClick={()=>logoutHandler()} className="w-full flex items-center gap-4 p-5 text-rose-500 bg-rose-500/5 border border-rose-500/10 rounded-2xl hover:bg-rose-500 hover:text-white transition-all group">
                <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
              </button>
            </div>
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div 
                  key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-[#111827]/40 backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8"
                >
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">Public Identity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">First Name</label>
                        <input type="text" placeholder="Ganesh" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Last Name</label>
                        <input type="text" placeholder="Patil" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                      <input type="email" placeholder="ganesh@vault.com" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold" />
                    </div>
                  </div>

                  <button 
                    onClick={() => toast.success("Identity Updated!")}
                    className="flex items-center gap-3 px-10 py-5 bg-emerald-500 text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl"
                  >
                    <Save size={18} /> Save Protocol
                  </button>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div 
                  key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-[#111827]/40 backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8"
                >
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Security Layers</h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: <Lock />, title: "Two-Factor Auth", desc: "Add an extra layer of security" },
                      { icon: <Eye />, title: "Privacy Mode", desc: "Hide balances from main screen" },
                      { icon: <Globe />, title: "Login Activity", desc: "Track where you logged in" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-5">
                          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl">{item.icon}</div>
                          <div>
                            <h4 className="text-sm font-black italic">{item.title}</h4>
                            <p className="text-[10px] text-slate-500 font-bold">{item.desc}</p>
                          </div>
                        </div>
                        <div className="w-12 h-6 bg-white/10 rounded-full relative p-1">
                          <div className="w-4 h-4 bg-slate-500 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <button className="flex items-center gap-3 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:underline">
                      <Trash2 size={16} /> Delete Account Permanently
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;