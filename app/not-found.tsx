"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, Shield, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#000] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full"
        >
          {/* 404 Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                404
              </div>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-green-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-slate-400 mb-8 w-full">
              The page you're looking for doesn't exist or has been moved to a secure location.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => router.push('/')}
            >
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 hover:bg-slate-900 text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-slate-800"
          >
            <p className="text-sm text-slate-500 mb-4">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                Dashboard
              </button>
              <span className="text-slate-700">•</span>
              <button
                onClick={() => router.push('/')}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                Features
              </button>
              <span className="text-slate-700">•</span>
              <button
                onClick={() => router.push('/')}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                Documentation
              </button>
            </div>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full"
          >
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-400">Secured by Stealth Payroll</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
