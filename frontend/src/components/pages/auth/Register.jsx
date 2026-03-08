import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, storeData } from "../../../services/api";

const Register = () => {
  const [user, setUser] = useState({ status: "Admin" });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/register", user);
      if (res.data && res.data.success) {
        const token = res.data.token || "temp_token";
        const userData = res.data.data;
        storeData(token, userData);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">Join our Income & Expense Tracker</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                type="text"
                name="first_name"
                placeholder="John"
                value={user.first_name || ""}
                onChange={inputHandler}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                type="text"
                name="last_name"
                placeholder="Doe"
                value={user.last_name || ""}
                onChange={inputHandler}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              type="email"
              name="email"
              placeholder="name@company.com"
              value={user.email || ""}
              onChange={inputHandler}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              type="password"
              name="password"
              placeholder="••••••••"
              value={user.password || ""}
              onChange={inputHandler}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-duration-300 transform active:scale-95"
          >
            Register Now
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Login
          </Link>
        </div>

        <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
               ← Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;