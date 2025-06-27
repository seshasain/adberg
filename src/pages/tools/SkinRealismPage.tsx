import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getToolByPath, Tool } from '@/lib/toolService';
import { createProject } from '@/lib/projectService';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const ImageStudioPage = () => {
  const { user } = useAuth();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('create');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchTool = async () => {
      setLoading(true);
      try {
        const result = await getToolByPath('/tools/image-studio');
        if (result.tool) setTool(result.tool);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load tool.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, []);

  const handleGenerate = async () => {
    if (!user || !tool) return;
    
    setGenerating(true);
    
    try {
      // Simulate AI image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new project in the database
      const result = await createProject({
        title: 'AI Generated Portrait',
        description: 'A photorealistic portrait with enhanced skin realism',
        toolId: tool.id,
        projectData: {
          prompt: 'Professional headshot with natural lighting',
          settings: {
            skinRealism: 0.8,
            lighting: 'natural',
            background: 'gradient'
          }
        },
        thumbnailUrl: 'https://placehold.co/600x600/1a1a1a/ffffff?text=AI+Portrait'
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: 'Success!',
        description: 'Your image has been generated and saved to your projects.',
      });
      
    } catch (error: any) {
      toast({
        title: 'Generation Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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

      <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="create"><Sparkles className="w-4 h-4 mr-2" />Create New</TabsTrigger>
          <TabsTrigger value="upload"><Upload className="w-4 h-4 mr-2" />Upload & Enhance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-6 mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Create AI Image</h2>
                  <p className="text-gray-400">Generate photorealistic images with incredible detail and natural skin tones.</p>
                  
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Prompt</label>
                      <textarea 
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        rows={4}
                        placeholder="Describe the image you want to create..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Skin Realism</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Style</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white">
                          <option>Photorealistic</option>
                          <option>Artistic</option>
                          <option>Cinematic</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Aspect Ratio</label>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white">
                          <option>1:1 (Square)</option>
                          <option>16:9 (Landscape)</option>
                          <option>9:16 (Portrait)</option>
                        </select>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      onClick={handleGenerate}
                      disabled={generating}
                    >
                      {generating ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
                  {generating ? (
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Generating your image...</p>
                      <p className="text-xs text-gray-500 mt-2">This may take a few moments</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-800/70 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <ImageIcon className="h-10 w-10 text-gray-500" />
                      </div>
                      <h3 className="text-gray-300 font-medium">Your image will appear here</h3>
                      <p className="text-gray-500 text-sm mt-2">Fill out the form and click Generate</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-800 rounded-md flex items-center justify-center mb-2">
                    <ImageIcon className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-400">Sample {i + 1}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-6 mt-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Upload an Image</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Drag and drop your image here, or click to browse. We'll enhance it with our AI technology.
                </p>
                <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Photorealistic image generation',
              'Advanced skin realism controls',
              'Multiple style options',
              'Custom aspect ratios',
              'Image enhancement',
              'Background removal'
            ].map((feature, i) => (
              <div key={i} className="flex items-start">
                <div className="mt-1 mr-2 p-1 bg-green-500/20 rounded-full">
                  <Check className="h-3 w-3 text-green-500" />
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageStudioPage; 