import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, storeData } from "../../../services/api";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", user);
      if (res.data && res.data.success) {
        const token = res.data.token;
        const userData = res.data.data;
        storeData(token, userData);
        navigate("/private");
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (error) {
      console.log("Error :", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20 transition-all duration-300">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl mb-6 shadow-inner">
            <LogIn size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2 font-medium italic">Securely access your expense tracker</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="relative">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                required
                onChange={inputHandler}
                value={user.email || ""}
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 font-medium"
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                Password
              </label>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                name="password"
                required
                onChange={inputHandler}
                value={user.password || ""}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-gray-200 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            <span>Login to Dashboard</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-500 font-bold">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-600 hover:text-orange-700 underline decoration-2 underline-offset-4 transition-all">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;