"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Shield,
  KeyRound,
  Loader2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

const providers = [
  {
    name: "Phantom",
    accent: "text-[#AB9FF2] border-[#AB9FF2]/20 bg-[#AB9FF2]/10",
    chip: "Recommended",
  },
  {
    name: "Solflare",
    accent: "text-[#FC8D4D] border-[#FC8D4D]/20 bg-[#FC8D4D]/10",
  },
  {
    name: "Backpack",
    accent: "text-[#E33E3F] border-[#E33E3F]/20 bg-[#E33E3F]/10",
  },
  {
    name: "Sollet",
    accent: "text-[#00D4AA] border-[#00D4AA]/20 bg-[#00D4AA]/10",
  },
];

type Role = "sender" | "recipient";

export default function ConnectPage() {
  const router = useRouter();
  const { connected, role, connect } = useWallet();
  const [selectedRole, setSelectedRole] = useState<Role>("sender");
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const header = useMemo(
    () =>
      selectedRole === "sender"
        ? { title: "Connect as Sender", copy: "Send encrypted payroll to your team." }
        : { title: "Connect as Recipient", copy: "Decrypt and verify your payroll." },
    [selectedRole]
  );

  const handleConnect = async (providerName: string) => {
    setLoadingProvider(providerName);
    try {
      await connect(selectedRole);
      toast.success(`Connected as ${selectedRole}`);
      // Route to role-specific dashboard
      const dashboardPath = selectedRole === "sender" ? "/sender/dashboard" : "/recipient/dashboard";
      router.replace(dashboardPath);
    } catch (error) {
      toast.error("Unable to connect right now");
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b1110] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 flex flex-col blur-[6px] opacity-40 pointer-events-none select-none overflow-hidden bg-[#0c0c0c]">
        <header className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#2bee6c]/20 flex items-center justify-center text-[#2bee6c]">
              <Shield size={18} />
            </div>
            <div className="font-bold text-lg tracking-tight text-white/80">
              StealthPay <span className="text-xs font-normal text-white/40 ml-1">v2.0</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <div className="h-9 w-24 bg-white/5 rounded border border-white/5" />
            <div className="h-9 w-9 bg-white/5 rounded-full border border-white/5" />
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-60 border-r border-white/10 bg-[#111111] flex flex-col p-4 gap-2">
            <div className="h-10 w-full bg-white/5 rounded flex items-center px-3 gap-3" />
            <div className="h-10 w-full bg-transparent rounded flex items-center px-3 gap-3 opacity-50" />
            <div className="h-10 w-full bg-transparent rounded flex items-center px-3 gap-3 opacity-50" />
          </aside>
          <main className="flex-1 p-8 bg-[#0b1110]/70 flex flex-col gap-6">
            <div className="flex items-end justify-between">
              <div className="h-8 w-48 bg-white/10 rounded" />
              <div className="h-8 w-32 bg-[#2bee6c]/20 rounded" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-32 border border-white/5 rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br from-white/5 to-white/0"
                >
                  <div className="h-8 w-8 bg-white/10 rounded-full" />
                  <div className="h-4 w-24 bg-white/10 rounded" />
                </div>
              ))}
            </div>
            <div className="flex-1 border border-white/5 rounded-xl p-6 bg-white/5">
              <div className="space-y-3">
                <div className="h-10 w-full bg-white/5 rounded border-b border-white/5" />
                <div className="h-8 w-full bg-white/5 rounded opacity-60" />
                <div className="h-8 w-full bg-white/5 rounded opacity-40" />
                <div className="h-8 w-full bg-white/5 rounded opacity-30" />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex h-full min-h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-[440px] flex flex-col bg-[#0f1312] rounded-xl border border-[#1e2a27] shadow-2xl overflow-hidden ring-1 ring-white/5">
          <div className="flex items-center justify-between p-6 pb-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-[#2bee6c]/20 text-[#2bee6c] flex items-center justify-center border border-[#2bee6c]/30">
                <Wallet size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">{header.title}</h2>
                <p className="text-xs text-[#9db9b0]">{header.copy}</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-[#9db9b0] hover:text-white transition-colors rounded hover:bg-white/5 p-1.5"
            >
              <ArrowLeft size={18} />
            </Link>
          </div>
          <p className="px-6 text-sm text-[#9db9b0] mb-4 font-medium">
            Select a provider to access the dashboard. Choose your role to tailor the experience.
          </p>

          {/* Role switcher */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {["sender", "recipient"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r as Role)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-colors ${
                    selectedRole === r
                      ? "border-[#2bee6c]/60 bg-[#2bee6c]/10 text-white"
                      : "border-[#1e2a27] bg-[#111816] text-[#9db9b0] hover:border-[#2bee6c]/30"
                  }`}
                >
                  <span className="capitalize">{r}</span>
                  {selectedRole === r ? <ShieldCheck size={16} className="text-[#2bee6c]" /> : <Sparkles size={14} />}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-[#5c7d72]">
              Sender can issue payroll batches; Recipient can decrypt and view slips.
            </p>
          </div>

          {/* Providers */}
          <div className="flex flex-col px-4 gap-2.5">
            {providers.map((provider) => (
              <button
                key={provider.name}
                type="button"
                onClick={() => handleConnect(provider.name)}
                className="group flex items-center justify-between p-3.5 rounded-lg bg-[#151e1b] border border-[#1e2a27] hover:border-[#2bee6c] hover:bg-[#1a2421] transition-all duration-200 w-full text-left relative overflow-hidden"
                disabled={!!loadingProvider}
              >
                <div className="flex items-center gap-3.5 relative z-10">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${provider.accent} border`}>
                    <KeyRound size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-white">{provider.name}</span>
                    {/* <span className="text-xs text-[#5c7d72]">Connect with {selectedRole}</span> */}
                  </div>
                </div>
                <div className="flex items-center gap-3 relative z-10 text-xs text-[#9db9b0]">
                  {provider.chip && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#2bee6c]/10 text-[#2bee6c] border border-[#2bee6c]/20">
                      {provider.chip}
                    </span>
                  )}
                  {loadingProvider === provider.name ? (
                    <Loader2 size={18} className="animate-spin text-[#2bee6c]" />
                  ) : (
                    <ChevronRight size={18} className="text-[#5c7d72] group-hover:text-[#2bee6c]" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3 border border-white/5">
              <ShieldCheck className="text-[#2bee6c]" size={16} />
              <p className="text-[11px] leading-5 text-[#9db9b0] font-medium">
                We never store your private keys. Transactions are signed locally. By connecting you agree to the Terms of Service.
              </p>
            </div>
            <div className="flex justify-between items-center text-xs text-[#9db9b0]">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft size={14} />
                Back to home
              </Link>
              {connected && role ? (
                <Button
                  size="sm"
                  className="bg-[#2bee6c] text-[#0b1110] hover:bg-emerald-400"
                  onClick={() => router.replace("/dashboard")}
                >
                  Continue to dashboard
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              ) : (
                <span className="text-[#5c7d72]">Connect to continue to dashboard</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
