import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { UserPlus, Mail, Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast"; // 🚀 Import toast

const Register = () => {
  const [user, setUser] = useState({ status: "User" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ⏳ Promise based toast (Loading, Success, Error ekatrach)
    const registerPromise = api.post("/user/register", user);

    toast.promise(
      registerPromise,
      {
        loading: "Creating your secure vault...",
        success: (res) => {
          navigate("/login");
          return "Account Created Successfully! 🚀";
        },
        error: (err) => {
          return (
            err.response?.data?.message || "Registration failed. Try again."
          );
        },
      },
      {
        // Styling customizations
        success: { duration: 4000, icon: "🔥" },
        error: { duration: 4000, icon: "❌" },
      },
    );

    try {
      await registerPromise;
    } catch (error) {
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0f1e] flex items-center justify-center p-4 overflow-hidden relative font-sans text-white">
      {/* --- Background Animated Glows --- */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-[#161d31]/60 backdrop-blur-3xl p-8 md:p-10 rounded-[3rem] border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-[#0a0f1e] text-emerald-400 rounded-2xl mb-4 border border-slate-800"
            >
              <UserPlus size={32} strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter">
              Create <span className="text-emerald-400">Account</span>
            </h1>
            <p className="text-slate-500 mt-2 font-bold text-xs uppercase tracking-[0.2em]">
              Begin your financial journey
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                  First Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-400 transition-colors"
                    size={18}
                  />
                  <input
                    name="first_name"
                    type="text"
                    required
                    onChange={inputHandler}
                    value={user.first_name || ""}
                    placeholder="John"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  required
                  onChange={inputHandler}
                  value={user.last_name || ""}
                  placeholder="Doe"
                  className="w-full px-5 py-3.5 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-700 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                Email Identity
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-400 transition-colors"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={inputHandler}
                  value={user.email || ""}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-700 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                Security Key
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-400 transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  onChange={inputHandler}
                  value={user.password || ""}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#0a0f1e]/50 border border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-700 font-bold"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0a0f1e] font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="uppercase tracking-widest text-xs">
                    Create Account
                  </span>
                  <UserPlus size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-white hover:text-emerald-400 transition-colors underline underline-offset-4 font-black"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
