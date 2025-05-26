
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-secondary leading-tight mb-6">
              Studio-Quality AI Video Ads,{' '}
              <span className="text-primary">Delivered in Hours</span>
            </h1>
            
            <p className="font-opensans text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Create human-like video ads with professional soundtracks using AI. 
              Faster, cheaper, and more consistent than traditional production.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-primary hover:bg-primary/90 text-white font-opensans font-semibold px-8 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 group"
                size="lg"
              >
                Start Creating Videos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#how-it-works')}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-opensans font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
                size="lg"
              >
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-secondary">90%</div>
                <div className="font-opensans text-sm text-gray-600">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-secondary">24h</div>
                <div className="font-opensans text-sm text-gray-600">Turnaround</div>
              </div>
              <div className="text-center">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-secondary">95%</div>
                <div className="font-opensans text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-1">
                <div className="bg-white rounded-2xl p-8">
                  <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                    <div className="relative z-10 bg-white rounded-full p-6 shadow-lg transform hover:scale-110 transition-transform duration-200 cursor-pointer">
                      <Play className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-opensans text-sm text-gray-600">
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
