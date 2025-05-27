import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, DollarSign, Sparkles, FileEdit, Brush, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = () => {
  // Enhanced feature cards with icons and comparative benefits
  const features = [
    {
      title: 'Human-like AI Actors',
      description: 'Photorealistic avatars speak naturally and convey genuine emotion, eliminating costly actor hiring and scheduling conflicts.',
      gradient: 'from-primary to-primary/80',
      icon: <Sparkles className="w-8 h-8 text-primary mb-4" />,
      comparison: 'Traditional: $1,500+ per actor per day | Adberg AI: Unlimited usage included'
    },
    {
      title: 'Professional Soundtracks',
      description: 'Instant access to studio-quality audio with royalty-free music and crystal-clear voiceovers—no sound studio required.',
      gradient: 'from-accent to-accent/80',
      icon: <Brush className="w-8 h-8 text-accent mb-4" />,
      comparison: 'Traditional: $300-3,000 for audio | Adberg AI: All included'
    },
    {
      title: 'Brand Consistency',
      description: 'Our AI learns your brand guidelines and applies them consistently across all videos, eliminating style drift between productions.',
      gradient: 'from-secondary to-secondary/80',
      icon: <FileEdit className="w-8 h-8 text-secondary mb-4" />,
      comparison: 'Traditional: Varies by production team | Adberg AI: Perfect consistency'
    },
    {
      title: 'Rapid Turnaround',
      description: 'Get professional video ads in hours, not weeks. Launch campaigns 95% faster than traditional production timelines.',
      gradient: 'from-primary to-accent',
      icon: <Clock className="w-8 h-8 text-primary mb-4" />,
      comparison: 'Traditional: 2-8 weeks | Adberg AI: 24-48 hours'
    },
    {
      title: 'Cost Effective',
      description: 'Save up to 90% compared to traditional video production while maintaining premium quality—no equipment, crew, or location costs.',
      gradient: 'from-accent to-secondary',
      icon: <DollarSign className="w-8 h-8 text-accent mb-4" />,
      comparison: 'Traditional: $5,000-50,000+ | Adberg AI: Starting at $199'
    },
    {
      title: 'Easy Revisions',
      description: 'Make unlimited changes with simple text instructions in minutes—no costly reshoots, director fees, or edit suite bookings.',
      gradient: 'from-secondary to-primary',
      icon: <CheckCircle2 className="w-8 h-8 text-secondary mb-4" />,
      comparison: 'Traditional: $500-2,000 per revision | Adberg AI: Unlimited included'
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-900" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase mb-3 inline-block">The Future of Ad Production</span>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
            Why AI Beats Traditional Production
          </h2>
          <p className="font-opensans text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge AI technology delivers higher quality, faster turnaround, and lower costs than conventional video production methods.
          </p>
        </div>

        {/* VS Section - Traditional vs AI */}
        <div className="mb-16 grid md:grid-cols-2 gap-8 p-1">
          <div className="bg-gray-800/70 rounded-2xl p-8 border border-gray-600/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gray-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">TRADITIONAL</div>
            <h3 className="font-montserrat font-bold text-xl text-white mb-6 mt-2">Traditional Video Production</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-gray-500 mr-3 mt-1">✗</div>
                <span className="font-opensans text-gray-300">Weeks of planning, production, and post-processing</span>
              </li>
              <li className="flex items-start">
                <div className="text-gray-500 mr-3 mt-1">✗</div>
                <span className="font-opensans text-gray-300">High upfront costs for crew, equipment, and locations</span>
              </li>
              <li className="flex items-start">
                <div className="text-gray-500 mr-3 mt-1">✗</div>
                <span className="font-opensans text-gray-300">Limited revisions without significant additional costs</span>
              </li>
              <li className="flex items-start">
                <div className="text-gray-500 mr-3 mt-1">✗</div>
                <span className="font-opensans text-gray-300">Scheduling complexities with actors and locations</span>
              </li>
              <li className="flex items-start">
                <div className="text-gray-500 mr-3 mt-1">✗</div>
                <span className="font-opensans text-gray-300">New production needed for each language or market</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">ADBERG AI</div>
            <h3 className="font-montserrat font-bold text-xl text-primary mb-6 mt-2">AI-Powered Production</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">✓</div>
                <span className="font-opensans text-gray-300">Video ads delivered within 24-48 hours</span>
              </li>
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">✓</div>
                <span className="font-opensans text-gray-300">90% cost reduction with subscription options</span>
              </li>
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">✓</div>
                <span className="font-opensans text-gray-300">Unlimited revisions with simple text prompts</span>
              </li>
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">✓</div>
                <span className="font-opensans text-gray-300">No scheduling or logistics to manage</span>
              </li>
              <li className="flex items-start">
                <div className="text-primary mr-3 mt-1">✓</div>
                <span className="font-opensans text-gray-300">One-click translation to multiple languages</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-600/60">
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                <CardContent className="p-8">
                  {feature.icon}
                  <h3 className="font-montserrat font-semibold text-xl text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-opensans text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="mt-auto pt-3 border-t border-gray-700/50">
                    <p className="text-xs text-gray-400 italic">
                      {feature.comparison}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="mt-16 bg-gray-800/50 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">PROVEN ROI</span>
              <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
                Real Results, Measurable Impact
              </h3>
              <p className="font-opensans text-gray-300 mb-6 leading-relaxed">
                Our clients experience an average 3x ROI within the first month of switching to AI-generated video ads. Higher quality, faster deployment, and lower costs create a competitive advantage.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="min-w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <span className="font-opensans text-white font-semibold">Produce 10x more content</span>
                    <p className="font-opensans text-gray-300 text-sm">Test multiple concepts and variations at a fraction of traditional costs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <span className="font-opensans text-white font-semibold">Launch campaigns 95% faster</span>
                    <p className="font-opensans text-gray-300 text-sm">Respond to market trends and opportunities in hours, not weeks</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <span className="font-opensans text-white font-semibold">Reduce production costs by 90%</span>
                    <p className="font-opensans text-gray-300 text-sm">Reallocate budget to media spend and campaign optimization</p>
                  </div>
                </li>
              </ul>
              <Button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 group"
              >
                Start Creating Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 text-center backdrop-blur-sm border border-primary/20">
                <div className="text-3xl font-bold text-white mb-2">90%</div>
                <div className="text-lg font-semibold text-primary mb-1">Cost Reduction</div>
                <p className="font-opensans text-gray-300 text-sm">
                  vs. traditional production
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 text-center backdrop-blur-sm border border-primary/20">
                <div className="text-3xl font-bold text-white mb-2">24h</div>
                <div className="text-lg font-semibold text-primary mb-1">Turnaround</div>
                <p className="font-opensans text-gray-300 text-sm">
                  vs. weeks of waiting
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 text-center backdrop-blur-sm border border-primary/20">
                <div className="text-3xl font-bold text-white mb-2">10x</div>
                <div className="text-lg font-semibold text-primary mb-1">More Content</div>
                <p className="font-opensans text-gray-300 text-sm">
                  for the same budget
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 text-center backdrop-blur-sm border border-primary/20">
                <div className="text-3xl font-bold text-white mb-2">3x</div>
                <div className="text-lg font-semibold text-primary mb-1">ROI Increase</div>
                <p className="font-opensans text-gray-300 text-sm">
                  reported by clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
