
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      title: 'Human-like AI Actors',
      description: 'Photorealistic avatars that speak naturally and convey genuine emotion for authentic brand connections.',
      gradient: 'from-primary to-primary/80',
    },
    {
      title: 'Professional Soundtracks',
      description: 'Studio-quality audio with royalty-free music, sound effects, and crystal-clear voiceovers.',
      gradient: 'from-accent to-accent/80',
    },
    {
      title: 'Brand Consistency',
      description: 'AI learns your brand voice, colors, and style guidelines to ensure every video matches your identity.',
      gradient: 'from-secondary to-secondary/80',
    },
    {
      title: 'Rapid Turnaround',
      description: 'Get professional video ads in hours, not weeks. Perfect for time-sensitive campaigns.',
      gradient: 'from-primary to-accent',
    },
    {
      title: 'Cost Effective',
      description: 'Save up to 90% compared to traditional video production while maintaining premium quality.',
      gradient: 'from-accent to-secondary',
    },
    {
      title: 'Easy Revisions',
      description: 'Make unlimited changes with simple text instructions. No need to reshoot or re-edit.',
      gradient: 'from-secondary to-primary',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-secondary mb-4">
            Why Choose SwiftReel AI?
          </h2>
          <p className="font-opensans text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge AI technology meets creative excellence to deliver video ads that convert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                <CardContent className="p-8">
                  <h3 className="font-montserrat font-semibold text-xl text-secondary mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-opensans text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-montserrat font-bold text-2xl text-secondary mb-4">
                Advanced AI Technology
              </h3>
              <p className="font-opensans text-gray-600 mb-6 leading-relaxed">
                Our proprietary AI models are trained on thousands of hours of professional video content, 
                ensuring every generated video meets broadcast-quality standards.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="font-opensans text-gray-700">4K resolution output</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="font-opensans text-gray-700">Multi-language support</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="font-opensans text-gray-700">Custom brand voice training</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🎬</div>
              <p className="font-opensans text-gray-600">
                Join 500+ brands already creating stunning AI videos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
