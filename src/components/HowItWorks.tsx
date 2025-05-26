
import { Upload, Play, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Brand Assets',
      description: 'Share your brand guidelines, product images, and key messages. Our AI learns your brand voice and visual style.',
    },
    {
      icon: Play,
      title: 'AI Generates Videos',
      description: 'Our advanced AI creates studio-quality videos with human-like actors and professional soundtracks tailored to your brand.',
    },
    {
      icon: ArrowRight,
      title: 'Review & Publish',
      description: 'Review your videos, request any adjustments, and publish directly to your marketing channels with one click.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-800 relative overflow-hidden" role="main">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4 animate-fade-in">
            How It Works
          </h2>
          <p className="font-opensans text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From concept to completion in three simple steps. No filming, no editing skills required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <Card className="relative p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-xl rounded-2xl bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 group overflow-hidden">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-0 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary to-accent text-white rounded-full flex items-center justify-center font-montserrat font-bold text-sm shadow-lg animate-scale-in" style={{ animationDelay: `${index * 0.2 + 0.4}s` }}>
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-primary/20">
                    <step.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-montserrat font-semibold text-xl text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-opensans text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center space-x-4 text-gray-600">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <p className="font-opensans text-sm text-gray-400 mt-4">
            Average project completion time: 24-48 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
