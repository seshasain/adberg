
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-founder',
      avatar: '👨‍💼',
      background: 'Former VP at Adobe, 15 years in video tech',
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO & Co-founder',
      avatar: '👩‍💻',
      background: 'Ex-Google AI researcher, Stanford PhD',
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of AI',
      avatar: '👨‍🔬',
      background: 'Former Tesla AI team, MIT alumnus',
    },
    {
      name: 'Emily Park',
      role: 'Creative Director',
      avatar: '👩‍🎨',
      background: 'Award-winning filmmaker, Disney veteran',
    },
  ];

  const whyAiFirst = [
    {
      title: 'Democratizing Video Production',
      description: 'Every business deserves access to studio-quality video content, regardless of budget or location.',
      icon: '🌍',
    },
    {
      title: 'Speed at Scale',
      description: 'Traditional video production takes weeks. Our AI delivers the same quality in hours, not days.',
      icon: '⚡',
    },
    {
      title: 'Consistency & Control',
      description: 'AI ensures brand consistency across all content while giving you complete creative control.',
      icon: '🎯',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="text-center mb-20">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6">
            About adberg.ai Studio
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-opensans text-xl text-gray-300 leading-relaxed mb-8">
              We're on a mission to democratize professional video production. Founded in 2023 by a team of 
              AI researchers and creative professionals, we believe every business should have access to 
              studio-quality video content without the traditional barriers of cost, time, and complexity.
            </p>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 shadow-lg">
              <h3 className="font-montserrat font-bold text-2xl text-white mb-4">
                Our Vision
              </h3>
              <p className="font-opensans text-lg text-gray-300">
                To make professional video production as accessible as writing an email. We envision a world 
                where every brand, regardless of size, can tell their story through compelling, high-quality video content.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-4">
              Meet Our Team
            </h3>
            <p className="font-opensans text-lg text-gray-300">
              World-class expertise in AI, video production, and creative technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <CardContent className="p-8">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h4 className="font-montserrat font-semibold text-lg text-white mb-2">
                      {member.name}
                    </h4>
                    <p className="font-opensans text-primary font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="font-opensans text-sm text-gray-400">
                      {member.background}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Why AI-First Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-4">
              Why AI-First?
            </h3>
            <p className="font-opensans text-lg text-gray-300 max-w-3xl mx-auto">
              We believe AI is not just a tool, but a creative partner that unlocks new possibilities in video production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyAiFirst.map((reason, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-6">{reason.icon}</div>
                    <h4 className="font-montserrat font-semibold text-xl text-white mb-4">
                      {reason.title}
                    </h4>
                    <p className="font-opensans text-gray-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Company Stats */}
        <div className="mt-20 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="font-montserrat font-bold text-2xl text-white">
              Our Journey So Far
            </h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-montserrat font-bold text-3xl text-primary mb-2">500+</div>
              <div className="font-opensans text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="font-montserrat font-bold text-3xl text-primary mb-2">10K+</div>
              <div className="font-opensans text-gray-300">Videos Created</div>
            </div>
            <div>
              <div className="font-montserrat font-bold text-3xl text-primary mb-2">50+</div>
              <div className="font-opensans text-gray-300">Countries Served</div>
            </div>
            <div>
              <div className="font-montserrat font-bold text-3xl text-primary mb-2">99%</div>
              <div className="font-opensans text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
