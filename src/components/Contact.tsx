import { useState } from 'react';
import { Send, MessageCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your interest! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden" role="main">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to Transform Your Video Marketing?
          </h2>
          <p className="font-opensans text-xl text-gray-300 max-w-3xl mx-auto">
            Get started with a free consultation and see how AI can revolutionize your video content.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-in-left">
            <Card className="border-0 shadow-xl rounded-2xl bg-black/50 backdrop-blur-sm border border-gray-600/60">
              <CardContent className="p-8">
                <h3 className="font-montserrat font-bold text-2xl text-white mb-6">
                  Get Your Free Consultation
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block font-opensans font-semibold text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-opensans font-semibold text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block font-opensans font-semibold text-gray-300 mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-opensans font-semibold text-gray-300 mb-2">
                      Tell us about your project *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-white"
                      placeholder="Describe your video needs, goals, and any specific requirements..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-opensans font-semibold py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 group"
                    size="lg"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Features */}
          <div className="animate-slide-in-right space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6 bg-black/50 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-8">
              <h3 className="font-montserrat font-bold text-2xl text-white mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-opensans font-semibold text-white">Live Chat</p>
                    <p className="font-opensans text-gray-300">Available 24/7 for instant support</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-opensans font-semibold text-white">Phone</p>
                    <p className="font-opensans text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-opensans font-semibold text-white">Email</p>
                    <p className="font-opensans text-gray-300">hello@swiftreel.ai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits */}
            <Card className="border-0 shadow-lg rounded-2xl bg-black/50 backdrop-blur-sm border border-gray-600/60">
              <CardContent className="p-8">
                <h4 className="font-montserrat font-bold text-xl text-white mb-4">
                  What to Expect
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="font-opensans text-gray-300">Free 30-minute strategy session</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="font-opensans text-gray-300">Custom project proposal</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="font-opensans text-gray-300">Sample video preview</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="font-opensans text-gray-300">ROI calculator and timeline</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Response Time */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-6 text-center">
              <p className="font-montserrat font-bold text-lg text-white mb-2">
                ⚡ Quick Response Guarantee
              </p>
              <p className="font-opensans text-gray-300">
                We respond to all inquiries within 2 hours during business hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
