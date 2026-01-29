"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Wallet, 
  TrendingUp,
  Send,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const transactions = [
    { id: 1, name: 'Sarah Johnson', type: 'sent', amount: '45.00 SOL', date: '2 hours ago', status: 'success' },
    { id: 2, name: 'Dev Team Salary', type: 'sent', amount: '120.00 SOL', date: '1 day ago', status: 'success' },
    { id: 3, name: 'Michael K.', type: 'sent', amount: '38.50 SOL', date: '3 days ago', status: 'success' },
    { id: 4, name: 'Bonus Payment', type: 'received', amount: '25.00 SOL', date: '1 week ago', status: 'success' },
  ];

  const stats = [
    { label: 'Total Paid', value: '$12,450.00', change: '+2.4%', icon: <TrendingUp className="w-5 h-5 text-green-500" /> },
    { label: 'Active Employees', value: '24', change: '+3', icon: <Wallet className="w-5 h-5 text-green-600" /> },
    { label: 'Pending Transactions', value: '3', change: '-1', icon: <Send className="w-5 h-5 text-green-400" /> },
    { label: 'Security Score', value: '98%', change: 'Excellent', icon: <Shield className="w-5 h-5 text-green-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500 opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-green-600 opacity-10 blur-[120px] rounded-full"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-green-600 rounded flex items-center justify-center">
              <Shield size={18} className="text-black fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter">Stealth Payroll</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Overview</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Transactions</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Analytics</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Settings</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} className="text-slate-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Settings size={20} className="text-slate-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <LogOut size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-black mb-2 tracking-tight">Welcome Back! 👋</h1>
            <p className="text-slate-400">Manage your payroll securely on Solana</p>
          </motion.div>

          {/* MAIN BALANCE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 pointer-events-none"></div>
            <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Total Payroll Balance</p>
                  <div className="flex items-baseline gap-4">
                    <h2 className="text-5xl font-black">
                      {showBalance ? '$24,850.50' : '••••••'}
                    </h2>
                    <span className="text-slate-400">SOL</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-3 hover:bg-white/10 rounded-lg transition-all"
                >
                  {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Send className="mr-2 w-4 h-4" />
                  Send Payroll
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Plus className="mr-2 w-4 h-4" />
                  Add Employee
                </Button>
              </div>
            </div>
          </motion.div>

          {/* STATS GRID */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                  {stat.icon}
                </div>
                <div className="mb-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <p className="text-xs text-slate-500">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          {/* TRANSACTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <a href="#" className="text-green-500 hover:text-green-600 text-sm flex items-center gap-1">
                View All <ChevronRight size={16} />
              </a>
            </div>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${tx.type === 'sent' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                      {tx.type === 'sent' ? (
                        <ArrowUpRight className="w-5 h-5 text-red-400" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tx.name}</p>
                      <p className="text-sm text-slate-400">{tx.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">{tx.type === 'sent' ? '-' : '+'}{tx.amount}</p>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
