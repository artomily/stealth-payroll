"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  History as HistoryIcon,
  Search,
  Filter,
  Download,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  Wallet,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { useWallet } from "@/contexts/WalletContext";
import { formatWalletAddress } from "@/lib/solana-mock";

type TransactionStatus = "completed" | "pending" | "failed";

type Transaction = {
  id: string;
  date: string;
  batchId: string;
  recipients: number;
  amount: number;
  currency: string;
  status: TransactionStatus;
  signature: string;
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "Jan 24, 2026",
    batchId: "BATCH-2401",
    recipients: 24,
    amount: 45200.0,
    currency: "USDC",
    status: "completed",
    signature: "5wHu7...3kL9",
  },
  {
    id: "2",
    date: "Jan 17, 2026",
    batchId: "BATCH-2317",
    recipients: 22,
    amount: 42100.0,
    currency: "USDC",
    status: "completed",
    signature: "2mKp4...7nB2",
  },
  {
    id: "3",
    date: "Jan 10, 2026",
    batchId: "BATCH-2310",
    recipients: 23,
    amount: 43800.0,
    currency: "USDC",
    status: "completed",
    signature: "8dFg6...1qW5",
  },
  {
    id: "4",
    date: "Jan 03, 2026",
    batchId: "BATCH-2303",
    recipients: 21,
    amount: 39900.0,
    currency: "USDC ",
    status: "completed",
    signature: "4jTy9...8vC3",
  },
  {
    id: "5",
    date: "Dec 27, 2025",
    batchId: "BATCH-2527",
    recipients: 24,
    amount: 45800.0,
    currency: "USDC",
    status: "completed",
    signature: "9sLm2...4pD7",
  },
];

const statusConfig: Record<
  TransactionStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  completed: {
    label: "Completed",
    color: "text-[#2bee6c] bg-[#2bee6c]/10 border-[#2bee6c]/20",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    icon: Clock,
  },
  failed: {
    label: "Failed",
    color: "text-red-400 bg-red-400/10 border-red-400/20",
    icon: XCircle,
  },
};

export default function HistoryPage() {
  const { connected, address, connect } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAmounts, setShowAmounts] = useState(true);

  const filteredTransactions = mockTransactions.filter(
    (tx) =>
      tx.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.signature.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5c7d72]">Transaction</p>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">Payment History</h1>
                  </div>
                </div>
                <p className="text-[#9db9b0] text-sm">
                  View all past payroll batches and transaction records
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-[#283933] text-[#9db9b0] hover:text-white hover:bg-[#1c2723]"
                  onClick={() => setShowAmounts((prev) => !prev)}
                >
                  {showAmounts ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="ml-2 text-sm">{showAmounts ? "Hide" : "Show"}</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-[#283933] text-white hover:bg-[#1c2723]"
                >
                  <Download size={16} className="mr-2" />
                  Export
                </Button>

                {!connected ? (
                  <Button
                    variant="default"
                    className="bg-[#2bee6c] text-black hover:bg-[#24cc59]"
                    onClick={() => connect("sender")}
                  >
                    <Wallet size={16} className="mr-2" />
                    Connect Wallet
                  </Button>
                ) : (
                  <Button variant="ghost" className="text-[#2bee6c] hover:text-white" disabled>
                    <Wallet size={16} className="mr-2" />
                    {formatWalletAddress(address || "")}
                  </Button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Total Paid</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">
                        ${mockTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-[#5c7d72] mt-1">All time</p>
                    </div>
                    <DollarSign className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Batches</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">{mockTransactions.length}</p>
                      <p className="text-xs text-[#5c7d72] mt-1">Total batches</p>
                    </div>
                    <HistoryIcon className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Recipients</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">
                        {mockTransactions.reduce((sum, tx) => sum + tx.recipients, 0)}
                      </p>
                      <p className="text-xs text-[#5c7d72] mt-1">Total payments</p>
                    </div>
                    <ArrowUpRight className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Success Rate</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">100%</p>
                      <p className="text-xs text-[#5c7d72] mt-1">All confirmed</p>
                    </div>
                    <CheckCircle2 className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9db9b0]" size={16} />
                <Input
                  placeholder="Search by batch ID or signature..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#1c2723] border-[#283933] text-white placeholder:text-[#5c7d72]"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#283933] text-[#9db9b0] hover:text-white hover:bg-[#1c2723]"
              >
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#283933] text-[#9db9b0] hover:text-white hover:bg-[#1c2723]"
              >
                <Calendar size={16} className="mr-2" />
                Date Range
              </Button>
            </div>

            {/* Transactions Table */}
            <Card className="bg-[#1c2723] border-[#283933] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#151e1b] border-b border-[#283933] text-[#9db9b0] text-xs uppercase">
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Batch ID</th>
                      <th className="px-6 py-4">Recipients</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#283933]">
                    {filteredTransactions.map((tx) => {
                      const StatusIcon = statusConfig[tx.status].icon;
                      return (
                        <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-[#9db9b0]">
                              <Clock size={14} />
                              {tx.date}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-mono text-sm font-medium group-hover:text-[#2bee6c] transition-colors">
                                {tx.batchId}
                              </span>
                              <span className="text-xs text-[#5c7d72] font-mono">{tx.signature}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm">{tx.recipients}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">
                                {showAmounts ? `$${tx.amount.toLocaleString()}` : "••••••"}
                              </span>
                              <span className="text-xs text-[#5c7d72]">{tx.currency}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium border ${statusConfig[tx.status].color}`}
                            >
                              <StatusIcon size={14} />
                              {statusConfig[tx.status].label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#9db9b0] hover:text-[#2bee6c]"
                                asChild
                              >
                                <Link href={`/payroll/${tx.batchId}`}>
                                  <Eye size={16} className="mr-1" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#9db9b0] hover:text-[#2bee6c]"
                              >
                                <ExternalLink size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-[#283933] bg-[#151e1b] px-6 py-3 text-xs text-[#9db9b0]">
                <p>
                  Showing {filteredTransactions.length} of {mockTransactions.length} transactions
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 border border-[#283933] text-[#9db9b0] hover:bg-[#283933] hover:text-white"
                    disabled
                  >
                    <ChevronRight size={18} className="rotate-180" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 border border-[#283933] text-[#9db9b0] hover:bg-[#283933] hover:text-white"
                    disabled
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
