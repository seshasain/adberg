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
    <section className="pt-32 pb-20 bg-black overflow-hidden relative" role="banner">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-8 animate-slide-in-left">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span className="font-opensans text-primary text-sm font-semibold uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full border border-primary/20">AI-Powered Studio</span>
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Studio-Quality AI Video Ads,{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]" style={{ animationDelay: '0.4s' }}>
                Delivered in Hours
              </span>
            </h1>
            
            <p className="font-opensans text-xl text-gray-300 mb-10 leading-relaxed animate-slide-in-left max-w-2xl" style={{ animationDelay: '0.6s' }}>
              <span className="text-primary font-semibold">We believe</span> every brand deserves authentic human connection through video—without barriers of cost, time, or complexity. Our AI delivers this faster and more affordably than traditional production.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-slide-in-left" style={{ animationDelay: '0.8s' }}>
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-opensans font-semibold px-10 py-5 rounded-3xl transition-all duration-300 transform hover:scale-105 group shadow-2xl shadow-primary/25 text-lg"
                size="lg"
              >
                Start Creating Videos
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#features')}
                className="border-2 border-primary/50 text-primary hover:bg-primary hover:text-black font-opensans font-semibold px-10 py-5 rounded-3xl transition-all duration-300 bg-transparent backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 text-lg"
                size="lg"
              >
                <Play className="mr-3 w-6 h-6" />
                See How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="text-center group">
                <div className="font-montserrat font-bold text-3xl md:text-4xl text-white group-hover:text-primary transition-colors duration-300 mb-2">90%</div>
                <div className="font-opensans text-base text-gray-400">Cost Savings</div>
              </div>
              <div className="text-center group">
                <div className="font-montserrat font-bold text-3xl md:text-4xl text-white group-hover:text-primary transition-colors duration-300 mb-2">24h</div>
                <div className="font-opensans text-base text-gray-400">Turnaround</div>
              </div>
              <div className="text-center group">
                <div className="font-montserrat font-bold text-3xl md:text-4xl text-white group-hover:text-primary transition-colors duration-300 mb-2">95%</div>
                <div className="font-opensans text-base text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-2 shadow-2xl animate-scale-in hover:shadow-primary/25 transition-all duration-500" style={{ animationDelay: '1.2s' }}>
                <div className="bg-black rounded-3xl p-10 backdrop-blur-sm">
                  <div className="aspect-video bg-gray-900 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Play button */}
                    <div className="relative z-10 bg-gradient-to-r from-primary to-accent rounded-full p-8 shadow-2xl transform group-hover:scale-110 transition-all duration-500 animate-glow-pulse">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-6 left-6 w-3 h-3 bg-primary rounded-full animate-bounce-subtle"></div>
                    <div className="absolute bottom-8 right-8 w-2 h-2 bg-accent rounded-full animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 right-10 w-2 h-2 bg-primary/60 rounded-full animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="font-opensans text-base text-gray-400">
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
