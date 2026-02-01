"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Key,
  Copy,
  Trash2,
  Edit,
  CheckCircle2,
  Wallet,
  DollarSign,
  Calendar,
  MoreVertical,
  Eye,
  Filter,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { useWallet } from "@/contexts/WalletContext";
import { formatWalletAddress } from "@/lib/solana-mock";
import { toast } from "sonner";

type Recipient = {
  id: string;
  name: string;
  wallet: string;
  publicKey: string;
  email?: string;
  totalPaid: number;
  paymentsCount: number;
  lastPayment: string;
  status: "active" | "inactive";
  avatar: string;
};

const mockRecipients: Recipient[] = [
  {
    id: "1",
    name: "Alice Johnson",
    wallet: "9FzK...xL2p",
    publicKey: "Bx4y...mP1q",
    email: "alice@example.com",
    totalPaid: 24500.0,
    paymentsCount: 6,
    lastPayment: "Jan 24, 2026",
    status: "active",
    avatar: "from-purple-500 to-blue-500",
  },
  {
    id: "2",
    name: "Bob Martinez",
    wallet: "7Hn3...pQ9r",
    publicKey: "Cy5z...nR2s",
    email: "bob@example.com",
    totalPaid: 18900.0,
    paymentsCount: 5,
    lastPayment: "Jan 24, 2026",
    status: "active",
    avatar: "from-pink-500 to-orange-500",
  },
  {
    id: "3",
    name: "Carol Davis",
    wallet: "4Gm8...wT5u",
    publicKey: "Dz6a...oS3t",
    email: "carol@example.com",
    totalPaid: 31200.0,
    paymentsCount: 8,
    lastPayment: "Jan 24, 2026",
    status: "active",
    avatar: "from-teal-500 to-emerald-500",
  },
  {
    id: "4",
    name: "David Chen",
    wallet: "2Bj6...mV7w",
    publicKey: "Ez7b...pT4u",
    totalPaid: 15600.0,
    paymentsCount: 4,
    lastPayment: "Jan 17, 2026",
    status: "active",
    avatar: "from-blue-600 to-indigo-600",
  },
  {
    id: "5",
    name: "Eve Wilson",
    wallet: "8Pk4...nU3x",
    publicKey: "Fa8c...qU5v",
    totalPaid: 22400.0,
    paymentsCount: 7,
    lastPayment: "Jan 24, 2026",
    status: "inactive",
    avatar: "from-yellow-500 to-red-500",
  },
];

export default function RecipientsPage() {
  const { connected, address, connect } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddRecipient, setShowAddRecipient] = useState(false);

  const filteredRecipients = mockRecipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.wallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

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
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5c7d72]">Payroll</p>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">Recipients</h1>
                  </div>
                </div>
                <p className="text-[#9db9b0] text-sm">
                  Manage your payroll recipients and their encrypted public keys
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  className="border-[#283933] text-white hover:bg-[#1c2723]"
                >
                  <Download size={16} className="mr-2" />
                  Export
                </Button>

                <Button
                  variant="default"
                  className="bg-[#2bee6c] text-black hover:bg-[#24cc59]"
                  onClick={() => setShowAddRecipient(true)}
                >
                  <UserPlus size={16} className="mr-2" />
                  Add Recipient
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
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Total Recipients</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">{mockRecipients.length}</p>
                      <p className="text-xs text-[#5c7d72] mt-1">
                        {mockRecipients.filter((r) => r.status === "active").length} active
                      </p>
                    </div>
                    <Users className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Total Paid</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">
                        ${mockRecipients.reduce((sum, r) => sum + r.totalPaid, 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-[#5c7d72] mt-1">All time</p>
                    </div>
                    <DollarSign className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Avg. Payment</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">
                        $
                        {Math.round(
                          mockRecipients.reduce((sum, r) => sum + r.totalPaid, 0) /
                            mockRecipients.reduce((sum, r) => sum + r.paymentsCount, 0)
                        ).toLocaleString()}
                      </p>
                      <p className="text-xs text-[#5c7d72] mt-1">Per transaction</p>
                    </div>
                    <Calendar className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Payments Sent</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">
                        {mockRecipients.reduce((sum, r) => sum + r.paymentsCount, 0)}
                      </p>
                      <p className="text-xs text-[#5c7d72] mt-1">Total transactions</p>
                    </div>
                    <CheckCircle2 className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9db9b0]" size={16} />
                <Input
                  placeholder="Search by name, wallet, or email..."
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
            </div>

            {/* Recipients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipients.map((recipient) => (
                <Card key={recipient.id} className="bg-[#1c2723] border-[#283933] overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-12 rounded-full bg-gradient-to-br ${recipient.avatar} shrink-0`}
                        />
                        <div>
                          <h3 className="font-bold text-white">{recipient.name}</h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                                recipient.status === "active"
                                  ? "bg-[#2bee6c]/10 text-[#2bee6c]"
                                  : "bg-[#9db9b0]/10 text-[#9db9b0]"
                              }`}
                            >
                              {recipient.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#9db9b0] hover:text-white p-1"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9db9b0]">Total Paid</span>
                        <span className="font-bold">${recipient.totalPaid.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9db9b0]">Payments</span>
                        <span className="font-medium">{recipient.paymentsCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#9db9b0]">Last Payment</span>
                        <span className="text-xs font-medium text-[#5c7d72]">{recipient.lastPayment}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#283933] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-[#9db9b0]">Wallet</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-mono text-white">{recipient.wallet}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto text-[#9db9b0] hover:text-[#2bee6c]"
                            onClick={() => copyToClipboard(recipient.wallet, "Wallet address")}
                          >
                            <Copy size={12} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-[#9db9b0]">Public Key</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-mono text-white">{recipient.publicKey}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto text-[#9db9b0] hover:text-[#2bee6c]"
                            onClick={() => copyToClipboard(recipient.publicKey, "Public key")}
                          >
                            <Copy size={12} />
                          </Button>
                        </div>
                      </div>
                      {recipient.email && (
                        <div className="flex items-center gap-2 text-xs text-[#5c7d72]">
                          <Mail size={12} />
                          {recipient.email}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#283933] text-white hover:bg-[#1c2723]"
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#9db9b0] hover:text-white hover:bg-[#1c2723]"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredRecipients.length === 0 && (
              <Card className="bg-[#1c2723] border-[#283933] p-12 text-center">
                <Users className="mx-auto mb-4 text-[#9db9b0]" size={48} />
                <h3 className="text-xl font-bold mb-2">No recipients found</h3>
                <p className="text-[#9db9b0] mb-6">
                  {searchQuery ? "Try adjusting your search" : "Add your first recipient to get started"}
                </p>
                <Button
                  variant="default"
                  className="bg-[#2bee6c] text-black hover:bg-[#24cc59]"
                  onClick={() => setShowAddRecipient(true)}
                >
                  <UserPlus size={16} className="mr-2" />
                  Add Recipient
                </Button>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
