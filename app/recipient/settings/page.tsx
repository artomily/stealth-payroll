"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings as SettingsIcon,
  Shield,
  Lock,
  Copy,
  CheckCircle2,
  Eye,
  EyeOff,
  Bell,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

export default function RecipientSettingsPage() {
  const router = useRouter();
  const { connected, address, role, publicKeyBase64 } = useWallet();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [showPublicKey, setShowPublicKey] = useState(false);

  useEffect(() => {
    if (!connected) {
      router.replace("/connect");
    } else if (role !== "recipient") {
      router.replace("/sender/settings");
    }
  }, [connected, role, router]);

  const handleCopyPublicKey = () => {
    if (publicKeyBase64) {
      navigator.clipboard.writeText(publicKeyBase64);
      toast.success("Public key copied to clipboard");
    }
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Wallet address copied");
    }
  };

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
          <div className="max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center size-10 rounded bg-[#2bee6c]/20 text-[#2bee6c]">
                <SettingsIcon size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#5c7d72]">Recipient</p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">Settings</h1>
              </div>
            </div>

            <div className="space-y-6">
              {/* Wallet Information */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-[#2bee6c]" />
                    Wallet Information
                  </CardTitle>
                  <CardDescription>Your connected wallet details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#9db9b0]">Wallet Address</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-3 bg-black/40 rounded-lg border border-white/10 font-mono text-sm">
                        {address}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyAddress}
                        className="border-[#2bee6c]/20 text-[#2bee6c] hover:bg-[#2bee6c]/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-[#9db9b0]">Public Encryption Key</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPublicKey(!showPublicKey)}
                        className="text-xs"
                      >
                        {showPublicKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-3 bg-black/40 rounded-lg border border-white/10 font-mono text-xs break-all">
                        {showPublicKey
                          ? publicKeyBase64 || "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."
                          : "••••••••••••••••••••••••••••••••••••••"}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyPublicKey}
                        className="border-[#2bee6c]/20 text-[#2bee6c] hover:bg-[#2bee6c]/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-[#5c7d72] flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Share this key with your employer to receive encrypted payroll
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bell className="w-5 h-5 text-[#2bee6c]" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage how you receive payment notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-[#9db9b0]" />
                      <div>
                        <p className="font-medium">Payment Notifications</p>
                        <p className="text-sm text-[#9db9b0]">
                          Get notified when you receive payments
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationsEnabled ? "bg-[#2bee6c]" : "bg-[#283933]"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationsEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#9db9b0]" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-[#9db9b0]">Receive email updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailNotifications ? "bg-[#2bee6c]" : "bg-[#283933]"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailNotifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-[#2bee6c]" />
                    Security Status
                  </CardTitle>
                  <CardDescription>Your account security information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#2bee6c]" />
                    <span>Wallet Connected</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#2bee6c]" />
                    <span>Encryption Key Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#2bee6c]" />
                    <span>End-to-End Encryption Enabled</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
