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
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Plus,
  User,
  Briefcase,
  Key,
  Copy,
  CheckCircle2,
  DollarSign,
  FileText,
  Unlock,
  Clock,
  ExternalLink,
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
import { decryptPayroll, PayrollData } from "@/lib/encryption";
import { formatWalletAddress, getSolscanUrl } from "@/lib/solana-mock";
import { toast } from "sonner";
import { Sidebar } from "@/components/Sidebar";

const Dashboard = () => {
  const router = useRouter();
  const {
    connected,
    address,
    role,
    connect,
    disconnect,
    publicKeyBase64,
    secretKey,
  } = useWallet();
  const { entries, createPayrollEntry } = usePayroll();
  const [showBalance, setShowBalance] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [decryptedPayrolls, setDecryptedPayrolls] = useState<
    Record<string, PayrollData>
  >({});

  useEffect(() => {
    if (!connected) {
      router.replace("/connect");
    }
  }, [connected, router]);

  // Form state for sender
  const [recipientWallet, setRecipientWallet] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDC-SPL");
  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");

  // Get role-specific entries
  const senderEntries = entries.filter((e) => e.transaction?.from === address);
  const recipientEntries = entries.filter((e) => e.recipientWallet === address);

  const handleCreatePayroll = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !address ||
      !recipientWallet ||
      !recipientPublicKey ||
      !amount ||
      !period
    ) {
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

  const copyPublicKey = () => {
    if (publicKeyBase64) {
      navigator.clipboard.writeText(publicKeyBase64);
      toast.success("Public key copied!", {
        description: "Share this with your organization for encrypted payroll.",
      });
    }
  };

  const decryptPayrollEntry = (entryId: string) => {
    const entry = recipientEntries.find((e) => e.id === entryId);
    if (!entry || !secretKey) return;

    try {
      const decrypted = decryptPayroll(entry.encryptedPayload, secretKey);
      setDecryptedPayrolls((prev) => ({
        ...prev,
        [entryId]: decrypted,
      }));
      toast.success("Payroll decrypted successfully!");
    } catch (error) {
      toast.error("Failed to decrypt payroll", {
        description: "Make sure you have the correct wallet connected.",
      });
    }
  };

  const stats =
    role === "sender"
      ? [
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
        ]
      : [
          {
            label: "Salary Received",
            value: "$8,500.00",
            change: "This month",
            icon: <DollarSign className="w-5 h-5 text-green-500" />,
          },
          {
            label: "Encrypted Slips",
            value: recipientEntries.length.toString(),
            change: "Total",
            icon: <Lock className="w-5 h-5 text-green-600" />,
          },
          {
            label: "Decrypted",
            value: Object.keys(decryptedPayrolls).length.toString(),
            change: "Available",
            icon: <Unlock className="w-5 h-5 text-green-400" />,
          },
          {
            label: "Privacy Score",
            value: "100%",
            change: "Maximum",
            icon: <Shield className="w-5 h-5 text-green-500" />,
          },
        ];

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
                <p className="text-lg font-bold">Dashboard</p>
                {role && (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    {role === "sender" ? (
                      <Briefcase size={16} />
                    ) : (
                      <User size={16} />
                    )}
                    <span className="capitalize">{role}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {connected ? (
                <>
                  <div className="hidden md:flex items-center gap-2 text-sm">
                    <span className="text-slate-400">Connected:</span>
                    <span className="font-mono">
                      {formatWalletAddress(address || "")}
                    </span>
                  </div>
                  <button
                    onClick={disconnect}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title="Disconnect"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={() => connect("sender")}
                    className="bg-green-600 hover:bg-green-700 text-sm"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Connect as Sender
                  </Button>
                  <Button
                    onClick={() => connect("recipient")}
                    variant="outline"
                    className="border-green-600/20 text-green-400 hover:bg-green-600/10 text-sm"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Connect as Recipient
                  </Button>
                </div>
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
              <h1 className="text-4xl font-black mb-2 tracking-tight">
                {!connected
                  ? "Welcome to Stealth Payroll! 👋"
                  : role === "sender"
                    ? "Payment Sender Dashboard 💼"
                    : "Your Payment Dashboard 💰"}
              </h1>
              <p className="text-slate-400">
                {!connected
                  ? "Connect your wallet to get started with encrypted payroll"
                  : role === "sender"
                    ? "Manage encrypted payroll for your recipients"
                    : "View and decrypt your encrypted payment slips"}
              </p>
            </motion.div>

            {!connected ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12 text-center"
              >
                <Card className="p-12 border-dashed border-border/50 bg-card/30">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        Choose Your Role
                      </h2>
                      <p className="text-muted-foreground mb-8 w-full">
                        Connect as a sender to send encrypted payroll, or as a
                        recipient to receive and decrypt salary payments.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                      <Button
                        onClick={() => connect("sender")}
                        className="bg-green-600 hover:bg-green-700 flex-1"
                        size="lg"
                      >
                        <Briefcase className="w-5 h-5 mr-2" />
                        I'm a Sender
                      </Button>
                      <Button
                        onClick={() => connect("recipient")}
                        variant="outline"
                        className="border-green-600/30 text-green-400 hover:bg-green-600/10 flex-1"
                        size="lg"
                      >
                        <User className="w-5 h-5 mr-2" />
                        I'm a Recipient
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <>
                {/* ROLE-SPECIFIC MAIN CARD */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-12 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 pointer-events-none"></div>
                  <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                    {role === "sender" ? (
                      <div>
                        <div className="flex items-start justify-between mb-8">
                          <div>
                            <p className="text-slate-400 text-sm mb-2">
                              Total Payroll Balance
                            </p>
                            <div className="flex items-baseline gap-4">
                              <h2 className="text-5xl font-black">
                                {showBalance ? "$24,850.50" : "••••••"}
                              </h2>
                              <span className="text-slate-400">USDC-SPL</span>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="p-3 hover:bg-white/10 rounded-lg transition-all"
                          >
                            {showBalance ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
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
                          <Button
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            <BarChart3 className="mr-2 w-4 h-4" />
                            View Analytics
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-8">
                          <p className="text-slate-400 text-sm mb-2">
                            This Month's Salary
                          </p>
                          <div className="flex items-baseline gap-4 mb-4">
                            <h2 className="text-5xl font-black">
                              {showBalance ? "$5,000.00" : "••••••"}
                            </h2>
                            <span className="text-slate-400">USDC-SPL</span>
                          </div>
                          {/* Public Key Display */}
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Key className="w-5 h-5 text-green-500" />
                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    Your Public Key
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    Share with organization
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <code className="text-xs bg-black/30 px-3 py-2 rounded font-mono text-green-400">
                                  {publicKeyBase64?.slice(0, 20)}...
                                </code>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={copyPublicKey}
                                  className="border-green-500/20 hover:bg-green-500/10"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowBalance(!showBalance)}
                          className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-lg transition-all"
                        >
                          {showBalance ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* SENDER CREATE PAYROLL FORM */}
                {role === "sender" && isCreating && (
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
                          Salary data will be encrypted with the recipient's
                          public key
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form
                          onSubmit={handleCreatePayroll}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="wallet"
                                className="text-sm font-medium"
                              >
                                Recipient Wallet Address
                              </Label>
                              <Input
                                id="wallet"
                                placeholder="e.g., 7x9k...4f3a"
                                value={recipientWallet}
                                onChange={(e) =>
                                  setRecipientWallet(e.target.value)
                                }
                                disabled={isSending}
                                className="bg-black/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="pubkey"
                                className="text-sm font-medium"
                              >
                                Recipient Public Key
                                <span className="text-xs text-muted-foreground ml-2">
                                  (for encryption)
                                </span>
                              </Label>
                              <Input
                                id="pubkey"
                                placeholder="MIIBIjANBgkqhkiG9w0BAQE..."
                                value={recipientPublicKey}
                                onChange={(e) =>
                                  setRecipientPublicKey(e.target.value)
                                }
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
                              <Label
                                htmlFor="amount"
                                className="text-sm font-medium"
                              >
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
                              <Label
                                htmlFor="currency"
                                className="text-sm font-medium"
                              >
                                Currency
                              </Label>
                              <select
                                id="currency"
                                className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm h-10 text-white"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                disabled={isSending}
                              >
                                <option>USDC-SPL</option>
                                <option>SOL</option>
                                <option>USDT-SPL</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="period"
                                className="text-sm font-medium"
                              >
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
                            <Label
                              htmlFor="notes"
                              className="text-sm font-medium"
                            >
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
                                The amount and details will be encrypted using
                                the recipient's public key. Only they can
                                decrypt it with their wallet.
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
                        <h3 className="text-slate-400 text-sm font-medium">
                          {stat.label}
                        </h3>
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
                    <h3 className="text-lg font-semibold">
                      Recent Transactions
                    </h3>
                    <a
                      href="#"
                      className="text-green-500 hover:text-green-600 text-sm flex items-center gap-1"
                    >
                      View All <ChevronRight size={16} />
                    </a>
                  </div>
                  <div className="space-y-4">
                    {/* Replace 'transactions' with the correct data source if needed */}
                    {(role === "sender" ? senderEntries : recipientEntries).map(
                      (tx) => {
                        // Determine direction for icon and color
                        const isSent = role === "sender";
                        // Amount: prefer decrypted, else transaction
                        let amount = tx.transaction?.amount;
                        let period = undefined;
                        if (role === "recipient" && decryptedPayrolls[tx.id]) {
                          amount = decryptedPayrolls[tx.id].amount;
                          period = decryptedPayrolls[tx.id].period;
                        }
                        // Date: prefer transaction timestamp, else createdAt
                        const date = tx.transaction?.timestamp
                          ? new Date(
                              tx.transaction.timestamp,
                            ).toLocaleDateString()
                          : new Date(tx.createdAt).toLocaleDateString();
                        // Name: show counterparty wallet
                        const counterparty = isSent
                          ? tx.recipientWallet
                          : tx.transaction?.from;
                        return (
                          <Link key={tx.id} href={`/payroll/${tx.id}`}>
                            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-all group cursor-pointer">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`p-3 rounded-lg ${isSent ? "bg-red-500/20" : "bg-green-500/20"}`}
                                >
                                  {isSent ? (
                                    <ArrowUpRight className="w-5 h-5 text-red-400" />
                                  ) : (
                                    <ArrowDownLeft className="w-5 h-5 text-green-400" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{counterparty}</p>
                                  <p className="text-sm text-slate-400">
                                    {period ? period : date}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <p className="font-semibold">
                                  {isSent ? "-" : "+"}
                                  {amount}
                                </p>
                                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                              </div>
                            </div>
                          </Link>
                        );
                      },
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
