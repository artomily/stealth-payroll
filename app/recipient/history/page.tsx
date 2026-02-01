"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  History as HistoryIcon,
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowDownLeft,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { useWallet } from "@/contexts/WalletContext";
import { usePayroll } from "@/contexts/PayrollContext";
import { formatWalletAddress } from "@/lib/solana-mock";

export default function RecipientHistoryPage() {
  const router = useRouter();
  const { connected, address, role } = useWallet();
  const { entries } = usePayroll();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAmounts, setShowAmounts] = useState(true);

  useEffect(() => {
    if (!connected) {
      router.replace("/connect");
    } else if (role !== "recipient") {
      router.replace("/sender/history");
    }
  }, [connected, role, router]);

  const recipientEntries = entries.filter(
    (e) => e.recipientWallet === formatWalletAddress(address || "")
  );

  const filteredEntries = recipientEntries.filter(
    (entry) =>
      entry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.transaction?.from || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalReceived = recipientEntries.reduce((sum, entry) => {
    const amount = entry.transaction?.amount || "0";
    const numericAmount = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.]/g, "") || "0") : amount;
    return sum + numericAmount;
  }, 0);

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
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded bg-[#2bee6c]/20 text-[#2bee6c]">
                    <HistoryIcon size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5c7d72]">Received</p>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">Payment History</h1>
                  </div>
                </div>
                <p className="text-sm text-[#9db9b0]">View all payments you've received</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAmounts(!showAmounts)}
                className="border-[#2bee6c]/20 text-[#2bee6c] hover:bg-[#2bee6c]/10"
              >
                {showAmounts ? <EyeOff size={16} /> : <Eye size={16} />}
                <span className="ml-2">{showAmounts ? "Hide" : "Show"} Amounts</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#9db9b0] text-sm font-medium">Total Received</h3>
                  <DollarSign className="w-5 h-5 text-[#2bee6c]" />
                </div>
                <p className="text-3xl font-bold">
                  {showAmounts ? `$${totalReceived.toFixed(2)}` : "••••••"}
                </p>
                <p className="text-xs text-[#5c7d72] mt-2">USDC-SPL</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#9db9b0] text-sm font-medium">Total Payments</h3>
                  <Calendar className="w-5 h-5 text-[#2bee6c]" />
                </div>
                <p className="text-3xl font-bold">{recipientEntries.length}</p>
                <p className="text-xs text-[#5c7d72] mt-2">All Time</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#9db9b0] text-sm font-medium">This Month</h3>
                  <CheckCircle2 className="w-5 h-5 text-[#2bee6c]" />
                </div>
                <p className="text-3xl font-bold">
                  {recipientEntries.filter(e => {
                    const date = new Date(e.createdAt);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                  }).length}
                </p>
                <p className="text-xs text-[#5c7d72] mt-2">Received</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5c7d72]" />
                <Input
                  type="text"
                  placeholder="Search by sender or transaction ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0b1110] border-[#283933] text-white placeholder:text-[#5c7d72]"
                />
              </div>
            </div>

            {/* Transactions List */}
            <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-medium text-[#9db9b0]">Date</th>
                      <th className="text-left p-4 text-sm font-medium text-[#9db9b0]">From</th>
                      <th className="text-left p-4 text-sm font-medium text-[#9db9b0]">Amount</th>
                      <th className="text-left p-4 text-sm font-medium text-[#9db9b0]">Status</th>
                      <th className="text-right p-4 text-sm font-medium text-[#9db9b0]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((entry) => {
                      const date = entry.transaction?.timestamp
                        ? new Date(entry.transaction.timestamp).toLocaleDateString()
                        : new Date(entry.createdAt).toLocaleDateString();
                      const from = entry.transaction?.from || "Unknown";
                      const amount = entry.transaction?.amount || "Encrypted";

                      return (
                        <tr
                          key={entry.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#5c7d72]" />
                              <span className="text-sm">{date}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-lg bg-green-500/20">
                                <ArrowDownLeft className="w-4 h-4 text-green-400" />
                              </div>
                              <span className="text-sm font-mono">{from}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-[#2bee6c] font-semibold">+{amount}</span>
                          </td>
                          <td className="p-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bee6c]/10 border border-[#2bee6c]/20">
                              <CheckCircle2 className="w-3 h-3 text-[#2bee6c]" />
                              <span className="text-xs text-[#2bee6c]">Received</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <Link href={`/payroll/${entry.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#9db9b0] hover:text-white"
                              >
                                View Details
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredEntries.length === 0 && (
                  <div className="text-center py-12 text-[#5c7d72]">
                    <HistoryIcon className="mx-auto mb-4" size={48} />
                    <p className="text-lg">No payment history yet</p>
                    <p className="text-sm mt-2">Received payments will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
