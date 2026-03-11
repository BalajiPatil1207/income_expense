import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import {
  Wallet,
  PlusCircle,
  ArrowUpRight,
  Loader2,
  Zap,
  TrendingDown,
  Activity,
  ArrowRight,
  History,
} from "lucide-react";
import { motion } from "framer-motion";
console.log(motion);

// Recharts for the professional graph
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const [data, setData] = useState({ income: [], expense: [], loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inc, exp] = await Promise.all([
          api.get("/income"),
          api.get("/expense"),
        ]);
        setData({
          income: inc.data.data || [],
          expense: exp.data.data || [],
          loading: false,
        });
      } catch (error) {
        console.error(error);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  const totalIncome = data.income.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0,
  );
  const totalExpense = data.expense.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0,
  );
  const balance = totalIncome - totalExpense;

  // Formatting data for Graph (Example trend data)
  const chartData = [
    { name: "Mon", income: 400, expense: 240 },
    { name: "Tue", income: 300, expense: 139 },
    { name: "Wed", income: 200, expense: 980 },
    { name: "Thu", income: 278, expense: 390 },
    { name: "Fri", income: 189, expense: 480 },
    { name: "Sat", income: 239, expense: 380 },
    { name: "Sun", income: 349, expense: 430 },
  ];

  if (data.loading)
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-emerald-400" size={50} />
        <p className="text-slate-500 font-black text-[10px] tracking-[0.3em] uppercase mt-4">
          Analyzing Data...
        </p>
      </div>
    );

  return (
    <div className="space-y-10 pb-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Finance <span className="text-emerald-400">Hub</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Monitoring your cashflow in real-time.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/dash/income/create"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0a0f1e] px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
          >
            <PlusCircle size={18} /> Add Income
          </Link>
          <Link
            to="/dash/expense/create"
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
          >
            <Zap size={18} fill="currentColor" /> Add Expense
          </Link>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to={"/dash/income"}>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#161d31] p-8 rounded-[2.5rem] border border-slate-800 relative overflow-hidden group"
          >
            <div className="bg-[#0a0f1e] p-4 rounded-2xl text-emerald-400 w-fit mb-4 border border-emerald-500/10 shadow-inner">
              <ArrowUpRight size={28} strokeWidth={3} />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Total Revenue
            </p>
            <h2 className="text-3xl font-black text-white mt-1 group-hover:text-emerald-400 transition-colors">
              ₹{totalIncome.toLocaleString("en-IN")}
            </h2>
          </motion.div>
        </Link>
        <Link to={"/dash/expense"}>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#161d31] p-8 rounded-[2.5rem] border border-slate-800 relative overflow-hidden group"
          >
            <div className="bg-[#0a0f1e] p-4 rounded-2xl text-rose-500 w-fit mb-4 border border-rose-500/10 shadow-inner">
              <TrendingDown size={28} strokeWidth={3} />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Total Outflow
            </p>
            <h2 className="text-3xl font-black text-white mt-1 group-hover:text-rose-500 transition-colors">
              ₹{totalExpense.toLocaleString("en-IN")}
            </h2>
          </motion.div>
        </Link>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-800 p-8 rounded-[2.5rem] shadow-2xl text-white"
        >
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl w-fit mb-4 border border-white/20">
            <Wallet size={28} strokeWidth={2.5} />
          </div>
          <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
            Net Balance
          </p>
          <h2 className="text-4xl font-black mt-1 tracking-tighter">
            ₹{balance.toLocaleString("en-IN")}
          </h2>
        </motion.div>
      </div>

      {/* --- ANALYTICS GRAPH --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#161d31] p-8 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Activity size={20} />
            </div>
            <h3 className="text-xl font-black text-white">
              Analytics Overview
            </h3>
          </div>
          <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
              Income
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>{" "}
              Expense
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0f1e",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                }}
                itemStyle={{ fontWeight: "bold" }}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorInc)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#f43f5e"
                fillOpacity={1}
                fill="url(#colorExp)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* --- QUICK ACTION SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#161d31] p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between group cursor-pointer hover:border-emerald-500/20 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <History size={22} />
            </div>
            <div>
              <p className="text-white font-black text-sm uppercase tracking-tighter">
                Recent Revenue
              </p>
              <p className="text-slate-500 text-xs font-medium">
                Check your last 10 income logs
              </p>
            </div>
          </div>
          <ArrowRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="bg-[#161d31] p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between group cursor-pointer hover:border-rose-500/20 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-white font-black text-sm uppercase tracking-tighter">
                Spending Habits
              </p>
              <p className="text-slate-500 text-xs font-medium">
                Categorized expense analysis
              </p>
            </div>
          </div>
          <ArrowRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default Home;
