import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Upload, ArrowLeftRight, Maximize, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getToolByPath, Tool } from '@/lib/toolService';
import { createProject } from '@/lib/projectService';
import { toast } from '@/components/ui/use-toast';

const ImageUpscalerPage = () => {
  const { user } = useAuth();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [scale, setScale] = useState(2);

  useEffect(() => {
    const fetchTool = async () => {
      setLoading(true);
      try {
        const result = await getToolByPath('/tools/image-upscaler');
        if(result.tool) setTool(result.tool);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load tool.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, []);

  const handleUpscale = async () => {
    if (!user || !tool) return;
    
    setProcessing(true);
    
    try {
      // Simulate AI upscaling process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new project in the database
      const result = await createProject({
        title: 'Upscaled Image',
        description: `Image upscaled ${scale}x with enhanced details`,
        toolId: tool.id,
        projectData: {
          scale: scale,
          settings: {
            preserveDetails: true,
            enhanceQuality: true
          }
        },
        thumbnailUrl: 'https://placehold.co/1200x1200/1a1a1a/ffffff?text=Upscaled+Image'
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: 'Success!',
        description: 'Your image has been upscaled and saved to your projects.',
      });
      
    } catch (error: any) {
      toast({
        title: 'Upscaling Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!tool) {
    return <div className="text-center py-12">Tool not found.</div>;
  }

  return (
    <div className="mt-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <p className="text-muted-foreground">{tool.description}</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Upload Image</h2>
                <p className="text-gray-400 mt-1">Select an image to enhance its resolution</p>
                
                <div className="mt-4 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Drag and drop your image here</p>
                  <p className="text-gray-500 text-sm mb-4">Supports JPG, PNG, WEBP (Max 10MB)</p>
                  <Button className="bg-gray-800 hover:bg-gray-700">
                    <Upload className="mr-2 h-4 w-4" />
                    Browse Files
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Upscaling Options</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-300">Scale Factor: {scale}x</label>
                      <span className="text-xs text-gray-500">Higher values use more credits</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">2x</span>
                      <Slider 
                        defaultValue={[2]} 
                        min={2} 
                        max={4} 
                        step={1}
                        onValueChange={(value) => setScale(value[0])}
                        className="flex-1"
                      />
                      <span className="text-gray-400">4x</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="enhance" className="rounded bg-gray-800 border-gray-700" defaultChecked />
                      <label htmlFor="enhance" className="text-sm text-gray-300">Enhance Details</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="denoise" className="rounded bg-gray-800 border-gray-700" defaultChecked />
                      <label htmlFor="denoise" className="text-sm text-gray-300">Remove Noise</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="faces" className="rounded bg-gray-800 border-gray-700" defaultChecked />
                      <label htmlFor="faces" className="text-sm text-gray-300">Face Enhancement</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="colors" className="rounded bg-gray-800 border-gray-700" />
                      <label htmlFor="colors" className="text-sm text-gray-300">Boost Colors</label>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    onClick={handleUpscale}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Maximize className="mr-2 h-4 w-4" />
                        Upscale Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Preview</h3>
              <div className="space-y-4">
                <div className="relative">
                  <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                    {processing ? (
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Processing...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="h-16 w-16 text-gray-600" />
                        <p className="text-gray-500 mt-2">Upload an image to see preview</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="bg-black/50 border-white/20">
                      <ArrowLeftRight className="h-4 w-4 mr-2" />
                      Compare
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Output Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Original Size:</span>
                      <span className="text-gray-300">-</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">New Size:</span>
                      <span className="text-gray-300">-</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Scale Factor:</span>
                      <span className="text-gray-300">{scale}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Credits Used:</span>
                      <span className="text-gray-300">{scale === 4 ? '3' : '1'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Why Use Our Upscaler?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="p-2 bg-primary/10 rounded-full w-fit">
                <Maximize className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Superior Quality</h3>
              <p className="text-gray-400 text-sm">Our AI preserves details while increasing resolution, avoiding the blurry results of traditional upscalers.</p>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-primary/10 rounded-full w-fit">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Face Enhancement</h3>
              <p className="text-gray-400 text-sm">Special algorithms detect and enhance facial features for perfect portraits every time.</p>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-primary/10 rounded-full w-fit">
                <ArrowLeftRight className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Before/After Comparison</h3>
              <p className="text-gray-400 text-sm">Easily compare your original and upscaled images to see the dramatic quality improvement.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUpscalerPage; 