"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  Users,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "History", href: "/dashboard", icon: History },
  { label: "Recipients", href: "/dashboard", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Audit Logs", href: "/dashboard", icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();

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

      <div className="mt-auto px-4 pt-6">
        <div className="p-4 rounded bg-[#1c2723] border border-[#283933]">
          <p className="text-xs text-[#9db9b0] mb-2">Current Plan</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-white">Pro Privacy</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2bee6c]/20 text-[#2bee6c] font-bold">Active</span>
          </div>
          <div className="w-full bg-[#111816] rounded-full h-1.5 mb-2">
            <div className="bg-[#2bee6c] h-1.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
          <div className="text-[10px] text-[#9db9b0] flex items-center gap-1">
            <Sparkles size={12} />
            <span>75% of ZK-proof limit used</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
