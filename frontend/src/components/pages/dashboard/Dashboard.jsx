import React from "react";
import { useNavigate } from "react-router-dom";
import { removeStore } from "../../../services/api";
import Home from "../home/Home";
import { LogOut, User, LayoutDashboard, Settings, Bell } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const logoutHandler = () => {
    removeStore();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-indigo-900 flex-col text-white shadow-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tighter text-orange-400">
            TRACKER <span className="text-white">PRO</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-indigo-800 rounded-xl text-white font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-indigo-800 rounded-xl text-indigo-200 transition-all">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <button 
            onClick={logoutHandler}
            className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all"
          >
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 p-4 px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600 md:hidden">
              <LayoutDashboard size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 hidden md:block">Main Dashboard</h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-indigo-600 transition-colors relative">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 capitalize">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-gray-500 font-medium">Personal Account</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 ring-2 ring-indigo-50">
                <User size={24} />
              </div>
              <button onClick={logoutHandler} className="md:hidden text-red-500">
                <LogOut size={22} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="p-4 md:p-8 animate-in fade-in duration-500">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Welcome back, <span className="text-indigo-600 capitalize">{user?.first_name}!</span> 👋
            </h3>
          </div>
          
          {/* Home (Analytics Cards) yithe load hotil */}
          <div className="bg-white/50 rounded-3xl">
            <Home />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;