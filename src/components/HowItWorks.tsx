
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
    <section id="how-it-works" className="py-20 bg-white" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-secondary mb-4">
            How It Works
          </h2>
          <p className="font-opensans text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to completion in three simple steps. No filming, no editing skills required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <Card className="relative p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg rounded-2xl">
                <CardContent className="p-0">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-montserrat font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-montserrat font-semibold text-xl text-secondary mb-4">
                    {step.title}
                  </h3>
                  <p className="font-opensans text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <p className="font-opensans text-sm text-gray-500 mt-4">
            Average project completion time: 24-48 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
