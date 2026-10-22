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
  Film,
  Smile
} from 'lucide-react';
import { CapturedPhoto, FilterType, LayoutType } from '../types/photobooth';
import { soundFX } from '../utils/audio';
import { getFilterCssString } from '../utils/canvasExport';
import { SAMPLE_PHOTO_POSES } from '../data/samplePhotos';
import { TIKTOK_FACE_FILTERS, FaceFilterDef, renderFaceARFilter } from '../utils/faceARRenderer';
import { getFaceLandmarker, extractTrackedFace, smoothFaceTracking, getCenteredDefaultFace, TrackedFace } from '../utils/faceTracker';
import type { FaceLandmarker } from '@mediapipe/tasks-vision';

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
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const trackedFaceRef = useRef<TrackedFace>(getCenteredDefaultFace());

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

  // TikTok / Instagram Face Filter state
  const [activeFaceFilter, setActiveFaceFilter] = useState<string>('peach-dream');
  const [faceFilterCategory, setFaceFilterCategory] = useState<string>('all');
  const [isLandmarkerReady, setIsLandmarkerReady] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  // Maximum photos needed for current layout
  const requiredPhotos = layout === '4-cut-strip' || layout === '2x2-quad' ? 4 : layout === '3-cut-strip' ? 3 : layout === 'duo-wide' ? 2 : 1;

  // Initialize MediaPipe Face Landmarker
  useEffect(() => {
    let isMounted = true;
    getFaceLandmarker().then((lm) => {
      if (isMounted && lm) {
        landmarkerRef.current = lm;
        setIsLandmarkerReady(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Real-time 60FPS Face Tracking & Canvas AR loop
  useEffect(() => {
    let animId: number;
    let lastVideoTime = -1;

    const runLoop = () => {
      if (videoRef.current && overlayCanvasRef.current) {
        const video = videoRef.current;
        const canvas = overlayCanvasRef.current;

        if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Process new video frame with MediaPipe Face Landmarker
            if (landmarkerRef.current && video.currentTime !== lastVideoTime) {
              lastVideoTime = video.currentTime;
              try {
                const results = landmarkerRef.current.detectForVideo(video, performance.now());
                if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                  const rawFace = extractTrackedFace(results.faceLandmarks[0]);
                  const smoothed = smoothFaceTracking(rawFace, 0.45);
                  trackedFaceRef.current = smoothed;
                  setFaceDetected(true);
                } else {
                  setFaceDetected(false);
                }
              } catch {
                // Ignore dropped frame
              }
            }

            // Render live Face AR Filter
            renderFaceARFilter(
              ctx,
              canvas.width,
              canvas.height,
              trackedFaceRef.current,
              activeFaceFilter,
              isMirrored,
              performance.now()
            );
          }
        }
      }
      animId = requestAnimationFrame(runLoop);
    };

    animId = requestAnimationFrame(runLoop);
    return () => cancelAnimationFrame(animId);
  }, [activeFaceFilter, isMirrored]);

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

  // Capture single frame from video element with live face filter overlay baked in!
  const captureFrame = useCallback(async (): Promise<string | null> => {
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

    // Reset transform for filter drawing
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Bake live tracked Face AR filter directly onto the snapshot!
    renderFaceARFilter(
      ctx,
      canvas.width,
      canvas.height,
      trackedFaceRef.current,
      activeFaceFilter,
      isMirrored,
      performance.now()
    );

    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isMirrored, activeFaceFilter]);

  // Execute snapshot
  const triggerCapture = useCallback(async () => {
    soundFX.playShutter();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 350);

    let dataUrl: string | null = null;
    if (stream && videoRef.current) {
      dataUrl = await captureFrame();
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
    if (countdown !== null) return;

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
            setTimeout(() => {
              runShotSequence(shotNum + 1);
            }, 1400);
          } else {
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
    { id: 'normal', label: 'Natural', desc: 'คลีนใสธรรมชาติ' },
    { id: 'softglow', label: 'Seoul Glow', desc: 'ละมุนผิว เกาหลี' },
    { id: 'vintage', label: 'Kodachrome', desc: 'ฟิล์มโกดัก 70s' },
    { id: 'fujifilm', label: 'Fuji Chrome', desc: 'เขียวมัทฉะสดใส' },
    { id: 'warm90s', label: 'Golden 90s', desc: 'แดดสีทองอบอุ่น' },
    { id: 'sunset', label: 'Sunset Aura', desc: 'แสงอาทิตย์ตกดิน' },
    { id: 'pastel', label: 'Pastel Dream', desc: 'ฮาราจูกุนุ่มฟุ้ง' },
    { id: 'noir', label: 'Noir B&W', desc: 'ขาวดำสตรีทเข้ม' },
    { id: 'sepia', label: 'Sepia Vintage', desc: 'แอมเบอร์ย้อนยุค' },
    { id: 'filmgrain', label: '35mm Grain', desc: 'เกรนฟิล์มอะนาล็อก' },
    { id: 'cyberpunk', label: 'Tokyo Neon', desc: 'ม่วงนีออนไซเบอร์' },
    { id: 'cinematic', label: 'Teal & Orange', desc: 'โทนภาพยนตร์' }
  ];

  const currentFace = TIKTOK_FACE_FILTERS.find((f) => f.id === activeFaceFilter) || TIKTOK_FACE_FILTERS[0];

  const filteredFaceFilters = TIKTOK_FACE_FILTERS.filter((f) => {
    if (faceFilterCategory === 'all') return true;
    return f.category === faceFilterCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      
      {/* Top Banner / Studio Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <span>Booth Camera</span>
            <span className="text-[11px] font-sans font-medium text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Live TikTok Face AR
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            ฟิลเตอร์หน้าสดใสแบบ TikTok & IG ตามการเอียงหน้า ขยับปาก และมุมกล้องเรียลไทม์!
          </p>
        </div>

        {/* Layout & Timer Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Selector */}
          <div className="bg-[#181920] border border-[#2a2c36] rounded-lg p-1 flex items-center">
            <button
              onClick={() => onChangeLayout('4-cut-strip')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                layout === '4-cut-strip'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              4-Cut
            </button>
            <button
              onClick={() => onChangeLayout('3-cut-strip')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                layout === '3-cut-strip'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              3-Cut
            </button>
            <button
              onClick={() => onChangeLayout('2x2-quad')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                layout === '2x2-quad'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              2x2
            </button>
            <button
              onClick={() => onChangeLayout('polaroid')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
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
            <span className="px-1.5 text-xs text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
            </span>
            {[0, 3, 5].map((sec) => (
              <button
                key={sec}
                onClick={() => setTimerSeconds(sec)}
                className={`px-2 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
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

            {/* LIVE REAL-TIME FACE TRACKING AR CANVAS (60FPS - Tracks face, eyes, ears, mouth!) */}
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 pointer-events-none z-15 w-full h-full object-cover"
            />

            {/* Camera Error / Permission Fallback View */}
            {cameraError && (
              <div className="p-8 text-center max-w-md z-20">
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
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center z-25">
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
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              {/* Active face filter badge & tracking status */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="pointer-events-auto bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-300 flex items-center gap-1.5 border border-white/10">
                  <span className="text-sm">{currentFace?.icon || '✨'}</span>
                  <span className="font-semibold text-white">{currentFace?.name}</span>
                </div>

                {/* Real-time Tracking Status Badge */}
                <div className={`pointer-events-auto px-2 py-0.5 rounded-md text-[10px] font-medium backdrop-blur-md flex items-center gap-1.5 border ${
                  faceDetected
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-xs'
                    : isLandmarkerReady
                    ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                    : 'bg-zinc-900/80 border-zinc-700 text-zinc-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${faceDetected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>
                    {faceDetected
                      ? 'AI Face Mesh: ตามหน้าสดเรียลไทม์'
                      : isLandmarkerReady
                      ? 'ส่องหน้าเข้ากล้องเพื่อเริ่มตาม'
                      : 'เตรียม AI Face Tracker...'}
                  </span>
                </div>
              </div>

              {/* Viewport Mirror Toggle */}
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
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-amber-500/90 text-black px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5 z-25">
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

          {/* TIKTOK & INSTAGRAM LIVE FACE AR FILTERS SELECTOR */}
          <div className="bg-[#14151b] border border-[#262833] rounded-2xl p-3.5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center text-white text-xs shadow-xs">
                  <Smile className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block leading-none">
                    ฟิลเตอร์หน้าสไตล์ TikTok & Instagram (Face AR)
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    หมาลิ้นห้อยเมื่ออ้าปาก, หูแมว, แว่นหัวใจ, ผีเสื้อบิน, กลามัวร์หน้าเป๊ะ (ขยับตามหน้าจริง)
                  </span>
                </div>
              </div>

              {/* Category tabs */}
              <div className="flex items-center gap-1 bg-[#1a1b22] border border-[#292b38] rounded-lg p-0.5">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'beauty', label: '✨ สวยหวานเกาหลี' },
                  { id: 'cute', label: '🐾 สัตว์คาวาอี้' },
                  { id: 'trendy', label: '🕶️ Y2K & แฟชั่น' },
                  { id: 'funny', label: '😭 สายมีมฮาๆ' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFaceFilterCategory(cat.id)}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-colors whitespace-nowrap ${
                      faceFilterCategory === cat.id
                        ? 'bg-rose-600 text-white'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Buttons Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filteredFaceFilters.map((ff) => {
                const isSelected = activeFaceFilter === ff.id;
                return (
                  <button
                    key={ff.id}
                    onClick={() => {
                      setActiveFaceFilter(ff.id);
                      soundFX.playPop();
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all shrink-0 border ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500 text-white shadow-sm ring-1 ring-rose-500/40'
                        : 'bg-[#1b1c24] border-[#2b2d3a] text-zinc-400 hover:text-white hover:border-zinc-600'
                    }`}
                  >
                    <span className="text-xl shrink-0">{ff.icon}</span>
                    <div className="text-left">
                      <span className="text-xs font-bold block leading-tight whitespace-nowrap">
                        {ff.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 block truncate max-w-[130px]">
                        {ff.tagline}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
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
                className="px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#1e2029] hover:bg-[#282a36] border border-[#303342] rounded-lg transition-colors flex items-center gap-1.5"
                title="Upload custom photos from device"
              >
                <Upload className="w-3.5 h-3.5 text-rose-400" />
                <span>Upload</span>
              </button>

              <button
                onClick={onLoadSamplePhotos}
                className="px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#1e2029] hover:bg-[#282a36] border border-[#303342] rounded-lg transition-colors flex items-center gap-1.5"
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
              <span className="text-xs font-mono text-zinc-400 block font-bold">
                {photos.length} / {requiredPhotos} Snapped
              </span>
              <span className="text-[10px] text-zinc-500">
                Spacebar to snap
              </span>
            </div>
          </div>

          {/* Film Color Tones Ribbon */}
          <div className="bg-[#14151b] border border-[#262833] rounded-2xl p-3.5">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-rose-400" />
                <span>โทนสีฟิล์ม (Film Color Tones)</span>
              </span>
              <span className="text-[10px] text-zinc-500">12 สไตล์</span>
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
                        ? 'bg-rose-950/40 border-rose-500/80 text-white shadow-xs'
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
              Add cute stickers, ribbons, custom quotes & print
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
