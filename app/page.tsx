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

  const features = [
    {
      icon: <Shield className="text-green-500" />,
      title: "Military-Grade Encryption",
      description: "TweetNaCl implementation with Curve25519-XSalsa20-Poly1305 ensures payment data remains confidential. Only recipients can decrypt their payment information."
    },
    {
      icon: <EyeOff className="text-green-400" />,
      title: "Complete Privacy",
      description: "Payment amounts and details are encrypted on-chain. Block explorers show the transaction, but sensitive financial data stays private."
    },
    {
      icon: <Zap className="text-green-600" />,
      title: "Instant Settlement",
      description: "USDC payments on Solana deliver sub-second finality with minimal fees. Real-time transfers with cryptographic proof of payment."
    },
    {
      icon: <Lock className="text-green-400" />,
      title: "Forward Secrecy",
      description: "Ephemeral keypairs generated per transaction ensure past payments remain secure even if future keys are compromised."
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
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Stealth Payroll</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">How It Works</a>
              <a href="#technology" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">Technology</a>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => router.push('/connect')}
              >
                Launch App
              </Button>
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
                <a href="#features" className="block text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">Features</a>
                <a href="#how-it-works" className="block text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">How It Works</a>
                <a href="#technology" className="block text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">Technology</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10 text-center">
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
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
              Enterprise-grade encrypted payroll on Solana blockchain. Military-grade cryptography ensures complete financial privacy with instant USDC settlements.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                onClick={() => router.push('/connect')}
              >
                Launch App <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise-Grade Security</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built on audited cryptographic primitives and battle-tested blockchain infrastructure
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Solana Section */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-slate-900/30 to-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Solana?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Stealth Payroll can only exist on Solana. Here's why this privacy solution is uniquely Solana-native.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Sub-Second Finality</h3>
                <p className="text-slate-400 mb-4">
                  Solana's 400ms block time enables instant private salary settlements. Employees receive encrypted payments in real-time, not minutes or hours.
                </p>
                <div className="text-sm text-green-400 font-mono">
                  Private Payment → Encrypted → Confirmed &lt; 1s
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Ultra-Low Fees</h3>
                <p className="text-slate-400 mb-4">
                  ~$0.00025 per transaction makes micro-payroll feasible. Send encrypted payments to hundreds of employees without prohibitive costs.
                </p>
                <div className="text-sm text-green-400 font-mono">
                  100 employees × $0.00025 = $0.025 total
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Token Extensions (Token-2022)</h3>
                <p className="text-slate-400 mb-4">
                  Solana's Token-2022 program includes confidential transfers. Our architecture is ready to integrate native confidential USDC when available.
                </p>
                <div className="text-sm text-purple-400 font-mono">
                  Future: Native Confidential Transfers
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">High Throughput</h3>
                <p className="text-slate-400 mb-4">
                  65,000 TPS capacity allows batch processing of thousands of encrypted payroll transactions simultaneously without network congestion.
                </p>
                <div className="text-sm text-blue-400 font-mono">
                  Scale to enterprise payroll volumes
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Three simple steps to secure, private payroll on Solana
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 h-full">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-green-400">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Connect Wallet</h3>
                  <p className="text-slate-400 text-sm">
                    Connect your Solana wallet and choose your role - sender for creating payments or recipient for receiving them. Each wallet generates a unique encryption keypair.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 h-full">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-green-400">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Create Payment</h3>
                  <p className="text-slate-400 text-sm">
                    Enter payment details and recipient's public key. Payment data is encrypted with TweetNaCl using the recipient's public key - only they can decrypt it.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 h-full">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-green-400">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Instant Settlement</h3>
                  <p className="text-slate-400 text-sm">
                    USDC is transferred on Solana with encrypted metadata. Transaction is recorded on-chain but payment details remain private and secure.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section - Selective Disclosure */}
      <section className="py-20 relative z-10 bg-slate-900/30">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-6">
                  🚀 Innovation Feature
                </div>
                <h2 className="text-4xl font-bold mb-6">Selective Disclosure</h2>
                <p className="text-slate-400 mb-6">
                  Revolutionary privacy feature that enables cryptographic proof of payment ranges without revealing exact amounts. Perfect for compliance and verification scenarios.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle2 className="text-green-500 w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Range Proofs</h3>
                      <p className="text-slate-400 text-sm">Generate cryptographic proof: "Salary is between $50k-$100k" without revealing exact amount</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle2 className="text-green-500 w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Compliance Ready</h3>
                      <p className="text-slate-400 text-sm">Satisfy audit requirements while maintaining employee privacy</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle2 className="text-green-500 w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Zero-Knowledge Proofs</h3>
                      <p className="text-slate-400 text-sm">Verify payment legitimacy without exposing sensitive details</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-8 border border-green-500/30">
                  <h3 className="text-xl font-bold mb-6">Example Use Cases</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700">
                      <div className="text-sm text-green-400 mb-2">🏦 Loan Application</div>
                      <p className="text-slate-300 text-sm mb-2">"Prove income &gt; $60,000"</p>
                      <div className="text-xs text-slate-500">Without revealing: $75,432.18</div>
                    </div>
                    <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700">
                      <div className="text-sm text-green-400 mb-2">📊 Equity Verification</div>
                      <p className="text-slate-300 text-sm mb-2">"Confirm salary in market range"</p>
                      <div className="text-xs text-slate-500">Without revealing: $132,500</div>
                    </div>
                    <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700">
                      <div className="text-sm text-green-400 mb-2">✅ Compliance Audit</div>
                      <p className="text-slate-300 text-sm mb-2">"Verify minimum wage compliance"</p>
                      <div className="text-xs text-slate-500">Without revealing: Individual amounts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Why Choose Stealth Payroll?</h2>
                <p className="text-slate-400 mb-8">
                  Traditional blockchain payments expose sensitive financial information. Stealth Payroll combines the transparency of blockchain with the privacy your business needs.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Protect Sensitive Data</h3>
                      <p className="text-slate-400 text-sm">Salary amounts and payment details never exposed publicly on blockchain explorers</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Maintain Compliance</h3>
                      <p className="text-slate-400 text-sm">On-chain proof of payment for audits while keeping compensation private</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Reduce Costs</h3>
                      <p className="text-slate-400 text-sm">Minimal fees on Solana (~$0.00025 per transaction) compared to traditional payment processors</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Instant Global Payments</h3>
                      <p className="text-slate-400 text-sm">Pay anyone, anywhere in the world in seconds with USDC stablecoin</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-8 border border-green-500/20">
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-400">Traditional Blockchain</span>
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Public</span>
                      </div>
                      <div className="text-2xl font-bold text-red-400">$5,000.00</div>
                      <p className="text-xs text-slate-500 mt-2">Visible to everyone on block explorer</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-green-500/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-400">Stealth Payroll</span>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Encrypted</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">•••••••••</div>
                      <p className="text-xs text-slate-500 mt-2">Only recipient can decrypt amount</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="technology" className="py-20 relative z-10 bg-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built with Modern Tech</h2>
            <p className="text-slate-400 w-full">
              Leveraging cutting-edge blockchain and cryptography technologies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.508 7.588c1.046.487 1.757 1.597 1.757 2.872 0 1.762-1.428 3.19-3.19 3.19h-2.023v3.562H10.78V7.588h4.672z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Built on Solana</h3>
              <p className="text-slate-400 text-sm mb-4">
                USDC payments with fast, low-cost transactions on Solana. Connect with Phantom or Solflare wallets for secure access.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">Web3.js</span>
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">USDC</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">TweetNaCl Encryption</h3>
              <p className="text-slate-400 text-sm mb-4">
                Military-grade asymmetric encryption using Curve25519 and XSalsa20-Poly1305
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">Ed25519</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">NaCl Box</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Next.js 15 & React</h3>
              <p className="text-slate-400 text-sm mb-4">
                Modern web framework with server components and optimized performance
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">TypeScript</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">Tailwind</span>
              </div>
            </motion.div>
          </div>

          {/* Technology Integration */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Technology Integration</h3>
            <p className="text-slate-400 mb-8 max-w-3xl mx-auto">
              Stealth Payroll is architected to leverage cutting-edge privacy infrastructure from leading Solana ecosystem partners.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-xl border border-purple-500/30">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="font-bold mb-2 text-purple-300">Radr Labs ShadowWire</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Private transfer routing layer for confidential on-chain payments
                </p>
                <div className="text-xs text-purple-400">Future: Stealth payment routing</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-6 rounded-xl border border-blue-500/30">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2 text-blue-300">Helius / QuickNode</h4>
                <p className="text-slate-400 text-sm mb-3">
                  High-performance RPC infrastructure for reliable transaction indexing
                </p>
                <div className="text-xs text-blue-400">Integration: Private indexing</div>
              </div>
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 p-6 rounded-xl border border-green-500/30">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.508 7.588c1.046.487 1.757 1.597 1.757 2.872 0 1.762-1.428 3.19-3.19 3.19h-2.023v3.562H10.78V7.588h4.672z"/>
                  </svg>
                </div>
                <h4 className="font-bold mb-2 text-green-300">Solana Web3.js</h4>
                <p className="text-slate-400 text-sm mb-3">
                  Core blockchain interaction for on-chain proof and USDC transfers
                </p>
                <div className="text-xs text-green-400">Active: Transaction proofs</div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-slate-500 text-sm">Additional technologies</p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">Framer Motion</span>
                <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">shadcn/ui</span>
                <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">Sonner Toast</span>
                <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">React Context</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Payroll?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Experience the future of private, secure, and instant payroll settlements on Solana blockchain.
            </p>
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-lg"
              onClick={() => router.push('/connect')}
            >
              Launch App <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">256-bit</div>
                <div className="text-sm text-slate-400">Security Level</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">&lt;400ms</div>
                <div className="text-sm text-slate-400">Transaction Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">$0.00025</div>
                <div className="text-sm text-slate-400">Avg. Fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                <div className="text-sm text-slate-400">Private</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Stealth Payroll</span>
              </div>
              <p className="text-slate-400 text-sm">
                Private, secure, and instant payroll on Solana blockchain.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Technology</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• TweetNaCl Encryption</li>
                <li>• Solana Blockchain</li>
                <li>• USDC Payments</li>
                <li>• Next.js Frontend</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            © 2026 Stealth Payroll. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
