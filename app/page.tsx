"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  EyeOff, 
  Zap, 
  ArrowRight, 
  Wallet, 
  Github, 
  Twitter,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ children }: { children: React.ReactNode }) => (
    <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
      {children}
    </a>
  );

  const features = [
    {
      icon: <Shield className="text-green-500" />,
      title: "Asymmetric Encryption",
      description: "Salary data is encrypted with the employee's public key. Only their private key can reveal the contents."
    },
    {
      icon: <EyeOff className="text-green-400" />,
      title: "Obfuscated Amounts",
      description: "Block explorers show the transfer, but our stealth layer hides the metadata and breakdown from public view."
    },
    {
      icon: <Zap className="text-green-600" />,
      title: "Instant Verifiability",
      description: "Smart contracts verify payroll without revealing sensitive details. Full transparency, zero data leaks."
    },
    {
      icon: <CreditCard className="text-green-400" />,
      title: "Flexible Payments",
      description: "Support for various token types and custom payment schedules. Employers maintain full control."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Stealth Payroll</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <NavItem>Features</NavItem>
              <NavItem>Security</NavItem>
              <NavItem>Docs</NavItem>
              <NavItem>About</NavItem>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden pb-4 space-y-3"
              >
                <NavItem>Features</NavItem>
                <NavItem>Security</NavItem>
                <NavItem>Docs</NavItem>
                <NavItem>About</NavItem>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Stealth Payroll
              </span>
              <br />
              <span className="text-slate-200">Private by Design</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Zero-knowledge salary management on Solana. End-to-end encrypted payroll that stays private on-chain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => router.push('/dashboard')}
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 hover:bg-slate-900 text-white"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powered by Cryptography</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built with industry-standard encryption to keep salary data private and secure
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Built for Hackathons</h2>
              <p className="text-slate-400 mb-6">
                This is a demonstration MVP showcasing privacy-first payroll on Solana.
              </p>
              <ul className="space-y-4">
                {['End-to-end encryption', 'Zero-knowledge proofs', 'On-chain verification', 'Open source'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 border border-slate-700">
              <div className="mb-6">
                <div className="text-5xl font-bold mb-2">Demo</div>
                <p className="text-slate-400">Hackathon MVP</p>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => router.push('/employer')}>
                Try Employer Dashboard
              </Button>
              <Button 
                className="w-full mt-3 bg-slate-700 hover:bg-slate-600 text-white" 
                onClick={() => router.push('/employee')}
              >
                Try Employee Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Social</h3>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white"><Github size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            © 2024 Private Payroll. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
