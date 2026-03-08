import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, storeData } from "../../../services/api";

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
        navigate("/dash");
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (error) {
      console.log("Error :", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to manage your expenses</p>
        </div>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={inputHandler}
              value={user.email || ""}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={inputHandler}
              value={user.password || ""}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-600 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
