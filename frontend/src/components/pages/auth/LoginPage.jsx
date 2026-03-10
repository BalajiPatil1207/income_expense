import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, storeData } from "../../../services/api";
import { Mail, Lock, LogIn, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError(""); // Type kartaana error घालवण्यासाठी
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/user/login", user);
      if (res.data && res.data.success) {
        const token = res.data.token;
        const userData = res.data.data;
        storeData(token, userData);
        navigate("/private");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0f1e] flex items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* --- Background Animated Orbs --- */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card Container */}
        <div className="bg-[#161d31]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-orange-500 to-orange-600 text-white rounded-[2rem] mb-6 shadow-lg shadow-orange-500/30"
            >
              <LogIn size={36} strokeWidth={2.5} />
            </motion.div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Welcome Back</h1>
            <p className="text-slate-400 mt-2 font-medium">Elevate your financial control.</p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-bold text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Identity</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={inputHandler}
                  value={user.email || ""}
                  placeholder="name@vision.com"
                  className="w-full pl-12 pr-4 py-4 bg-[#0a0f1e] border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-slate-700 font-bold"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Security Key</label>
                <Link to="#" className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-400 transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={inputHandler}
                  value={user.password || ""}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-[#0a0f1e] border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all placeholder:text-slate-700 font-bold"
                />
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 font-bold text-sm">
              New to the platform?{" "}
              <Link to="/register" className="text-orange-500 hover:text-orange-400 transition-all font-black">
                Join Now
              </Link>
            </p>
          </div>
        </div>

        {/* Floating Decorative Element */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
            <Sparkles size={14} className="text-orange-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Powered by AI-Vision</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;