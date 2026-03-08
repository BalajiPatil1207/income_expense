import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { UserPlus, Mail, Lock, User, ArrowLeft } from "lucide-react";

const Register = () => {
  const [user, setUser] = useState({ status: "User" });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/register", user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20 transition-all duration-300 hover:shadow-orange-900/20">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl mb-4">
            <UserPlus size={32} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-gray-500 mt-2 font-medium">Start tracking your wealth today</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                  type="text"
                  name="first_name"
                  placeholder="John"
                  value={user.first_name || ""}
                  onChange={inputHandler}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Last Name</label>
              <input
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                type="text"
                name="last_name"
                placeholder="Doe"
                value={user.last_name || ""}
                onChange={inputHandler}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={user.email || ""}
                onChange={inputHandler}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-300"
                type="password"
                name="password"
                placeholder="••••••••"
                value={user.password || ""}
                onChange={inputHandler}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-200 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Register Now</span>
            <UserPlus size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-bold hover:text-orange-700 transition-colors">
              Login
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-50 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;