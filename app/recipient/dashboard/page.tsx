"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Wallet,
  TrendingUp,
  Send,
  BarChart3,
  LogOut,
  ChevronRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Copy,
  User,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { usePayroll } from "@/contexts/PayrollContext";
import { formatWalletAddress } from "@/lib/solana-mock";
import { toast } from "sonner";
import { Sidebar } from "@/components/Sidebar";

const RecipientDashboard = () => {
  const router = useRouter();
  const { connected, address, role, disconnect, publicKeyBase64 } = useWallet();
  const { entries } = usePayroll();
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    if (!connected) {
      router.replace("/connect");
    } else if (role !== "recipient") {
      router.replace("/sender/dashboard");
    }
  }, [connected, role, router]);

  // Get recipient entries
  const recipientEntries = entries.filter(
    (e) => e.recipientWallet === formatWalletAddress(address || "")
  );

  const handleCopyPublicKey = () => {
    if (publicKeyBase64) {
      navigator.clipboard.writeText(publicKeyBase64);
      toast.success("Public key copied to clipboard");
    }
  };

  const stats = [
    {
      label: "Total Received",
      value: "$8,750.00",
      change: "This Month",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Payments",
      value: "12",
      change: "All Time",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    },
    {
      label: "Pending",
      value: "2",
      change: "New",
      icon: <Send className="w-5 h-5 text-green-400" />,
    },
    {
      label: "Security",
      value: "100%",
      change: "Encrypted",
      icon: <Shield className="w-5 h-5 text-green-500" />,
    },
  ];

  if (!connected || role !== "recipient") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500 opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-green-600 opacity-10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex">
        <Sidebar />

        <main className="flex-1 px-6 py-12 lg:py-14">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-green-600 rounded flex items-center justify-center">
                <Shield size={20} className="text-black fill-current" />
              </div>
              <div>
                <p className="text-lg font-bold">Recipient Dashboard</p>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <User size={16} />
                  <span className="capitalize">Employee</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {connected && (
                <>
                  <div className="hidden md:flex items-center gap-2 text-sm">
                    <span className="text-slate-400">Connected:</span>
                    <span className="font-mono">{formatWalletAddress(address || "")}</span>
                  </div>
                  <button
                    onClick={disconnect}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title="Disconnect"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-full">
            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-black mb-2 tracking-tight">Payment Recipient Dashboard 💰</h1>
              <p className="text-slate-400">View and decrypt your encrypted payroll</p>
            </motion.div>

            {/* MAIN CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 pointer-events-none"></div>
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Monthly Salary</p>
                      <div className="flex items-baseline gap-4">
                        <h2 className="text-5xl font-black">
                          {showBalance ? "$5,750.00" : "••••••"}
                        </h2>
                        <span className="text-slate-400">USDC-SPL</span>
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
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => router.push("/history")}
                    >
                      <BarChart3 className="mr-2 w-4 h-4" />
                      View All Transactions
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PUBLIC KEY CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lock className="w-5 h-5 text-green-500" />
                    Your Encryption Public Key
                  </CardTitle>
                  <CardDescription>
                    Share this with your employer to receive encrypted payroll
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-black/40 rounded-lg border border-white/10 flex items-center justify-between">
                    <code className="text-xs font-mono text-green-400 break-all">
                      {publicKeyBase64 || "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyPublicKey}
                      className="ml-4 flex-shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Only you can decrypt payrolls sent to this key
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* STATS */}
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mb-12">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
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

            {/* RECEIVED PAYROLLS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Received Payrolls</h3>
                <Link
                  href="/history"
                  className="text-green-500 hover:text-green-600 text-sm flex items-center gap-1"
                >
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-4">
                {recipientEntries.slice(0, 5).map((entry) => {
                  const date = entry.transaction?.timestamp
                    ? new Date(entry.transaction.timestamp).toLocaleDateString()
                    : new Date(entry.createdAt).toLocaleDateString();
                  const from = entry.transaction?.from || "Unknown";
                  const amount = entry.transaction?.amount || "Encrypted";

                  return (
                    <Link key={entry.id} href={`/payroll/${entry.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-all group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-green-500/20">
                            <ArrowDownLeft className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium">{from}</p>
                            <p className="text-sm text-slate-400">{date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-green-500">+{amount}</p>
                          <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {recipientEntries.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <DollarSign className="mx-auto mb-4" size={48} />
                    <p>No payrolls received yet</p>
                    <p className="text-sm mt-2">Share your public key with your employer</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecipientDashboard;
