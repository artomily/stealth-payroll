"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, User } from 'lucide-react';

const PaymentRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#000] text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Redirecting to Dashboard...</h1>
        <p className="text-slate-400 mb-6">All payment functions are now unified in one dashboard</p>
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-green-500" />
      </motion.div>
    </div>
  );
};

export default PaymentRedirect;
