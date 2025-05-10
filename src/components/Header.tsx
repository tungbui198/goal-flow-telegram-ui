
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';

interface HeaderProps {
  showGetStarted?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showGetStarted = true }) => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Target className="h-8 w-8 text-okr-blue" />
          <span className="text-2xl font-display font-bold gradient-text">OKRify</span>
        </Link>
        
        <div className="space-x-4">
          {showGetStarted && (
            <Button asChild className="button-gradient">
              <Link to="/okr">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
