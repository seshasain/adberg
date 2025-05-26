
import { Play, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-white py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-xl">SwiftReel AI</span>
            </div>
            <p className="font-opensans text-gray-300 mb-6 leading-relaxed">
              Democratizing professional video production through AI. Create studio-quality, 
              human-like video ads with professional soundtracks in hours, not weeks.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-opensans text-gray-300">hello@swiftreel.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-opensans text-gray-300">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Quick Links</h4>
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
                    className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200">
                  Video Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200">
                  Community Forum
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Contact Sales
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="font-opensans text-gray-300 hover:text-primary transition-colors duration-200 text-sm">
                Cookie Policy
              </a>
            </div>
            <div className="font-opensans text-gray-400 text-sm">
              © 2024 SwiftReel AI Studio. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 group">
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
