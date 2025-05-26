
import { Card, CardContent } from '@/components/ui/card';

const UseCases = () => {
  const useCases = [
    {
      title: 'DTC Brands',
      description: 'Product demos, testimonials, and social media ads that drive conversions and build brand loyalty.',
      icon: '🛍️',
      benefits: ['Product showcases', 'Customer testimonials', 'Social media content'],
    },
    {
      title: 'Marketing Agencies',
      description: 'Scale your video production capabilities and deliver premium results to more clients faster.',
      icon: '🎯',
      benefits: ['Client scalability', 'Faster delivery', 'Higher margins'],
    },
    {
      title: 'Content Creators',
      description: 'Professional-quality sponsor content and brand partnerships without expensive equipment.',
      icon: '📱',
      benefits: ['Sponsor content', 'Brand partnerships', 'Professional quality'],
    },
    {
      title: 'Startups',
      description: 'Launch campaigns with enterprise-quality videos on a startup budget. Perfect for MVP launches.',
      icon: '🚀',
      benefits: ['Budget-friendly', 'Quick turnaround', 'Professional results'],
    },
  ];

  return (
    <section id="use-cases" className="py-20 bg-black" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
            Perfect for Every Business
          </h2>
          <p className="font-opensans text-xl text-gray-300 max-w-3xl mx-auto">
            From startups to enterprises, our AI video studio adapts to your unique needs and goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="font-montserrat font-semibold text-xl text-white mb-4">
                    {useCase.title}
                  </h3>
                  <p className="font-opensans text-gray-300 mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        <span className="font-opensans text-sm text-gray-400">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Success Stories Preview */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
          <div className="text-center">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
              Trusted by Industry Leaders
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {['TechCorp', 'StyleBrand', 'FitLife', 'GreenEarth'].map((brand, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl shadow-md flex items-center justify-center mx-auto mb-2">
                    <span className="font-montserrat font-bold text-gray-300 text-xs">{brand}</span>
                  </div>
                  <p className="font-opensans text-xs text-gray-400">Trusted Partner</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
