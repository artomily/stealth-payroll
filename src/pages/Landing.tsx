import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { FeatureCard } from '@/components/FeatureCard';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  User,
  Zap,
  Database,
  Key,
  CheckCircle2,
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Lock,
      title: 'Encrypted Salaries',
      description: 'Salary amounts are encrypted using the employee\'s public key. Only they can decrypt.',
    },
    {
      icon: Database,
      title: 'On-Chain Verification',
      description: 'Payments are recorded on Solana, providing immutable proof of transaction.',
    },
    {
      icon: Key,
      title: 'Key-Based Access',
      description: 'Wallet keypairs double as encryption keys. No extra passwords needed.',
    },
    {
      icon: Zap,
      title: 'Fast Settlement',
      description: 'Solana\'s speed means instant payroll settlement at minimal cost.',
    },
  ];

  const workflow = [
    { step: 1, title: 'Employer Creates Payroll', description: 'Enter salary details in the dashboard' },
    { step: 2, title: 'Data Gets Encrypted', description: 'Using employee\'s public wallet key' },
    { step: 3, title: 'Transaction Executes', description: 'On-chain transfer with hidden amounts' },
    { step: 4, title: 'Employee Decrypts', description: 'View salary slip with their wallet' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Built for Solana</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-foreground">Private Payroll on</span>
              <br />
              <span className="gradient-text">Public Blockchain</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Pay salaries on-chain without exposing compensation details.
              Verifiable transactions with encrypted amounts.
            </p>

            {/* Problem/Solution */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20">
                <Eye className="w-5 h-5 text-destructive" />
                <span className="text-sm text-foreground">Public: Everyone sees salaries</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/20">
                <EyeOff className="w-5 h-5 text-secondary" />
                <span className="text-sm text-foreground">Stealth: Only recipient sees</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/employer">
                <Button variant="hero" size="xl" className="gap-2 min-w-[200px]">
                  <Briefcase className="w-5 h-5" />
                  I'm an Employer
                </Button>
              </Link>
              <Link to="/employee">
                <Button variant="glass" size="xl" className="gap-2 min-w-[200px]">
                  <User className="w-5 h-5" />
                  I'm an Employee
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Simple encryption meets blockchain transparency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Flow</h2>
            <p className="text-muted-foreground">From payroll creation to secure delivery</p>
          </div>
          
          <div className="space-y-4">
            {workflow.map((item, index) => (
              <div
                key={item.step}
                className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary-foreground">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <CheckCircle2 className="w-5 h-5 text-secondary ml-auto hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg gradient-text">Stealth Payroll</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A hackathon project demonstrating private payroll on Solana.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built with encryption-first design • Not for production use
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
