import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Wand2, Loader2, HelpCircle, RotateCcw, ChevronsUpDown, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

const featureCategories = {
  FACE: [
    { id: 'skin', label: 'Skin', default: false },
    { id: 'nose', label: 'Nose', default: false },
    { id: 'mouth', label: 'Mouth', default: true },
    { id: 'u_lip', label: 'Upper Lip', default: true },
    { id: 'l_lip', label: 'Lower Lip', default: true },
  ],
  EYES: [
    { id: 'eye_g', label: 'Eye General', default: false },
    { id: 'l_eye', label: 'Left Eye', default: true },
    { id: 'r_eye', label: 'Right Eye', default: true },
    { id: 'l_brow', label: 'Left Brow', default: false },
    { id: 'r_brow', label: 'Right Brow', default: false },
  ],
  HEAD: [
    { id: 'hair', label: 'Hair', default: false },
    { id: 'hat', label: 'Hat', default: false },
    { id: 'l_ear', label: 'Left Ear', default: false },
    { id: 'r_ear', label: 'Right Ear', default: false },
    { id: 'ear_r', label: 'Ear Ring', default: false },
  ],
  BODY: [
    { id: 'neck', label: 'Neck', default: false },
    { id: 'neck_l', label: 'Neck Line', default: false },
    { id: 'cloth', label: 'Clothing', default: false },
    { id: 'background', label: 'Background', default: false },
  ],
};

const allFaceParsingOptions = Object.values(featureCategories).flat();

const ImageCompare = ({ before, after }: { before: string, after: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    e.preventDefault();
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const upListener = () => isDragging.current = false;
    
    window.addEventListener('mouseup', upListener);
    window.addEventListener('touchend', upListener);
    
    const parent = container.parentElement;
    if(parent){
      parent.addEventListener('mousemove', handleMouseMove as any);
      parent.addEventListener('touchmove', handleTouchMove as any);
      parent.addEventListener('mouseup', handleMouseUp);
      parent.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', upListener);
      window.removeEventListener('touchend', upListener);
       if(parent){
        parent.removeEventListener('mousemove', handleMouseMove as any);
        parent.removeEventListener('touchmove', handleTouchMove as any);
        parent.removeEventListener('mouseup', handleMouseUp);
        parent.removeEventListener('touchend', handleMouseUp);
      }
    }
  }, [handleMouseMove, handleTouchMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full select-none"
    >
      <img src={after} alt="After" className="absolute top-0 left-0 w-full h-full object-contain" />
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden" 
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`}}
      >
        <img src={before} alt="Before" className="absolute top-0 left-0 w-full h-full object-contain" />
      </div>
      <div 
        className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center" 
        style={{ left: `${sliderPos}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="w-1 h-full bg-white/50"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-gray-800/80 rounded-full border-2 border-white/80 flex items-center justify-center cursor-ew-resize">
          <ChevronsUpDown size={20} className="text-white" />
        </div>
      </div>
    </div>
  )
}

const SkinRefinerPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const [cachedSession, setCachedSession] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const statusCheckIntervalRef = useRef<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [featureToggles, setFeatureToggles] = useState(() => 
    allFaceParsingOptions.reduce((acc, option) => {
      acc[option.id] = option.default;
      return acc;
    }, {} as {[key: string]: boolean})
  );

  const selectedFeatureCount = Object.values(featureToggles).filter(v => v).length;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setCachedSession(data.session);
        }
      } catch (error) {
        console.error("Error pre-fetching session:", error);
      }
    };
    
    fetchSession();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      setResultImage(null);
      setCurrentProject(null);
      
      if (statusCheckIntervalRef.current) {
        clearInterval(statusCheckIntervalRef.current);
        statusCheckIntervalRef.current = null;
      }
    }
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (!selectedFile) {
      toast({ title: 'No image selected', description: 'Please upload an image before refining.', variant: 'destructive' });
      return;
    }
    setProcessing(true);
    setResultImage(null); // Clear previous result

    try {
      let session;
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        session = cachedSession;
        if (!session) throw new Error('You must be logged in to use this tool.');
      } else {
        session = sessionData.session;
      }

      const functionFormData = new FormData();
      functionFormData.append('image', selectedFile);
      
      const optionsPayload = {
        ...featureToggles,
        enhancementMode: 'standard',
        skinTexture: 0.37,
        skinRealism: 1.7,
      };

      functionFormData.append('options', JSON.stringify(optionsPayload));

      const { data, error } = await supabase.functions.invoke('skin-refiner', {
        body: functionFormData,
      });

      if (error) throw error;

      toast({ title: 'Success!', description: data.message });
      setCurrentProject({ id: data.projectId, status: 'processing' });
      
      // Polling logic would go here
      // For now, let's mock a result after some time
      setTimeout(() => {
        setResultImage('/enhancor-assets/girl-image-result.png'); // Mock result
        setProcessing(false);
      }, 5000);

    } catch (error: any) {
      console.error('Error processing image:', error);
      toast({ 
        title: 'Error', 
        description: error.message,
        variant: 'destructive' 
      });
      setProcessing(false);
    }
  };

  const handleResetFeatures = () => {
    setFeatureToggles(
      allFaceParsingOptions.reduce((acc, option) => {
        acc[option.id] = option.default;
        return acc;
      }, {} as {[key: string]: boolean})
    );
  };
  
  return (
    <div className="bg-black text-slate-200 min-h-screen p-4 md:p-8 font-sans">
      <form onSubmit={handleSubmit}>
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-screen-2xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Input Image</h2>
                    <div className="flex items-center gap-4 text-sm">
                        <button type="button" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"><HelpCircle size={16} /> Help</button>
                        <button type="button" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"><RotateCcw size={16} /> Reset</button>
                    </div>
                </div>
                <label htmlFor="image-upload" className="relative block w-full aspect-video border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors group">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Uploaded preview" className="absolute inset-0 w-full h-full object-cover rounded-lg"/>
                    ) : (
                        <div className="text-center">
                            <Upload className="mx-auto h-10 w-10 text-gray-500 group-hover:text-indigo-500 transition-colors" />
                            <p className="mt-2 text-sm font-semibold text-slate-300">Click or drag to upload</p>
                            <p className="mt-1 text-xs text-slate-500">PNG or JPG</p>
                        </div>
                    )}
                </label>
                <input id="image-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg" />
                {selectedFile && <p className="text-sm text-center mt-3 text-slate-400">Selected: <span className="text-slate-200 font-medium">{selectedFile.name}</span></p>}
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                 <div onClick={() => setShowAdvanced(!showAdvanced)} className="flex justify-between items-center cursor-pointer">
                    <h2 className="text-xl font-semibold text-white">Advanced Settings</h2>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </div>
                {showAdvanced && (
                    <div className="mt-6">
                        <p className="text-sm text-slate-400 mb-6">Preserve certain facial features from enhancement.</p>
                        <div className="flex items-center gap-4 text-sm mb-6">
                            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">{selectedFeatureCount} selected</span>
                            <button type="button" onClick={handleResetFeatures} className="text-slate-400 hover:text-white transition-colors">Reset to defaults</button>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {Object.entries(featureCategories).map(([category, features]) => (
                                <div key={category} className="space-y-4">
                                    <h4 className="font-semibold text-slate-500 uppercase text-xs tracking-wider">{category}</h4>
                                    {features.map(feature => (
                                        <div key={feature.id} className="flex items-center gap-3">
                                            <Switch
                                                id={feature.id}
                                                checked={featureToggles[feature.id]}
                                                onCheckedChange={(checked) => setFeatureToggles(prev => ({...prev, [feature.id]: checked}))}
                                            />
                                            <Label htmlFor={feature.id} className="text-sm cursor-pointer">{feature.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <Button type="submit" size="lg" className="w-full bg-indigo-600 hover:bg-indigo-500 h-14 text-lg font-semibold text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all" disabled={processing}>
                {processing ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                ) : (
                    <><Wand2 className="w-5 h-5 mr-2" /> Enhance Skin</>
                )}
            </Button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Result</h2>
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                 {processing ? (
                    <Loader2 className="w-16 h-16 animate-spin text-indigo-500" />
                ) : resultImage && imagePreview ? (
                  <ImageCompare before={imagePreview} after={resultImage} />
                ) : (
                  <div className="text-slate-600">Your result will appear here</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
};

export default SkinRefinerPage; 