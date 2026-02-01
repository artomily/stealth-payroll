"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  Users,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWallet } from "@/contexts/WalletContext";

const senderNavItems = [
  { label: "Dashboard", href: "/sender/dashboard", icon: LayoutDashboard },
  { label: "History", href: "/sender/history", icon: History },
  { label: "Recipients", href: "/sender/recipients", icon: Users },
  { label: "Settings", href: "/sender/settings", icon: Settings },
];

const recipientNavItems = [
  { label: "Dashboard", href: "/recipient/dashboard", icon: LayoutDashboard },
  { label: "History", href: "/recipient/history", icon: History },
  { label: "Settings", href: "/recipient/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useWallet();
  
  const navItems = role === "sender" ? senderNavItems : recipientNavItems;

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-[#283933] bg-[#111816] pt-6 pb-6">
      <div className="flex items-center gap-3 px-4 pb-6">
        <div className="flex items-center justify-center size-9 rounded bg-[#2bee6c]/20 text-[#2bee6c]">
          <ShieldCheck size={18} />
        </div>
        <div>
          <p className="text-white font-bold leading-tight">DeFi Payroll</p>
          <p className="text-xs text-[#9db9b0]">Stealth mode</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded transition-colors border border-transparent",
                active
                  ? "bg-[#2bee6c]/10 text-white border-[#2bee6c]/20"
                  : "text-[#9db9b0] hover:text-white hover:bg-[#1c2723]"
              )}
            >
              <Icon className={cn("w-5 h-5", active ? "text-[#2bee6c]" : "text-[#9db9b0]")} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
