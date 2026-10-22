import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';

export interface TrackedFace {
  hasFace: boolean;
  // Normalized points (0..1)
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  eyeCenter: { x: number; y: number };
  noseBridge: { x: number; y: number };
  noseTip: { x: number; y: number };
  forehead: { x: number; y: number };
  chin: { x: number; y: number };
  leftCheek: { x: number; y: number };
  rightCheek: { x: number; y: number };
  mouthCenter: { x: number; y: number };
  mouthTop: { x: number; y: number };
  mouthBottom: { x: number; y: number };
  mouthLeft: { x: number; y: number };
  mouthRight: { x: number; y: number };
  // Key metrics
  angle: number; // Head roll in radians
  scale: number; // Proportional to face size
  eyeDistance: number;
  faceWidth: number;
  mouthOpenRatio: number; // 0..1 (mouth openness)
}

let faceLandmarkerInstance: FaceLandmarker | null = null;
let isInitializing = false;
let initPromise: Promise<FaceLandmarker | null> | null = null;

// Initialize MediaPipe FaceLandmarker with CDN wasm assets
export async function getFaceLandmarker(): Promise<FaceLandmarker | null> {
  if (faceLandmarkerInstance) return faceLandmarkerInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      isInitializing = true;
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      // Attempt GPU delegate first, fallback to CPU
      try {
        faceLandmarkerInstance = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          numFaces: 4
        });
      } catch (gpuErr) {
        console.warn('FaceLandmarker GPU delegate failed, falling back to CPU:', gpuErr);
        faceLandmarkerInstance = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'CPU'
          },
          runningMode: 'VIDEO',
          numFaces: 4
        });
      }

      return faceLandmarkerInstance;
    } catch (err) {
      console.warn('Could not initialize MediaPipe FaceLandmarker:', err);
      return null;
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
}

// Multi-face smoothing state to eliminate jitter for all detected faces
const smoothedFacesMap = new Map<number, TrackedFace>();

export function smoothFaceTracking(
  current: TrackedFace,
  lerpFactor: number = 0.45,
  faceIndex: number = 0
): TrackedFace {
  const previous = smoothedFacesMap.get(faceIndex);
  if (!previous || !previous.hasFace) {
    const clone = { ...current };
    smoothedFacesMap.set(faceIndex, clone);
    return current;
  }

  const lerp = (a: number, b: number) => a + (b - a) * lerpFactor;
  const lerpPt = (p1: { x: number; y: number }, p2: { x: number; y: number }) => ({
    x: lerp(p1.x, p2.x),
    y: lerp(p1.y, p2.y)
  });

  // Calculate smooth angle considering circular wrap
  let angleDiff = current.angle - previous.angle;
  while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
  while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
  const smoothAngle = previous.angle + angleDiff * lerpFactor;

  const updated: TrackedFace = {
    hasFace: true,
    leftEye: lerpPt(previous.leftEye, current.leftEye),
    rightEye: lerpPt(previous.rightEye, current.rightEye),
    eyeCenter: lerpPt(previous.eyeCenter, current.eyeCenter),
    noseBridge: lerpPt(previous.noseBridge, current.noseBridge),
    noseTip: lerpPt(previous.noseTip, current.noseTip),
    forehead: lerpPt(previous.forehead, current.forehead),
    chin: lerpPt(previous.chin, current.chin),
    leftCheek: lerpPt(previous.leftCheek, current.leftCheek),
    rightCheek: lerpPt(previous.rightCheek, current.rightCheek),
    mouthCenter: lerpPt(previous.mouthCenter, current.mouthCenter),
    mouthTop: lerpPt(previous.mouthTop, current.mouthTop),
    mouthBottom: lerpPt(previous.mouthBottom, current.mouthBottom),
    mouthLeft: lerpPt(previous.mouthLeft, current.mouthLeft),
    mouthRight: lerpPt(previous.mouthRight, current.mouthRight),
    angle: smoothAngle,
    scale: lerp(previous.scale, current.scale),
    eyeDistance: lerp(previous.eyeDistance, current.eyeDistance),
    faceWidth: lerp(previous.faceWidth, current.faceWidth),
    mouthOpenRatio: lerp(previous.mouthOpenRatio, current.mouthOpenRatio)
  };

  smoothedFacesMap.set(faceIndex, updated);
  return updated;
}

export function resetSmoothedFace() {
  smoothedFacesMap.clear();
}

// Extract geometric landmark metrics from 478 MediaPipe points
export function extractTrackedFace(landmarks: Array<{ x: number; y: number; z: number }>): TrackedFace {
  // Key MediaPipe Face Mesh Landmark indices
  // 33: Left eye outer, 133: Left eye inner
  // 263: Right eye outer, 362: Right eye inner
  // 168: Nose bridge, 1: Nose tip
  // 10: Forehead top center, 152: Chin bottom
  // 234: Left cheek, 454: Right cheek
  // 13: Upper lip bottom, 14: Lower lip top
  // 0: Upper lip top, 17: Lower lip bottom
  // 61: Left mouth corner, 291: Right mouth corner

  const p = (idx: number) => landmarks[idx] || { x: 0.5, y: 0.5, z: 0 };

  const leftEyeOuter = p(33);
  const leftEyeInner = p(133);
  const leftEye = {
    x: (leftEyeOuter.x + leftEyeInner.x) / 2,
    y: (leftEyeOuter.y + leftEyeInner.y) / 2
  };

  const rightEyeOuter = p(263);
  const rightEyeInner = p(362);
  const rightEye = {
    x: (rightEyeOuter.x + rightEyeInner.x) / 2,
    y: (rightEyeOuter.y + rightEyeInner.y) / 2
  };

  const eyeCenter = {
    x: (leftEye.x + rightEye.x) / 2,
    y: (leftEye.y + rightEye.y) / 2
  };

  const noseBridge = { x: p(168).x, y: p(168).y };
  const noseTip = { x: p(1).x, y: p(1).y };
  const forehead = { x: p(10).x, y: p(10).y };
  const chin = { x: p(152).x, y: p(152).y };
  const leftCheek = { x: p(234).x, y: p(234).y };
  const rightCheek = { x: p(454).x, y: p(454).y };

  const mouthTop = { x: p(0).x, y: p(0).y };
  const mouthBottom = { x: p(17).x, y: p(17).y };
  const innerUpperLip = { x: p(13).x, y: p(13).y };
  const innerLowerLip = { x: p(14).x, y: p(14).y };

  const mouthLeft = { x: p(61).x, y: p(61).y };
  const mouthRight = { x: p(291).x, y: p(291).y };
  const mouthCenter = {
    x: (mouthTop.x + mouthBottom.x) / 2,
    y: (mouthTop.y + mouthBottom.y) / 2
  };

  // Roll angle in radians
  const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);

  // Eye distance in normalized coordinates
  const eyeDistance = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);

  // Face width across cheeks
  const faceWidth = Math.hypot(rightCheek.x - leftCheek.x, rightCheek.y - leftCheek.y);

  // Mouth open ratio relative to face vertical height
  const faceHeight = Math.max(0.1, Math.hypot(chin.x - forehead.x, chin.y - forehead.y));
  const mouthInnerGap = Math.hypot(innerLowerLip.x - innerUpperLip.x, innerLowerLip.y - innerUpperLip.y);
  const mouthOpenRatio = Math.min(1, Math.max(0, (mouthInnerGap / faceHeight) * 4));

  // Normalized scale factor (standard portrait eyeDistance ~ 0.16)
  const scale = Math.max(0.4, Math.min(2.5, eyeDistance / 0.16));

  return {
    hasFace: true,
    leftEye,
    rightEye,
    eyeCenter,
    noseBridge,
    noseTip,
    forehead,
    chin,
    leftCheek,
    rightCheek,
    mouthCenter,
    mouthTop,
    mouthBottom,
    mouthLeft,
    mouthRight,
    angle,
    scale,
    eyeDistance,
    faceWidth,
    mouthOpenRatio
  };
}

// Fallback face anchor if detector is initializing or no face is in view
export function getCenteredDefaultFace(): TrackedFace {
  return {
    hasFace: false,
    leftEye: { x: 0.42, y: 0.45 },
    rightEye: { x: 0.58, y: 0.45 },
    eyeCenter: { x: 0.5, y: 0.45 },
    noseBridge: { x: 0.5, y: 0.47 },
    noseTip: { x: 0.5, y: 0.54 },
    forehead: { x: 0.5, y: 0.28 },
    chin: { x: 0.5, y: 0.76 },
    leftCheek: { x: 0.35, y: 0.56 },
    rightCheek: { x: 0.65, y: 0.56 },
    mouthCenter: { x: 0.5, y: 0.65 },
    mouthTop: { x: 0.5, y: 0.63 },
    mouthBottom: { x: 0.5, y: 0.67 },
    mouthLeft: { x: 0.45, y: 0.65 },
    mouthRight: { x: 0.55, y: 0.65 },
    angle: 0,
    scale: 1,
    eyeDistance: 0.16,
    faceWidth: 0.3,
    mouthOpenRatio: 0
  };
}
