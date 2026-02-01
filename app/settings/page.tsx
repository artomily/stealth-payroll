"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";

export default function SettingsRedirect() {
  const router = useRouter();
  const { connected, role } = useWallet();

  useEffect(() => {
    if (!connected) {
      router.replace("/connect");
    } else if (role === "sender") {
      router.replace("/sender/settings");
    } else if (role === "recipient") {
      router.replace("/recipient/settings");
    } else {
      router.replace("/connect");
    }
  }, [connected, role, router]);

  return (
    <div className="min-h-screen bg-[#000] flex items-center justify-center">
      <div className="text-white">Redirecting...</div>
    </div>
  );
}
