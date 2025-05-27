import { useState } from 'react';
import { Menu, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Ad Showcase', href: '#ad-showcase' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl shadow-xl border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-primary/25">
              <Play className="w-6 h-6 text-white" />
            </div>
            <span className="font-montserrat font-bold text-2xl text-white tracking-tight">
              adberg.ai
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-opensans text-gray-300 hover:text-primary transition-all duration-300 relative group animate-slide-in-left text-lg font-medium"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block animate-slide-in-right">
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-opensans font-semibold px-8 py-3 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-primary/25 text-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-primary transition-colors duration-300 p-2"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800/30 animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-primary font-opensans transition-colors duration-300 text-lg rounded-2xl hover:bg-black/70 border border-transparent hover:border-gray-800/50"
              >
                {item.name}
              </button>
            ))}
            <div className="px-4 pt-2">
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-opensans font-semibold py-3 rounded-3xl transition-all duration-300 text-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
