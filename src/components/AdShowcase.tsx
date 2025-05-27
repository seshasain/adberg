import { useState } from 'react';
import { Play, TabletSmartphone, MonitorSmartphone, ArrowRight, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const AdShowcase = () => {
  const [activeFormat, setActiveFormat] = useState("landscape");
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Mock data for ads - replace with your actual ads
  const landscapeAds = [
    {
      title: "Summer Collection",
      description: "Fashion brand seasonal showcase",
      industry: "Fashion & Apparel",
      thumbnailBg: "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Fitness App",
      description: "Mobile app promotion",
      industry: "Health & Wellness",
      thumbnailBg: "bg-gradient-to-br from-green-500/20 to-teal-500/20"
    },
    {
      title: "Coffee Shop",
      description: "Local business promotion",
      industry: "Food & Beverage",
      thumbnailBg: "bg-gradient-to-br from-amber-500/20 to-red-500/20"
    }
  ];

  const portraitAds = [
    {
      title: "Social Story",
      description: "Instagram/TikTok ad format",
      industry: "Technology",
      thumbnailBg: "bg-gradient-to-br from-pink-500/20 to-orange-500/20"
    },
    {
      title: "Product Launch",
      description: "New product announcement",
      industry: "Consumer Goods",
      thumbnailBg: "bg-gradient-to-br from-indigo-500/20 to-cyan-500/20"
    },
    {
      title: "Mobile Game",
      description: "App store ad format",
      industry: "Gaming",
      thumbnailBg: "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20"
    }
  ];

  const ads = activeFormat === "landscape" ? landscapeAds : portraitAds;
  const currentAd = ads[currentAdIndex];

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <section id="ad-showcase" className="py-20 bg-black relative overflow-hidden" role="main">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
            Ad Formats for Every Platform
          </h2>
          <p className="font-opensans text-xl text-gray-300 max-w-3xl mx-auto">
            Create videos optimized for any screen size or platform—all from a single AI studio.
          </p>
        </div>

        <Tabs defaultValue="landscape" onValueChange={setActiveFormat} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 backdrop-blur-sm border border-gray-600/60 p-1">
              <TabsTrigger 
                value="landscape" 
                className="px-8 py-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                <MonitorSmartphone className="w-5 h-5 mr-2" />
                Landscape
              </TabsTrigger>
              <TabsTrigger 
                value="portrait" 
                className="px-8 py-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                <TabletSmartphone className="w-5 h-5 mr-2" />
                Portrait
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Left sidebar for thumbnails */}
            <div className="lg:col-span-1 flex lg:flex-col gap-4 justify-center order-2 lg:order-1">
              {ads.map((ad, index) => (
                <div 
                  key={index}
                  onClick={() => setCurrentAdIndex(index)}
                  className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                    currentAdIndex === index 
                      ? 'border-2 border-primary shadow-lg shadow-primary/20 scale-105' 
                      : 'border border-gray-600/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`${ad.thumbnailBg} aspect-${activeFormat === "landscape" ? "video" : "[9/16]"} flex items-center justify-center`}>
                    <Play className={`w-8 h-8 ${currentAdIndex === index ? 'text-primary' : 'text-white/70'}`} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Main preview */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <TabsContent value="landscape" className="mt-0">
                <div className="bg-black/70 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-4">
                  <div className={`${currentAd.thumbnailBg} aspect-video rounded-lg flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
                    <div className="relative z-10 bg-black/50 backdrop-blur-sm border border-primary/30 rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer">
                      <Play className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="portrait" className="mt-0">
                <div className="bg-black/70 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-4 max-w-[400px] mx-auto">
                  <div className={`${currentAd.thumbnailBg} aspect-[9/16] rounded-lg flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
                    <div className="relative z-10 bg-black/50 backdrop-blur-sm border border-primary/30 rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer">
                      <Play className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Navigation arrows */}
              <div className="flex justify-between mt-4">
                <Button
                  onClick={prevAd}
                  variant="outline"
                  className="bg-black/50 text-white border border-gray-600/60 hover:bg-primary/20 hover:text-primary rounded-full p-3"
                  size="icon"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={nextAd}
                  variant="outline"
                  className="bg-black/50 text-white border border-gray-600/60 hover:bg-primary/20 hover:text-primary rounded-full p-3"
                  size="icon"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Right sidebar for details */}
            <div className="lg:col-span-1 order-3">
              <div className="bg-black/50 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-6">
                <h3 className="font-montserrat font-semibold text-xl text-white mb-3">
                  {currentAd.title}
                </h3>
                <p className="font-opensans text-gray-300 mb-4">
                  {currentAd.description}
                </p>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 uppercase tracking-wider mr-2">Industry:</span>
                  <span className="text-sm text-primary">{currentAd.industry}</span>
                </div>
                <div className="mt-6">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl"
                  >
                    Create Similar Ad
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
        
        {/* Additional format examples */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-black/50 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-6 text-center">
            <h3 className="font-montserrat font-semibold text-xl text-white mb-3">
              Social Media Ads
            </h3>
            <p className="font-opensans text-gray-300 mb-4">
              Optimized for Instagram, TikTok, Facebook, LinkedIn, and more
            </p>
            <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center mb-4">
              <TabletSmartphone className="w-12 h-12 text-primary/80" />
            </div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-6 text-center">
            <h3 className="font-montserrat font-semibold text-xl text-white mb-3">
              Web & Display Ads
            </h3>
            <p className="font-opensans text-gray-300 mb-4">
              Perfect for websites, landing pages, and display networks
            </p>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <MonitorSmartphone className="w-12 h-12 text-primary/80" />
            </div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm border border-gray-600/60 rounded-2xl p-6 text-center">
            <h3 className="font-montserrat font-semibold text-xl text-white mb-3">
              Custom Formats
            </h3>
            <p className="font-opensans text-gray-300 mb-4">
              Tailor dimensions, aspect ratios, and content to your specific needs
            </p>
            <div className="aspect-[4/3] bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center mb-4">
              <div className="w-12 h-12 text-primary/80 relative">
                <div className="absolute inset-0 border-2 border-primary/80 rounded"></div>
                <div className="absolute inset-2 border-2 border-primary/80 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdShowcase; 