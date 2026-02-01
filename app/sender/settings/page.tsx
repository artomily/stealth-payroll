"use client";

import React from "react";
import {
  Lock,
  Wallet,
  Copy,
  Power,
  Contrast,
  Coins,
  ShieldCheck,
  BellRing,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useWallet } from "@/contexts/WalletContext";
import { formatWalletAddress } from "@/lib/solana-mock";
import { Sidebar } from "@/components/Sidebar";

const toggleOptions = [
  {
    title: "Default Privacy Mode",
    description: "Automatically mask all amounts and recipient addresses in the dashboard view.",
    defaultChecked: true,
  },
  {
    title: "ZKP Verification Notifications",
    description: "Receive alerts when Zero-Knowledge Proofs are successfully verified on-chain.",
    defaultChecked: true,
  },
  {
    title: "Two-Factor Authentication",
    description: "Require 2FA signature for batches larger than $10,000.",
    defaultChecked: false,
  },
];

export default function SettingsPage() {
  const { connected, address, connect, disconnect } = useWallet();

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
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
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black tracking-[-0.02em]">Privacy & Security Settings</h1>
              <p className="text-[#9db9b0]">Manage your stealth payroll preferences, wallet permissions, and display options.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden sm:flex text-[#9db9b0] hover:text-white">
                <BellRing size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-[#9db9b0] hover:text-white">
                <HelpCircle size={18} />
              </Button>
              {connected ? (
                <div className="flex items-center gap-3 rounded bg-[#1c2723] px-3 py-2 border border-[#283933]">
                  <div className="h-2 w-2 rounded-full bg-[#2bee6c]"></div>
                  <span className="text-sm font-mono">{formatWalletAddress(address!)}</span>
                  <Button variant="ghost" size="icon" className="text-[#9db9b0] hover:text-white" onClick={copyAddress}>
                    <Copy size={16} />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => connect("sender")} className="bg-[#2bee6c] text-[#111816] hover:bg-emerald-400">
                  <Wallet size={16} className="mr-2" /> Connect Wallet
                </Button>
              )}
            </div>
          </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-[-0.02em]">Privacy & Security Settings</h1>
              <p className="text-[#9db9b0]">Manage your stealth payroll preferences, wallet permissions, and display options.</p>
            </div>

            <section className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#9db9b0] flex items-center gap-2">
                <Lock size={16} /> Privacy Configuration
              </h3>
              <Card className="bg-[#1c2723] border-[#283933] divide-y divide-[#283933]">
                {toggleOptions.map((toggle) => (
                  <CardContent key={toggle.title} className="p-6 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{toggle.title}</span>
                      <span className="text-sm text-[#9db9b0]">{toggle.description}</span>
                    </div>
                    <Switch defaultChecked={toggle.defaultChecked} />
                  </CardContent>
                ))}
              </Card>
            </section>

            <section className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#9db9b0] flex items-center gap-2">
                <Wallet size={16} /> Wallet & Permissions
              </h3>
              <Card className="bg-[#1c2723] border-[#283933] overflow-hidden">
                <CardContent className="p-6 border-b border-[#283933] flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-[#2bee6c] flex items-center justify-center text-white shadow-lg">
                      <Wallet size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[#9db9b0] uppercase font-bold">Connected Wallet</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg">{connected && address ? formatWalletAddress(address) : "Not connected"}</span>
                        <Button variant="ghost" size="icon" className="text-[#9db9b0] hover:text-white" onClick={copyAddress}>
                          <Copy size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {connected ? (
                    <Button
                      variant="outline"
                      className="text-red-400 border-[#283933] hover:border-red-400/40 hover:text-red-200"
                      onClick={disconnect}
                    >
                      <Power size={16} className="mr-2" /> Disconnect
                    </Button>
                  ) : (
                    <Button onClick={() => connect("sender")} className="bg-[#2bee6c] text-[#111816] hover:bg-emerald-400">
                      <Wallet size={16} className="mr-2" /> Connect Wallet
                    </Button>
                  )}
                </CardContent>

                <CardContent className="p-6 bg-[#111816]/40 space-y-3">
                  <h4 className="text-sm font-bold mb-2">Active Permissions</h4>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 rounded border border-[#283933] bg-[#111816]">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-blue-500/10 text-blue-500">
                          <Coins size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">USDC Spending Cap</p>
                          <p className="text-xs text-[#9db9b0]">Unlimited</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-[#9db9b0] hover:text-white underline decoration-dashed">Revoke</button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-[#283933] bg-[#111816]">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-[#2bee6c]/10 text-[#2bee6c]">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Payroll Batch Signing</p>
                          <p className="text-xs text-[#9db9b0]">Auto-sign &lt; 1000 USDC</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-[#9db9b0] hover:text-white underline decoration-dashed">Revoke</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="flex flex-col gap-4 pb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#9db9b0] flex items-center gap-2">
                <Sparkles size={16} /> Display Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-[#1c2723] border-[#283933]">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <Contrast className="text-[#9db9b0]" size={22} />
                      <Switch />
                    </div>
                    <div>
                      <h4 className="font-bold">High Contrast Mode</h4>
                      <p className="text-sm text-[#9db9b0] mt-1">Increase visibility of borders and text.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#1c2723] border-[#283933]">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <Coins className="text-[#9db9b0]" size={22} />
                      <span className="text-xs font-bold text-[#2bee6c] uppercase tracking-wider">Saved</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3">Preferred Currency</h4>
                      <div className="flex bg-[#111816] p-1 rounded border border-[#283933]">
                        <button className="flex-1 py-1.5 px-3 rounded bg-[#1c2723] text-white text-xs font-bold border border-[#283933]/50">USDC</button>
                        <button className="flex-1 py-1.5 px-3 rounded text-[#9db9b0] hover:text-white text-xs font-medium">SOL</button>
                        <button className="flex-1 py-1.5 px-3 rounded text-[#9db9b0] hover:text-white text-xs font-medium">USDT</button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <Button variant="outline" className="border-[#283933] text-[#9db9b0] hover:text-white">Reset to Defaults</Button>
                <Button className="bg-[#2bee6c] text-[#111816] hover:bg-emerald-400 shadow-lg shadow-[#2bee6c]/20">
                  Save Changes
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
