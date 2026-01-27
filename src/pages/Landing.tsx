import React, { useState, useEffect } from 'react';
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

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ children }) => (
    <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
      {children}
    </a>
  );

  const features = [
    {
      icon: <Shield className="text-[#9945FF]" />,
      title: "Asymmetric Encryption",
      desc: "Salary data is encrypted with the employee's public key. Only their private key can reveal the contents."
    },
    {
      icon: <EyeOff className="text-[#14F195]" />,
      title: "Obfuscated Amounts",
      desc: "Block explorers show the transfer, but our stealth layer hides the metadata and breakdown from public view."
    },
    {
      icon: <Zap className="text-blue-400" />,
      title: "Instant Verifiability",
      desc: "Employees get an instant cryptographically signed receipt that is valid for tax and legal purposes."
    },
    {
      icon: <Lock className="text-[#9945FF]" />,
      title: "Military-Grade Security",
      desc: "ECIES encryption ensures that only authorized parties can access sensitive payroll information."
    },
    {
      icon: <Shield className="text-[#14F195]" />,
      title: "Privacy Preserved",
      desc: "Your financial structure remains completely hidden from public blockchain analysis tools."
    },
    {
      icon: <Zap className="text-blue-400" />,
      title: "Instant Settlement",
      desc: "Solana's speed means instant payroll settlement at minimal cost to your organization."
    },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-[#14F195] selection:text-black font-sans selection:bg-opacity-30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#9945FF] opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-[#14F195] opacity-10 blur-[120px] rounded-full"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-black/80 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded flex items-center justify-center">
              <Shield size={18} className="text-black fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">Stealth</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <NavItem>Solutions</NavItem>
            <NavItem>Network</NavItem>
            <NavItem>Community</NavItem>
            <NavItem>Developers</NavItem>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-5 py-2 text-sm font-semibold border border-white/20 rounded-full hover:bg-white/5 transition-all">
              Docs
            </button>
            <button className="px-6 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-[#14F195] transition-all">
              Launch App
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-bold">
              <a href="#">Solutions</a>
              <a href="#">Network</a>
              <a href="#">Community</a>
              <a href="#">Developers</a>
              <button className="w-full py-4 bg-white text-black rounded-xl">Launch App</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 lg:pt-48">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9945FF]/30 bg-[#9945FF]/10 text-[#9945FF] text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} /> Built on Solana
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8">
              PRIVACY-FIRST <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] via-[#14F195] to-[#14F195]">PAYROLL SYSTEMS.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12">
              Pay your team on-chain without exposing their compensation. Stealth Payroll uses advanced encryption to keep your financial structure secure and private.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#8033E6] rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(153,69,255,0.4)] transition-all flex items-center justify-center gap-2">
                Start Building <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Read Whitepaper
              </button>
            </div>
          </motion.div>

          {/* DASHBOARD PREVIEW */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-24 relative max-w-5xl mx-auto border border-white/10 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-1 md:p-2 overflow-hidden shadow-2xl"
          >
            <div className="bg-[#0a0a0a] rounded-xl p-4 md:p-8">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse"></div>
                  <div className="text-left">
                    <p className="text-sm font-bold">Employer Dashboard</p>
                    <p className="text-xs text-slate-500 font-mono">0x4F...92e1</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-left">
                    <p className="text-xs text-slate-400 mb-1">Total Payroll (Locked)</p>
                    <p className="text-2xl font-bold tracking-tight">1,250.00 SOL</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-400">
                    <tr>
                      <th className="p-4">Recipient</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Data Privacy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Sarah J.', amount: '45.00 SOL', status: 'Success' },
                      { name: 'Michael K.', amount: '38.50 SOL', status: 'Pending' },
                      { name: 'Dev Team', amount: '120.00 SOL', status: 'Success' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium">{row.name}</td>
                        <td className="p-4 font-mono font-bold text-[#14F195]">{row.amount}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 flex items-center gap-2 text-slate-400">
                          <Lock size={12} /> Encrypted (ECIES)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </section>

        {/* STATS BAR */}
        <section className="py-20 border-y border-white/5 mt-20 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around gap-12">
            {[
              { label: 'Transactions', value: '450M+' },
              { label: 'Avg. Cost', value: '$0.00025' },
              { label: 'Latency', value: '400ms' },
              { label: 'Privacy Nodes', value: '1,200' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-black tracking-tighter mb-2">{stat.value}</p>
                <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES GRID - INFINITE SCROLL */}
        <section className="py-32 max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Financial privacy for <br/>internet-scale businesses.</h2>
              <p className="text-slate-400 text-lg">Payroll shouldn't be a public record. We combine Solana's speed with military-grade asymmetric encryption.</p>
            </div>
            <button className="flex items-center gap-2 text-[#14F195] font-bold border-b border-[#14F195] pb-1 hover:gap-4 transition-all">
              See documentation <ChevronRight size={18} />
            </button>
          </div>

          <div className="relative">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <motion.div 
              className="flex gap-6"
              animate={{ x: ['0%', '-100%'] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {/* Original set */}
              {features.map((feature, idx) => (
                <FeatureCard 
                  key={`set1-${idx}`}
                  icon={feature.icon}
                  title={feature.title}
                  desc={feature.desc}
                />
              ))}
              {/* Duplicate set for infinite loop */}
              {features.map((feature, idx) => (
                <FeatureCard 
                  key={`set2-${idx}`}
                  icon={feature.icon}
                  title={feature.title}
                  desc={feature.desc}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-32 bg-gradient-to-b from-transparent to-white/[0.03]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-20 tracking-tight">How it works.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              
              <Step 
                num="01" 
                title="Connect Wallet" 
                desc="Admin connects the company treasury wallet." 
              />
              <Step 
                num="02" 
                title="Encrypt Data" 
                desc="Input payroll. System automatically encrypts it for each employee." 
              />
              <Step 
                num="03" 
                title="Execute Transaction" 
                desc="A single batch transaction handles all payments on Solana." 
              />
              <Step 
                num="04" 
                title="Private Access" 
                desc="Employees sign in to decrypt and download their private salary slips." 
              />
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 max-w-5xl mx-auto px-6 text-center">
          <div className="p-12 md:p-24 bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-0"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">READY TO BUILD <br/> THE FUTURE?</h2>
              <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">Join the 4,000+ companies already exploring private decentralized finance on Solana.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 bg-white text-black font-black rounded-full hover:bg-[#14F195] transition-all transform group-hover:scale-105">
                  START FOR FREE
                </button>
                <button className="px-10 py-5 bg-transparent border border-white/20 font-black rounded-full hover:bg-white/5 transition-all">
                  GET IN TOUCH
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded flex items-center justify-center">
                <Shield size={12} className="text-black fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase italic">Stealth</span>
            </div>
            <p className="text-slate-500 max-w-xs mb-8">
              Securing the world's payroll on the fastest blockchain on earth. Built for businesses, governed by community.
            </p>
            <div className="flex gap-4">
              <Twitter size={20} className="text-slate-400 cursor-pointer hover:text-white" />
              <Github size={20} className="text-slate-400 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Solana</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>Grants</li>
              <li>Breakthrough</li>
              <li>Media Kit</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Get Connected</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li>Ecosystem</li>
              <li>Blog</li>
              <li>Newsletter</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-slate-600 text-xs flex justify-between">
          <p>© 2026 Stealth Payroll. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="min-w-[300px] p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-[#14F195]/30 transition-all group flex-shrink-0">
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ num, title, desc }) => (
  <div className="relative z-10 text-center md:text-left">
    <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center font-bold text-xs mb-6 mx-auto md:mx-0">
      {num}
    </div>
    <h4 className="text-lg font-bold mb-2 tracking-tight">{title}</h4>
    <p className="text-slate-500 text-sm">{desc}</p>
  </div>
);

export default Landing;
