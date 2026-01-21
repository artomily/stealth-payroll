import { Link, useLocation } from 'react-router-dom';
import { Shield, Briefcase, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ModeToggle';

export function Header() {
  const location = useLocation();
  
  const navItems = [
    { to: '/', label: 'Home', icon: Shield },
    { to: '/employer', label: 'Employer', icon: Briefcase },
    { to: '/employee', label: 'Employee', icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg gradient-text">Stealth Payroll</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                location.pathname === item.to
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <ModeToggle />
      </div>
    </header>
  );
}
