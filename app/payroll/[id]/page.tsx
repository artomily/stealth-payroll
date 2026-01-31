"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Shield,
  Lock,
  Wallet,
  ChevronRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  DollarSign,
  FileText,
  Clock,
  ExternalLink,
  Download,
  Users,
  Fuel,
  BarChart3,
  Info,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { useWallet } from "@/contexts/WalletContext";
import { formatWalletAddress } from "@/lib/solana-mock";
import { toast } from "sonner";

type Recipient = {
  id: string;
  address: string;
  encryptedAmount: string;
  amount: string;
  encryptedHash: string;
  status: string;
  avatar: string;
};

const PayrollDetailPage = () => {
  const params = useParams();
  const batchId = Array.isArray(params?.id) ? params.id[0] : params?.id ?? "–";
  const { connected, address, connect } = useWallet();
  const [showAmounts, setShowAmounts] = useState(false);

  // Mock data for the batch - in a real app, this would be fetched based on the ID
  const batchData = {
    id: batchId,
    processedAt: "Oct 24, 2023 14:02 UTC",
    totalPaid: 45200.0,
    currency: "USDC-SPL",
    status: "Settled",
    recipientCount: 24,
    gasUsed: "0.000025 SOL",
    relayerHash: "0x8a92...b71c",
    zkProofStatus: "Verified",
    shieldingLevel: "Maximum / Pool 3",
    encryptionType: "AES-256-GCM + zkSNARK",
    recipients: [
      {
        id: "9021",
        address: "0x7a...4b9",
        encryptedAmount: "••••••••••",
        amount: "$4,200.00",
        encryptedHash: "0x1b...",
        status: "Sent",
        avatar: "from-purple-500 to-blue-500",
      },
      {
        id: "8832",
        address: "0x44...9a2",
        encryptedAmount: "••••••••••",
        amount: "$3,850.00",
        encryptedHash: "0x8f...",
        status: "Sent",
        avatar: "from-pink-500 to-orange-500",
      },
      {
        id: "1029",
        address: "0x31...b41",
        encryptedAmount: "••••••••••",
        amount: "$6,125.00",
        encryptedHash: "0x2c...",
        status: "Sent",
        avatar: "from-teal-500 to-emerald-500",
      },
      {
        id: "4451",
        address: "0x9e...f12",
        encryptedAmount: "••••••••••",
        amount: "$2,970.00",
        encryptedHash: "0x5a...",
        status: "Sent",
        avatar: "from-blue-600 to-indigo-600",
      },
      {
        id: "7721",
        address: "0x2d...c88",
        encryptedAmount: "••••••••••",
        amount: "$7,540.00",
        encryptedHash: "0x9d...",
        status: "Sent",
        avatar: "from-yellow-500 to-red-500",
      },
    ] as Recipient[],
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Unable to copy right now");
    }
  };

  const handleExport = () => {
    toast.success("Export started - CSV will download soon");
  };

  return (
    <div className="min-h-screen bg-[#0b1110]">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-[#0b1110] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 text-sm text-[#9db9b0]">
              <Link href="/dashboard" className="hover:text-[#2bee6c] transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <Link href="/dashboard" className="hover:text-[#2bee6c] transition-colors">
                Payroll History
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">Batch #{batchId}</span>
            </nav>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" asChild className="text-[#9db9b0] hover:text-white p-2">
                    <Link href="/dashboard">
                      <ArrowLeft size={18} />
                    </Link>
                  </Button>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5c7d72]">Payroll Batch</p>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">Batch #{batchId} Details</h1>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#9db9b0] text-sm">
                  <Clock size={16} />
                  <p>Processed on {batchData.processedAt}</p>
                  <span className="text-[#2bee6c] flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    {batchData.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-[#283933] text-[#9db9b0] hover:text-white hover:bg-[#1c2723]"
                  onClick={() => setShowAmounts((prev) => !prev)}
                >
                  {showAmounts ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="ml-2 text-sm">{showAmounts ? "Hide amounts" : "Reveal amounts"}</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-[#283933] text-white hover:bg-[#1c2723]"
                  onClick={handleExport}
                >
                  <Download size={16} className="mr-2" />
                  Export CSV
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

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Total Paid</p>
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight">
                        ${batchData.totalPaid.toLocaleString()}
                        <span className="text-sm font-normal text-[#9db9b0] ml-1">{batchData.currency}</span>
                      </p>
                      <p className="text-xs text-[#5c7d72] mt-1">Across all recipients</p>
                    </div>
                    <DollarSign className="text-[#2bee6c]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Status</p>
                  <div className="flex items-center gap-2 pt-3 text-lg font-bold">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2bee6c] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2bee6c]" />
                    </span>
                    <span>{batchData.status}</span>
                  </div>
                  <p className="text-xs text-[#5c7d72] mt-1">ZK proof verified</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Recipients</p>
                  <div className="flex items-center justify-between pt-3">
                    <p className="text-2xl font-bold tracking-tight">{batchData.recipientCount}</p>
                    <Users className="text-[#2bee6c]" />
                  </div>
                  <p className="text-xs text-[#5c7d72] mt-1">All transfers confirmed</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1c2723] border-[#283933]">
                <CardContent className="p-5">
                  <p className="text-xs uppercase text-[#9db9b0] tracking-[0.18em]">Gas Used</p>
                  <div className="flex items-center justify-between pt-3">
                    <p className="text-2xl font-bold tracking-tight">{batchData.gasUsed}</p>
                    <Fuel className="text-[#2bee6c]" />
                  </div>
                  <p className="text-xs text-[#5c7d72] mt-1">Relayed via shielded pool</p>
                </CardContent>
              </Card>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Recipients */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <BarChart3 className="text-[#2bee6c]" size={20} />
                    Payroll Recipients
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#9db9b0] uppercase font-mono">
                    <Lock size={14} />
                    Encrypted View
                  </div>
                </div>

                <Card className="bg-[#1c2723] border-[#283933] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#151e1b] border-b border-[#283933] text-[#9db9b0] text-xs uppercase">
                          <th className="px-6 py-4">Recipient</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#283933]">
                        {batchData.recipients.map((recipient) => (
                          <tr key={recipient.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`size-9 rounded-full bg-gradient-to-br ${recipient.avatar} shrink-0`} />
                                <div className="flex flex-col">
                                  <span className="font-mono text-sm group-hover:text-[#2bee6c] transition-colors">
                                    {recipient.address}
                                  </span>
                                  <span className="text-xs text-[#9db9b0]">Recipient #{recipient.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 font-mono text-sm text-[#9db9b0]">
                                {showAmounts ? recipient.amount : recipient.encryptedAmount}
                                <span className="text-[#5c7d72] text-xs">{recipient.encryptedHash}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="inline-flex items-center gap-1.5 rounded bg-[#2bee6c]/10 px-2.5 py-1 text-xs font-medium text-[#2bee6c] border border-[#2bee6c]/20">
                                <CheckCircle2 size={14} />
                                {recipient.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#283933] bg-[#151e1b] px-6 py-3 text-xs text-[#9db9b0]">
                    <p>Showing {batchData.recipients.length} of {batchData.recipientCount} recipients</p>
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

              {/* Encryption metadata */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Shield className="text-[#2bee6c]" size={20} />
                    Encryption Metadata
                  </h3>
                </div>

                <Card className="bg-[#1c2723] border-[#283933] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#2bee6c]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-4 pb-6 border-b border-[#283933]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2bee6c]/10 text-[#2bee6c] border border-[#2bee6c]/20">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <p className="text-[#9db9b0] text-xs uppercase font-bold tracking-wider">ZK-Proof Status</p>
                        <p className="text-white font-bold text-lg flex items-center gap-2">
                          {batchData.zkProofStatus}
                          <CheckCircle2 className="text-[#2bee6c]" size={20} />
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[#9db9b0] text-sm">
                          <Shield size={16} />
                          Shielding Level
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{batchData.shieldingLevel}</span>
                          <div className="flex gap-1">
                            <div className="h-1.5 w-6 rounded-full bg-[#2bee6c]" />
                            <div className="h-1.5 w-6 rounded-full bg-[#2bee6c]" />
                            <div className="h-1.5 w-6 rounded-full bg-[#2bee6c]" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[#9db9b0] text-sm">
                          <FileText size={16} />
                          Relayer Hash
                        </div>
                        <div className="flex items-center gap-2 rounded bg-[#111816] border border-[#283933] px-3 py-2">
                          <span className="text-[#9db9b0] font-mono text-xs truncate">{batchData.relayerHash}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto p-1 text-[#2bee6c] hover:text-white"
                            onClick={() => copyToClipboard(batchData.relayerHash)}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[#9db9b0] text-sm">
                          <Lock size={16} />
                          Encryption Type
                        </div>
                        <span className="text-white font-mono text-sm">{batchData.encryptionType}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-[#283933] text-white hover:bg-white/5">
                      View on Explorer
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#1c2723] border-[#283933]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Info className="text-[#9db9b0] mt-0.5 shrink-0" size={16} />
                      <div className="space-y-1">
                        <p className="text-white text-sm font-bold">Privacy Note</p>
                        <p className="text-[#9db9b0] text-xs leading-relaxed">
                          Amounts are encrypted on-chain. Only the sender and recipient can decrypt the values. The total batch sum is
                          publicly verifiable via the ZK proof.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PayrollDetailPage;