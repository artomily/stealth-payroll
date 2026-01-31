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
      description: "Salary data is encrypted with the recipient's public key. Only their private key can reveal the contents."
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
      description: "Support for various token types and custom payment schedules. Organizations maintain full control."
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
            <p className="text-lg md:text-xl text-slate-400 mb-8 w-full">
              Zero-knowledge salary management on Solana. End-to-end encrypted payroll that stays private on-chain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => router.push('/dashboard')}
              >
                Launch App <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 hover:bg-slate-900 text-white"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powered by Cryptography</h2>
            <p className="text-slate-400 w-full">
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

      {/* Tech Stack Section */}
      <section className="py-20 relative z-10 bg-slate-900/50">
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
              <h3 className="text-xl font-bold mb-2">Solana Blockchain</h3>
              <p className="text-slate-400 text-sm mb-4">
                Fast, secure, and scalable blockchain for on-chain verification and instant transactions
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">Web3.js</span>
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">SPL Tokens</span>
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

          {/* Additional Tech Badges */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-4">Also powered by</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">Framer Motion</span>
              <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">shadcn/ui</span>
              <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">Sonner Toast</span>
              <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300">React Context</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
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
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => router.push('/dashboard')}>
                Try Dashboard
              </Button>
              <Button 
                className="w-full mt-3 bg-slate-700 hover:bg-slate-600 text-white" 
                onClick={() => router.push('/dashboard')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10">
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
