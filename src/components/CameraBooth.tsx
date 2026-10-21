import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  FlipHorizontal, 
  Clock, 
  Sparkles, 
  Upload, 
  RefreshCw, 
  Check, 
  Trash2, 
  Sliders, 
  Zap, 
  AlertCircle,
  Film
} from 'lucide-react';
import { CapturedPhoto, FilterType, LayoutType } from '../types/photobooth';
import { soundFX } from '../utils/audio';
import { getFilterCssString } from '../utils/canvasExport';
import { SAMPLE_PHOTO_POSES } from '../data/samplePhotos';

interface CameraBoothProps {
  photos: CapturedPhoto[];
  onAddPhoto: (photo: CapturedPhoto) => void;
  onRemovePhoto: (id: string) => void;
  onReplacePhoto: (id: string, newPhoto: CapturedPhoto) => void;
  onClearPhotos: () => void;
  onLoadSamplePhotos: () => void;
  onProceedToStudio: () => void;
  activeFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
  layout: LayoutType;
  onChangeLayout: (layout: LayoutType) => void;
}

export const CameraBooth: React.FC<CameraBoothProps> = ({
  photos,
  onAddPhoto,
  onRemovePhoto,
  onReplacePhoto,
  onClearPhotos,
  onLoadSamplePhotos,
  onProceedToStudio,
  activeFilter,
  onChangeFilter,
  layout,
  onChangeLayout
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(3); // 0, 3, 5
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isBurstActive, setIsBurstActive] = useState(false);
  const [burstCurrentShot, setBurstCurrentShot] = useState<number>(0);
  const [burstTargetCount, setBurstTargetCount] = useState<number>(4);
  const [retakeTargetId, setRetakeTargetId] = useState<string | null>(null);

  // Maximum photos needed for current layout
  const requiredPhotos = layout === '4-cut-strip' || layout === '2x2-quad' ? 4 : layout === '3-cut-strip' ? 3 : layout === 'duo-wide' ? 2 : 1;

  // Start Camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err: unknown) {
      console.warn('Camera access denied or unavailable:', err);
      const message = err instanceof Error ? err.message : 'Camera could not be accessed';
      setCameraError(message);
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture single frame from video element
  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Apply mirror if mirrored
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isMirrored]);

  // Execute snapshot
  const triggerCapture = useCallback(() => {
    // Sound & flash
    soundFX.playShutter();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 350);

    let dataUrl: string | null = null;
    if (stream && videoRef.current) {
      dataUrl = captureFrame();
    }

    // Fallback if camera stream failed
    if (!dataUrl) {
      const fallbackIdx = photos.length % SAMPLE_PHOTO_POSES.length;
      dataUrl = SAMPLE_PHOTO_POSES[fallbackIdx];
    }

    const newPhoto: CapturedPhoto = {
      id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      dataUrl,
      timestamp: Date.now()
    };

    if (retakeTargetId) {
      onReplacePhoto(retakeTargetId, newPhoto);
      setRetakeTargetId(null);
    } else {
      onAddPhoto(newPhoto);
    }
  }, [captureFrame, onAddPhoto, onReplacePhoto, photos.length, retakeTargetId, stream]);

  // Handle countdown & burst capture
  const handleShutterClick = useCallback(() => {
    if (countdown !== null) return; // already counting down

    if (timerSeconds === 0) {
      triggerCapture();
      return;
    }

    let current = timerSeconds;
    setCountdown(current);
    soundFX.playTick();

    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
        soundFX.playTick();
      } else {
        clearInterval(interval);
        setCountdown(null);
        triggerCapture();
      }
    }, 1000);
  }, [countdown, timerSeconds, triggerCapture]);

  // Start automated multi-shot burst
  const handleStartBurst = useCallback(() => {
    if (isBurstActive || countdown !== null) return;
    setIsBurstActive(true);
    setBurstTargetCount(requiredPhotos);
    setBurstCurrentShot(1);

    const runShotSequence = (shotNum: number) => {
      setBurstCurrentShot(shotNum);
      let count = timerSeconds > 0 ? timerSeconds : 3;
      setCountdown(count);
      soundFX.playTick();

      const timer = setInterval(() => {
        count -= 1;
        if (count > 0) {
          setCountdown(count);
          soundFX.playTick();
        } else {
          clearInterval(timer);
          setCountdown(null);
          triggerCapture();

          if (shotNum < requiredPhotos) {
            // Wait 1.5 seconds before next countdown
            setTimeout(() => {
              runShotSequence(shotNum + 1);
            }, 1400);
          } else {
            // Burst complete!
            setIsBurstActive(false);
            setBurstCurrentShot(0);
            soundFX.playChime();
          }
        }
      }, 1000);
    };

    runShotSequence(1);
  }, [countdown, isBurstActive, requiredPhotos, timerSeconds, triggerCapture]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newPhoto: CapturedPhoto = {
            id: `upload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            dataUrl: result,
            timestamp: Date.now()
          };
          onAddPhoto(newPhoto);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Keyboard shortcut: Spacebar triggers shutter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handleShutterClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleShutterClick]);

  const filterOptions: { id: FilterType; label: string; desc: string }[] = [
    { id: 'normal', label: 'Natural', desc: 'True to life' },
    { id: 'vintage', label: 'Kodachrome', desc: '70s warm film' },
    { id: 'noir', label: 'Noir B&W', desc: 'High contrast' },
    { id: 'sepia', label: 'Sepia 80s', desc: 'Warm amber' },
    { id: 'warm90s', label: 'Golden 90s', desc: 'Vibrant punch' },
    { id: 'pastel', label: 'Seoul Pastel', desc: 'Soft dreamy' },
    { id: 'filmgrain', label: '35mm Grain', desc: 'Textured analog' },
    { id: 'cyberpunk', label: 'Tokyo Neon', desc: 'Cool violet' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      
      {/* Top Banner / Studio Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-white tracking-tight">
            Booth Camera
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
            Smile, strike a pose, and snap your customized photobooth strip.
          </p>
        </div>

        {/* Layout & Timer Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Selector */}
          <div className="bg-[#181920] border border-[#2a2c36] rounded-lg p-1 flex items-center">
            <button
              onClick={() => onChangeLayout('4-cut-strip')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                layout === '4-cut-strip'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              4-Cut Strip
            </button>
            <button
              onClick={() => onChangeLayout('3-cut-strip')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                layout === '3-cut-strip'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              3-Cut Strip
            </button>
            <button
              onClick={() => onChangeLayout('2x2-quad')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                layout === '2x2-quad'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              2x2 Quad
            </button>
            <button
              onClick={() => onChangeLayout('polaroid')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                layout === 'polaroid'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Polaroid
            </button>
          </div>

          {/* Countdown Selector */}
          <div className="bg-[#181920] border border-[#2a2c36] rounded-lg p-1 flex items-center">
            <span className="px-2 text-xs text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
            </span>
            {[0, 3, 5].map((sec) => (
              <button
                key={sec}
                onClick={() => setTimerSeconds(sec)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
                  timerSeconds === sec
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {sec === 0 ? 'Off' : `${sec}s`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Viewport + Live Strip Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Viewport & Camera Stage (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Camera Viewport Container */}
          <div className="relative aspect-[4/3] w-full bg-[#121318] border border-[#262833] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Live Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                filter: getFilterCssString(activeFilter),
                transform: isMirrored ? 'scaleX(-1)' : 'none'
              }}
              className={`w-full h-full object-cover transition-all duration-150 ${
                cameraError ? 'hidden' : 'block'
              }`}
            />

            {/* Camera Error / Permission Fallback View */}
            {cameraError && (
              <div className="p-8 text-center max-w-md">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Camera Unavailable
                </h3>
                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                  Webcam access might be blocked in this sandbox or permission was denied. You can still create beautiful photobooth strips using demo studio portraits or your own photo uploads!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    onClick={onLoadSamplePhotos}
                    className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load 4 Demo Poses</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photos</span>
                  </button>
                  <button
                    onClick={startCamera}
                    className="px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Camera</span>
                  </button>
                </div>
              </div>
            )}

            {/* Camera Flash Overlay */}
            {isFlashing && (
              <div className="absolute inset-0 bg-white camera-flash pointer-events-none z-30" />
            )}

            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center z-20">
                <span className="text-8xl md:text-9xl font-bold font-mono text-white animate-pulse drop-shadow-lg">
                  {countdown}
                </span>
                {isBurstActive && (
                  <span className="text-sm font-medium text-rose-300 mt-2 bg-black/50 px-3 py-1 rounded-full">
                    Shot {burstCurrentShot} of {burstTargetCount}
                  </span>
                )}
              </div>
            )}

            {/* Viewport HUD Overlays */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              {/* Filter badge */}
              <div className="pointer-events-auto bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-300 flex items-center gap-1.5 border border-white/10">
                <Sliders className="w-3 h-3 text-rose-400" />
                <span className="capitalize">{activeFilter} Filter</span>
              </div>

              {/* Viewport Quick Controls */}
              <div className="pointer-events-auto flex items-center gap-1.5">
                <button
                  onClick={() => setIsMirrored(!isMirrored)}
                  className={`p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 transition-colors ${
                    isMirrored ? 'text-rose-400' : 'text-zinc-300'
                  } hover:bg-black/80`}
                  title="Toggle Mirror Camera"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Retake Indicator if active */}
            {retakeTargetId && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-amber-500/90 text-black px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5 z-20">
                <span>Retaking Shot</span>
                <button 
                  onClick={() => setRetakeTargetId(null)}
                  className="ml-1 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Shutter & Capture Controls Bar */}
          <div className="bg-[#14151b] border border-[#262833] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left Aux Controls */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#1e2029] hover:bg-[#282a36] border border-[#303342] rounded-lg transition-colors flex items-center gap-1.5"
                title="Upload custom photos from device"
              >
                <Upload className="w-3.5 h-3.5 text-rose-400" />
                <span>Upload Photo</span>
              </button>

              <button
                onClick={onLoadSamplePhotos}
                className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-[#1e2029] hover:bg-[#282a36] border border-[#303342] rounded-lg transition-colors flex items-center gap-1.5"
                title="Populate with styled demo poses"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Demo Poses</span>
              </button>
            </div>

            {/* Center Shutter & Burst Buttons */}
            <div className="flex items-center gap-3 mx-auto sm:mx-0">
              {/* Single Shutter */}
              <button
                onClick={handleShutterClick}
                disabled={countdown !== null}
                className="relative group p-1.5 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 shadow-lg shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                title="Snap Photo (or press Spacebar)"
              >
                <div className="w-14 h-14 rounded-full border-2 border-white/80 bg-rose-500 flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
              </button>

              {/* Automated Burst Mode */}
              <button
                onClick={handleStartBurst}
                disabled={isBurstActive || countdown !== null}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#1e2029] hover:bg-[#282a36] border border-rose-500/40 rounded-xl transition-all flex items-center gap-1.5 hover:border-rose-500 disabled:opacity-50"
                title={`Take automated ${requiredPhotos}-shot sequence`}
              >
                <Zap className="w-4 h-4 text-rose-400" />
                <span>Auto Burst ({requiredPhotos}x)</span>
              </button>
            </div>

            {/* Right Status */}
            <div className="text-right">
              <span className="text-xs font-mono text-zinc-400 block">
                {photos.length} / {requiredPhotos} Snapped
              </span>
              <span className="text-[11px] text-zinc-500">
                Spacebar to snap
              </span>
            </div>
          </div>

          {/* Filter Selection Ribbon */}
          <div className="bg-[#14151b] border border-[#262833] rounded-2xl p-3.5">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-rose-400" />
                <span>Film Color Filters</span>
              </span>
              <span className="text-[11px] text-zinc-500">Live camera preview</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filterOptions.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onChangeFilter(f.id)}
                    className={`px-3 py-2 rounded-xl text-left transition-all shrink-0 border ${
                      isActive
                        ? 'bg-rose-950/40 border-rose-500/80 text-white'
                        : 'bg-[#1b1c24] border-[#2b2d3a] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
                    }`}
                  >
                    <span className="text-xs font-semibold block leading-tight">
                      {f.label}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">
                      {f.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Strip Queue & Quick Review (4 cols) */}
        <div className="lg:col-span-4 bg-[#14151b] border border-[#262833] rounded-2xl p-4 flex flex-col gap-4">
          
          <div className="flex items-center justify-between border-b border-[#262833] pb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Strip Photos ({photos.length}/{requiredPhotos})
              </h2>
              <span className="text-[11px] text-zinc-400">
                {photos.length >= requiredPhotos ? 'Ready to customize!' : `Need ${requiredPhotos - photos.length} more`}
              </span>
            </div>

            {photos.length > 0 && (
              <button
                onClick={onClearPhotos}
                className="text-xs text-zinc-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                title="Clear all photos"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Photo Slot Stack */}
          <div className="space-y-3 min-h-[340px]">
            {Array.from({ length: requiredPhotos }).map((_, index) => {
              const photo = photos[index];
              return (
                <div
                  key={index}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all ${
                    photo
                      ? 'border-[#3a3d4d] bg-black shadow-md'
                      : 'border-dashed border-zinc-700 bg-zinc-900/30 flex flex-col items-center justify-center'
                  }`}
                >
                  {photo ? (
                    <>
                      <img
                        src={photo.dataUrl}
                        alt={`Pose ${index + 1}`}
                        style={{ filter: getFilterCssString(activeFilter) }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white">
                        #{index + 1}
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setRetakeTargetId(photo.id);
                            handleShutterClick();
                          }}
                          className="p-1.5 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 text-xs flex items-center gap-1"
                          title="Retake this photo"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Retake</span>
                        </button>
                        <button
                          onClick={() => onRemovePhoto(photo.id)}
                          className="p-1.5 bg-rose-600/80 text-white rounded-lg hover:bg-rose-500 text-xs"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-3">
                      <div className="w-7 h-7 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mx-auto mb-1 text-zinc-500 font-mono text-xs">
                        {index + 1}
                      </div>
                      <span className="text-[11px] text-zinc-500 font-medium">
                        Empty Slot
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Continue CTA */}
          <div className="pt-2 border-t border-[#262833]">
            <button
              onClick={onProceedToStudio}
              disabled={photos.length === 0}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-xl transition-all shadow-md shadow-rose-900/30 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Customize Photostrip</span>
              {photos.length >= requiredPhotos && (
                <Check className="w-4 h-4 ml-1 text-emerald-300" />
              )}
            </button>
            <p className="text-[11px] text-zinc-400 text-center mt-2">
              Add frame styles, stickers, custom quotes & print
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
