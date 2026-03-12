import React from "react";
import { Link } from "react-router-dom"; // Back navigation sathi
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { 
  TrendingUp, Target, Zap, PieChart as PieIcon, 
  BarChart3, ArrowLeft, ChevronRight 
} from "lucide-react";

// Fake Data
const expenseData = [
  { name: "Jan", income: 45000, expense: 32000 },
  { name: "Feb", income: 52000, expense: 28000 },
  { name: "Mar", income: 48000, expense: 41000 },
  { name: "Apr", income: 61000, expense: 35000 },
];

const categoryData = [
  { name: "Investment", value: 400, color: "#10b981" },
  { name: "Leisure", value: 300, color: "#6366f1" },
  { name: "Bills", value: 300, color: "#f43f5e" },
];

// 🎭 Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 12 } 
  }
};

const Analytics = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-white p-4 md:p-10 font-sans relative overflow-hidden">
      
      {/* 🎭 Cinematic Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* --- HEADER & BACK BUTTON --- */}
        <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Link 
              to="/dash" 
              className="group p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-emerald-500 hover:text-black transition-all shadow-xl"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic leading-none">
                VAULT <span className="text-emerald-500">ANALYTICS</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">
                Deciphering Financial Patterns
              </p>
            </div>
          </div>
          
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
             <span className="text-[10px] font-black uppercase tracking-widest">Live Sync Active</span>
          </div>
        </motion.div>

        {/* --- TOP INSIGHT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Savings Rate", val: "24%", icon: <TrendingUp className="text-emerald-500" />, sub: "+2.5% vs Prev" },
            { label: "Monthly Burn", val: "₹1,200/d", icon: <Zap className="text-rose-500" />, sub: "Normal Velocity" },
            { label: "Target Progress", val: "82%", icon: <Target className="text-indigo-500" />, sub: "90% Goal Nearby" }
          ].map((stat, i) => (
            <motion.div 
              key={i} variants={cardVariants}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}
              className="bg-[#111827]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
            >
               <div className="relative z-10">
                  <div className="p-3 bg-white/5 w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform italic">{stat.icon}</div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <h2 className="text-4xl font-black mt-1 italic tracking-tighter">{stat.val}</h2>
                  <p className="text-[9px] text-slate-400 mt-2 font-bold flex items-center gap-1">
                    <ChevronRight size={10} className="text-emerald-500" /> {stat.sub}
                  </p>
               </div>
               <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  {React.cloneElement(stat.icon, { size: 140 })}
               </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- MAIN GROWTH CHART --- */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 bg-[#111827]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[3.5rem] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                <BarChart3 size={16} className="text-emerald-500" /> Capital Flow Map
              </h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-2 text-[10px] font-bold"><div className="w-2 h-2 bg-emerald-500 rounded-full"/> Income</span>
                <span className="flex items-center gap-2 text-[10px] font-bold"><div className="w-2 h-2 bg-rose-500 rounded-full"/> Expense</span>
              </div>
            </div>
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={expenseData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0f1e', border: '1px solid #ffffff10', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} fill="transparent" strokeDasharray="8 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* --- CATEGORY PIE CHART --- */}
          <motion.div 
            variants={cardVariants}
            className="bg-[#111827]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[3.5rem] shadow-2xl"
          >
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
              <PieIcon size={16} className="text-indigo-500" /> Allocation Split
            </h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={75}
                    outerRadius={100}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-black text-slate-500 uppercase">Total</span>
                <span className="text-2xl font-black italic">100%</span>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {categoryData.map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold italic tracking-tighter">{item.value}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;