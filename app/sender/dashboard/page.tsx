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
  ArrowUpRight,
  Eye,
  EyeOff,
  Plus,
  User,
  Briefcase,
  CheckCircle2,
  DollarSign,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const SenderDashboard = () => {
  const router = useRouter();
  const { connected, address, role, disconnect } = useWallet();
  const { entries, createPayrollEntry } = usePayroll();
  const [showBalance, setShowBalance] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!connected) {
      router.replace("/connect");
    } else if (role !== "sender") {
      router.replace("/recipient/dashboard");
    }
  }, [connected, role, router]);

  // Form state for sender
  const [recipientWallet, setRecipientWallet] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDC");
  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");

  // Get sender entries
  const senderEntries = entries.filter((e) => e.transaction?.from === address);

  const handleCreatePayroll = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !recipientWallet || !recipientPublicKey || !amount || !period) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSending(true);
    try {
      await createPayrollEntry(address, recipientWallet, recipientPublicKey, {
        amount: parseFloat(amount),
        currency,
        period,
        notes: notes || undefined,
      });

      toast.success("Payroll sent successfully!", {
        description: "The salary has been encrypted and sent on-chain.",
      });

      // Reset form
      setRecipientWallet("");
      setRecipientPublicKey("");
      setAmount("");
      setPeriod("");
      setNotes("");
      setIsCreating(false);
    } catch (error) {
      toast.error("Failed to send payroll", {
        description: "Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const stats = [
    {
      label: "Total Paid",
      value: "$12,450.00",
      change: "+2.4%",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Active Recipients",
      value: "24",
      change: "+3",
      icon: <User className="w-5 h-5 text-green-600" />,
    },
    {
      label: "Pending Transactions",
      value: "3",
      change: "-1",
      icon: <Send className="w-5 h-5 text-green-400" />,
    },
    {
      label: "Security Score",
      value: "98%",
      change: "Excellent",
      icon: <Shield className="w-5 h-5 text-green-500" />,
    },
  ];

  if (!connected || role !== "sender") {
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
                <p className="text-lg font-bold">Sender Dashboard</p>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Briefcase size={16} />
                  <span className="capitalize">Employer</span>
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
              <h1 className="text-4xl font-black mb-2 tracking-tight">Payment Sender Dashboard 💼</h1>
              <p className="text-slate-400">Manage encrypted payroll for your recipients</p>
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
                      <p className="text-slate-400 text-sm mb-2">Total Payroll Balance</p>
                      <div className="flex items-baseline gap-4">
                        <h2 className="text-5xl font-black">
                          {showBalance ? "$24,850.50" : "••••••"}
                        </h2>
                        <span className="text-slate-400">USDC</span>
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
                      onClick={() => setIsCreating(true)}
                    >
                      <Plus className="mr-2 w-4 h-4" />
                      Create New Payroll
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <BarChart3 className="mr-2 w-4 h-4" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CREATE PAYROLL FORM */}
            {isCreating && (
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
                      Create Encrypted Payroll
                    </CardTitle>
                    <CardDescription>
                      Salary data will be encrypted with the recipient's public key
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreatePayroll} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="wallet" className="text-sm font-medium">
                            Recipient Wallet Address
                          </Label>
                          <Input
                            id="wallet"
                            placeholder="e.g., 7x9k...4f3a"
                            value={recipientWallet}
                            onChange={(e) => setRecipientWallet(e.target.value)}
                            disabled={isSending}
                            className="bg-black/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pubkey" className="text-sm font-medium">
                            Recipient Public Key
                            <span className="text-xs text-muted-foreground ml-2">
                              (for encryption)
                            </span>
                          </Label>
                          <Input
                            id="pubkey"
                            placeholder="MIIBIjANBgkqhkiG9w0BAQE..."
                            value={recipientPublicKey}
                            onChange={(e) => setRecipientPublicKey(e.target.value)}
                            disabled={isSending}
                            className="bg-black/20 font-mono text-xs"
                          />
                          <p className="text-xs text-green-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Used to encrypt salary details
                          </p>
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount" className="text-sm font-medium">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isSending}
                            step="0.01"
                            className="bg-black/20 text-lg font-semibold"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency" className="text-sm font-medium">
                            Currency
                          </Label>
                          <select
                            id="currency"
                            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm h-10 text-white"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            disabled={isSending}
                          >
                            <option>USDC</option>
                            <option>SOL</option>
                            <option>USDT</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="period" className="text-sm font-medium">
                            Pay Period
                          </Label>
                          <Input
                            id="period"
                            placeholder="January 2026"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            disabled={isSending}
                            className="bg-black/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium">
                          Notes (Optional)
                        </Label>
                        <textarea
                          id="notes"
                          placeholder="Additional payment details..."
                          className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm resize-none text-white"
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          disabled={isSending}
                        />
                      </div>

                      <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                        <p className="text-sm text-white flex items-start gap-2">
                          <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>
                            The amount and details will be encrypted using the recipient's public
                            key. Only they can decrypt it with their wallet.
                          </span>
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsCreating(false)}
                          disabled={isSending}
                          className="flex-1 border-white/20 text-white hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          disabled={isSending}
                        >
                          {isSending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Encrypted Payroll
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* STATS */}
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mb-12">
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

            {/* RECENT TRANSACTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <Link
                  href="/history"
                  className="text-green-500 hover:text-green-600 text-sm flex items-center gap-1"
                >
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-4">
                {senderEntries.slice(0, 5).map((tx) => {
                  const amount = tx.transaction?.amount;
                  const date = tx.transaction?.timestamp
                    ? new Date(tx.transaction.timestamp).toLocaleDateString()
                    : new Date(tx.createdAt).toLocaleDateString();
                  const counterparty = tx.recipientWallet;
                  return (
                    <Link key={tx.id} href={`/payroll/${tx.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-all group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-red-500/20">
                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                          </div>
                          <div>
                            <p className="font-medium">{counterparty}</p>
                            <p className="text-sm text-slate-400">{date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold">-{amount}</p>
                          <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {senderEntries.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <DollarSign className="mx-auto mb-4" size={48} />
                    <p>No transactions yet. Create your first payroll!</p>
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

export default SenderDashboard;
