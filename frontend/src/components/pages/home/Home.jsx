import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Wallet, PlusCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Home = () => {
  // Temporary data (Nantar backend sobat connect karu)
  const totalIncome = 50000;
  const totalExpense = 22500;
  const balance = totalIncome - totalExpense;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Financial Overview</h1>
          <p className="text-gray-500 font-medium">Manage your money and see where it goes.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/dash/income/create" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-green-100 font-semibold active:scale-95">
             <PlusCircle size={20} /> Add Income
           </Link>
           <Link to="/dash/expense/create" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-red-100 font-semibold active:scale-95">
             <PlusCircle size={20} /> Add Expense
           </Link>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-white/20 p-2 rounded-lg w-fit mb-4">
              <Wallet size={24} />
            </div>
            <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">Total Balance</p>
            <h2 className="text-4xl font-black mt-1">₹{balance.toLocaleString()}</h2>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
        </div>

        {/* Total Income Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="bg-green-100 p-4 rounded-2xl text-green-600">
            <ArrowUpRight size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase">Total Income</p>
            <h2 className="text-2xl font-bold text-gray-800">₹{totalIncome.toLocaleString()}</h2>
          </div>
        </div>

        {/* Total Expense Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="bg-red-100 p-4 rounded-2xl text-red-600">
            <ArrowDownLeft size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase">Total Expense</p>
            <h2 className="text-2xl font-bold text-gray-800">₹{totalExpense.toLocaleString()}</h2>
          </div>
        </div>

      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Recent Insights</h3>
          <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <TrendingUp size={20}/>
                </div>
                <p className="text-gray-600 text-sm">Your income grew by <span className="text-green-600 font-bold">12%</span> this month.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <TrendingDown size={20}/>
                </div>
                <p className="text-gray-600 text-sm">Highest spending on <span className="text-red-600 font-bold">Food & Rent</span>.</p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Home;