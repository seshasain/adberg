
import { Play, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800/50 relative overflow-hidden" role="contentinfo">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-xl">adberg.ai</span>
            </div>
            <p className="font-opensans text-gray-300 mb-6 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Democratizing professional video production through AI. Create studio-quality, 
              human-like video ads with professional soundtracks in hours, not weeks.
            </p>
            <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
                <span className="font-opensans text-gray-300 group-hover:text-white transition-colors duration-300">hello@adberg.ai</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
                <span className="font-opensans text-gray-300 group-hover:text-white transition-colors duration-300">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-montserrat font-semibold text-lg mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'Features', href: '#features' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'Case Studies', href: '#case-studies' },
                { name: 'About Us', href: '#about' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-opensans text-gray-300 hover:text-primary transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <h4 className="font-montserrat font-semibold text-lg mb-6 text-primary">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-300 relative group">
                  Help Center
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-300 relative group">
                  API Documentation
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-300 relative group">
                  Video Tutorials
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-300 relative group">
                  Community Forum
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="font-opensans text-gray-300 hover:text-primary transition-colors duration-300 relative group"
                >
                  Contact Sales
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="font-opensans text-gray-400 hover:text-primary transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="font-opensans text-gray-400 hover:text-primary transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="font-opensans text-gray-400 hover:text-primary transition-colors duration-300 text-sm">
                Cookie Policy
              </a>
            </div>
            <div className="font-opensans text-gray-500 text-sm">
              © 2024 Adberg.ai. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 animate-scale-in" style={{ animationDelay: '1s' }}>
        <button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group shadow-primary/25">
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
