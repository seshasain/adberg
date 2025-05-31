import React, { useState } from 'react'
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const ImageToVideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const handlePlayDemo = () => {
    setShowVideo(true)
    setIsPlaying(true)
  }

  const handleReset = () => {
    setShowVideo(false)
    setIsPlaying(false)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-6">
            Transform Static Images into 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Dynamic Videos</span>
          </h2>
          <p className="font-opensans text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how our AI brings your product photos to life with natural movement and engaging animations
          </p>
        </div>

        {/* Showcase Demo */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Before - Static Image */}
          <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    BEFORE
                  </span>
                </div>
                <img 
                  src="/men-s-red-mickey-faces-graphic-printed-oversized-t-shirt-581124-1741351609-1.jpeg"
                  alt="Static product image - Man wearing red Mickey Mouse t-shirt"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white">
                    <h3 className="font-montserrat font-bold text-xl mb-2">Static Product Photo</h3>
                    <p className="font-opensans text-gray-200">Traditional e-commerce image</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="hidden lg:flex justify-center">
            <div className="flex flex-col items-center">
              <ArrowRight className="w-12 h-12 text-primary mb-4" />
              <span className="font-montserrat font-semibold text-white">AI Magic</span>
            </div>
          </div>

          {/* After - Dynamic Video */}
          <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    AFTER
                  </span>
                </div>
                
                {!showVideo ? (
                  <div className="relative">
                    <img 
                      src="/men-s-red-mickey-faces-graphic-printed-oversized-t-shirt-581124-1741351609-1.jpeg"
                      alt="Preview of video transformation"
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        onClick={handlePlayDemo}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full w-20 h-20 flex items-center justify-center transform hover:scale-110 transition-all duration-300"
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-montserrat font-bold text-white text-lg mb-1">
                          Dynamic Video Ad
                        </h3>
                        <p className="font-opensans text-gray-200 text-sm">
                          Click to see the transformation
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <video
                      src="/This_is_a_202505310229.mp4"
                      className="w-full h-[400px] object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <h3 className="font-montserrat font-bold text-white text-lg mb-1">
                            AI-Generated Video
                          </h3>
                          <p className="font-opensans text-gray-200 text-sm">
                            Natural movement and engagement
                          </p>
                        </div>
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:text-white"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-montserrat font-bold text-white text-xl mb-2">Higher Engagement</h3>
            <p className="font-opensans text-gray-400">
              Video content gets 1200% more shares than text and images combined
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-montserrat font-bold text-white text-xl mb-2">Instant Creation</h3>
            <p className="font-opensans text-gray-400">
              Transform any product photo into a professional video in seconds
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-montserrat font-bold text-white text-xl mb-2">Cost Effective</h3>
            <p className="font-opensans text-gray-400">
              Save thousands on video production while getting professional results
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-opensans font-semibold px-8 py-4 rounded-xl text-lg transform hover:scale-105 transition-all duration-300"
          >
            Try Image-to-Video Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ImageToVideoShowcase
