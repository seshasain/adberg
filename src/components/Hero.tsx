
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative" role="banner">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-6 animate-slide-in-left">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-opensans text-primary text-sm font-semibold uppercase tracking-wider">AI-Powered Studio</span>
            </div>
            
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Studio-Quality AI Video Ads,{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.4s' }}>
                Delivered in Hours
              </span>
            </h1>
            
            <p className="font-opensans text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
              Create human-like video ads with professional soundtracks using AI. 
              Faster, cheaper, and more consistent than traditional production.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-in-left" style={{ animationDelay: '0.8s' }}>
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-opensans font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 group shadow-2xl shadow-primary/25"
                size="lg"
              >
                Start Creating Videos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#how-it-works')}
                className="border-2 border-primary/50 text-primary hover:bg-primary hover:text-white font-opensans font-semibold px-8 py-4 rounded-2xl transition-all duration-300 bg-transparent backdrop-blur-sm"
                size="lg"
              >
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="text-center group">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-white group-hover:text-primary transition-colors duration-300">90%</div>
                <div className="font-opensans text-sm text-gray-400">Cost Savings</div>
              </div>
              <div className="text-center group">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-white group-hover:text-primary transition-colors duration-300">24h</div>
                <div className="font-opensans text-sm text-gray-400">Turnaround</div>
              </div>
              <div className="text-center group">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-white group-hover:text-primary transition-colors duration-300">95%</div>
                <div className="font-opensans text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-1 shadow-2xl animate-scale-in" style={{ animationDelay: '1.2s' }}>
                <div className="bg-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="aspect-video bg-gray-700 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 bg-gradient-to-r from-primary to-accent rounded-full p-6 shadow-2xl transform group-hover:scale-110 transition-all duration-500 cursor-pointer">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    {/* Floating particles */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="absolute bottom-6 right-6 w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-opensans text-sm text-gray-400">
                      Watch a sample AI-generated video ad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
