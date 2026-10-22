import { TrackedFace } from './faceTracker';

export interface FaceFilterDef {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  category: 'tiktok' | 'beauty' | 'funny' | 'aesthetic';
}

export const TIKTOK_FACE_FILTERS: FaceFilterDef[] = [
  {
    id: 'none',
    name: 'ไม่มีฟิลเตอร์ (None)',
    tagline: 'ภาพกล้องปกติ ไม่ใส่เอฟเฟกต์หน้า',
    icon: '🚫',
    category: 'beauty'
  },
  {
    id: 'tiktok-dog',
    name: 'TikTok น้องหมาลิ้นห้อย (Doggy)',
    tagline: 'หูน้องหมาดุ๊กดิ๊ก + จมูกดำ + อ้าปากแล้วลิ้นห้อยสมจริง!',
    icon: '🐶',
    category: 'tiktok'
  },
  {
    id: 'tiktok-cat',
    name: 'TikTok แมวเหมียวคาวาอี้ (Neko Cat)',
    tagline: 'หูแมวชมพู + หนวดแมวดุ๊กดิ๊กตามแก้ม + จมูกหัวใจ + แก้มบลัช',
    icon: '🐱',
    category: 'tiktok'
  },
  {
    id: 'tiktok-heart-glasses',
    name: 'แว่นหัวใจ Y2K (Heart Shades)',
    tagline: 'แว่นกันแดดรูปหัวใจสีชมพูประกายเงา เกาะดั้งตามการเอียงหน้า',
    icon: '🕶️',
    category: 'aesthetic'
  },
  {
    id: 'tiktok-butterflies',
    name: 'ผีเสื้อทองคำบินรอบหัว (Butterflies)',
    tagline: 'ผีเสื้อสีทอง 3D กระพือปีกบินรอบหน้า + ประกายดาวสีทองวิ้งวับ',
    icon: '🦋',
    category: 'aesthetic'
  },
  {
    id: 'tiktok-glamour',
    name: 'TikTok Bold Glamour (หน้าเป๊ะตัวแม่)',
    tagline: 'กรีดอายไลเนอร์คมกริบ + ลิปกลอสฉ่ำวาว + บลัชออนโหนกแก้ม',
    icon: '💄',
    category: 'beauty'
  },
  {
    id: 'tiktok-peach-stars',
    name: 'แก้มส้มดาววิ้งเกาหลี (Peach & Stars)',
    tagline: 'บลัชส้มพีชฟุ้งทั่วดั้งและแก้ม + กระดาวสีเหลืองและประกายวิ้ง',
    icon: '🌸',
    category: 'beauty'
  },
  {
    id: 'tiktok-cyber-devil',
    name: 'เดวิลนีออนเขาแดง (Neon Devil)',
    tagline: 'เขาปีศาจเรืองแสงนีออนสีแดงม่วง + ตาเฉี่ยวโกธิค + ปากดาร์กเบอร์รี่',
    icon: '😈',
    category: 'tiktok'
  },
  {
    id: 'tiktok-angel',
    name: 'แองเจิลวงแหวนทอง (Cyber Angel)',
    tagline: 'วงแหวนนางฟ้าลอยเหนือหัวตามมุมเอียง + หยดน้ำตาดาวคริสตัล',
    icon: '👼',
    category: 'aesthetic'
  },
  {
    id: 'tiktok-tiara',
    name: 'มงกุฎเจ้าหญิงคริสตัล (Princess Tiara)',
    tagline: 'มงกุฎเพชรส่องประกายระยิบระยับ สวมบนหน้าผากตามแนวศีรษะ',
    icon: '👑',
    category: 'beauty'
  },
  {
    id: 'tiktok-crying',
    name: 'ร้องไห้น้ำตานอง (Crying Meme)',
    tagline: 'น้ำตาการ์ตูนไหลพรากสมจริงสองข้างแก้ม + จมูกแดงงอแง',
    icon: '😭',
    category: 'funny'
  },
  {
    id: 'tiktok-mustache',
    name: 'หนวดลุง & แว่นกลมวินเทจ (Mustache & Specs)',
    tagline: 'หนวดม้วนสุดกวนขยับตามปาก + แว่นตาวินเทจเกาะดั้งจมูก',
    icon: '🥸',
    category: 'funny'
  },
  {
    id: 'tiktok-kirakira',
    name: 'KiraKira ประกายเพชร (Super Glitter)',
    tagline: 'ประกายดาวเพชร 8 แฉก หมุนวิบวับทั่วใบหน้าตามจุดไฮไลต์',
    icon: '✨',
    category: 'aesthetic'
  }
];

// Helper to convert normalized coordinate to canvas pixel space
function getCanvasCoords(
  pt: { x: number; y: number },
  width: number,
  height: number,
  isMirrored: boolean
): { x: number; y: number } {
  return {
    x: isMirrored ? (1 - pt.x) * width : pt.x * width,
    y: pt.y * height
  };
}

// Master rendering function for Face AR Filters
export function renderFaceARFilter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  face: TrackedFace,
  filterId: string,
  isMirrored: boolean,
  timeMs: number = Date.now()
) {
  if (filterId === 'none') return;

  const toPx = (pt: { x: number; y: number }) => getCanvasCoords(pt, width, height, isMirrored);

  // Transform key points
  const leftEye = toPx(face.leftEye);
  const rightEye = toPx(face.rightEye);
  const eyeCenter = toPx(face.eyeCenter);
  const noseBridge = toPx(face.noseBridge);
  const noseTip = toPx(face.noseTip);
  const forehead = toPx(face.forehead);
  const leftCheek = toPx(face.leftCheek);
  const rightCheek = toPx(face.rightCheek);
  const mouthCenter = toPx(face.mouthCenter);
  const mouthTop = toPx(face.mouthTop);
  const mouthBottom = toPx(face.mouthBottom);
  const mouthLeft = toPx(face.mouthLeft);
  const mouthRight = toPx(face.mouthRight);

  // When mirrored, the head roll angle flips
  const roll = isMirrored ? -face.angle : face.angle;
  const eyeDistPx = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
  const scale = eyeDistPx / 100; // Reference 100px eye distance
  const baseScale = Math.max(0.4, Math.min(2.5, scale));

  ctx.save();

  switch (filterId) {
    // ----------------------------------------------------
    // 1. TIKTOK DOGGY FILTER (With mouth-reactive tongue!)
    // ----------------------------------------------------
    case 'tiktok-dog': {
      // 1. Dog Ears at forehead
      const earOffset = 80 * baseScale;
      const earW = 60 * baseScale;
      const earH = 95 * baseScale;

      // Draw Left Dog Ear (floppy sway)
      const swayLeft = Math.sin(timeMs * 0.005) * 0.08;
      ctx.save();
      ctx.translate(forehead.x - Math.cos(roll) * earOffset, forehead.y - Math.sin(roll) * earOffset);
      ctx.rotate(roll - 0.4 + swayLeft);
      // Outer ear
      ctx.beginPath();
      ctx.ellipse(0, earH / 2, earW / 2, earH / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#C27838'; // Golden brown dog fur
      ctx.fill();
      ctx.lineWidth = 3.5 * baseScale;
      ctx.strokeStyle = '#6E3C16';
      ctx.stroke();
      // Inner ear flap
      ctx.beginPath();
      ctx.ellipse(0, earH / 2 + 5 * baseScale, earW / 3, earH / 2.8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F4A261';
      ctx.fill();
      ctx.restore();

      // Draw Right Dog Ear
      const swayRight = Math.cos(timeMs * 0.005) * 0.08;
      ctx.save();
      ctx.translate(forehead.x + Math.cos(roll) * earOffset, forehead.y + Math.sin(roll) * earOffset);
      ctx.rotate(roll + 0.4 + swayRight);
      // Outer ear
      ctx.beginPath();
      ctx.ellipse(0, earH / 2, earW / 2, earH / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#C27838';
      ctx.fill();
      ctx.lineWidth = 3.5 * baseScale;
      ctx.strokeStyle = '#6E3C16';
      ctx.stroke();
      // Inner ear flap
      ctx.beginPath();
      ctx.ellipse(0, earH / 2 + 5 * baseScale, earW / 3, earH / 2.8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F4A261';
      ctx.fill();
      ctx.restore();

      // 2. Shiny Dog Nose at noseTip
      ctx.save();
      ctx.translate(noseTip.x, noseTip.y);
      ctx.rotate(roll);
      const noseR = 22 * baseScale;
      ctx.beginPath();
      ctx.ellipse(0, 0, noseR, noseR * 0.72, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#18181B';
      ctx.fill();
      ctx.lineWidth = 2 * baseScale;
      ctx.strokeStyle = '#27272A';
      ctx.stroke();

      // Specular highlight on nose
      ctx.beginPath();
      ctx.ellipse(-noseR * 0.35, -noseR * 0.25, noseR * 0.3, noseR * 0.18, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();

      // Cute muzzle whiskers dots
      ctx.fillStyle = '#52525B';
      const dotR = 2.2 * baseScale;
      [-1, 1].forEach((dir) => {
        const dx = dir * (noseR * 1.5);
        ctx.beginPath();
        ctx.arc(dx, 4 * baseScale, dotR, 0, Math.PI * 2);
        ctx.arc(dx + dir * 6 * baseScale, -2 * baseScale, dotR, 0, Math.PI * 2);
        ctx.arc(dx + dir * 5 * baseScale, 10 * baseScale, dotR, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 3. REACTIVE DOG TONGUE (Sticks out when mouth is open!)
      const isMouthOpen = face.mouthOpenRatio > 0.08;
      const tongueAnim = isMouthOpen ? Math.min(1, face.mouthOpenRatio * 2.5) : 0;

      if (tongueAnim > 0.05) {
        ctx.save();
        ctx.translate(mouthBottom.x, mouthBottom.y);
        ctx.rotate(roll);
        const tongueW = 34 * baseScale * tongueAnim;
        const tongueLen = (55 + Math.sin(timeMs * 0.015) * 4) * baseScale * tongueAnim;

        // Tongue shape
        ctx.beginPath();
        ctx.moveTo(-tongueW / 2, 0);
        ctx.bezierCurveTo(
          -tongueW / 2,
          tongueLen * 0.6,
          -tongueW * 0.2,
          tongueLen,
          0,
          tongueLen
        );
        ctx.bezierCurveTo(
          tongueW * 0.2,
          tongueLen,
          tongueW / 2,
          tongueLen * 0.6,
          tongueW / 2,
          0
        );
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 0, tongueLen);
        grad.addColorStop(0, '#FB7185');
        grad.addColorStop(0.7, '#F43F5E');
        grad.addColorStop(1, '#BE123C');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.lineWidth = 2.5 * baseScale;
        ctx.strokeStyle = '#9F1239';
        ctx.stroke();

        // Center crease line
        ctx.beginPath();
        ctx.moveTo(0, 4 * baseScale);
        ctx.lineTo(0, tongueLen * 0.72);
        ctx.strokeStyle = '#9F1239';
        ctx.lineWidth = 2 * baseScale;
        ctx.stroke();

        // Droplet sparkle
        ctx.beginPath();
        ctx.arc(tongueW * 0.2, tongueLen * 0.7, 3 * baseScale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        ctx.restore();
      }
      break;
    }

    // ----------------------------------------------------
    // 2. TIKTOK ANIME NEKO (Kitty Cat with animated whiskers)
    // ----------------------------------------------------
    case 'tiktok-cat': {
      // 1. Kitty Ears on forehead
      const earOffset = 70 * baseScale;
      const earSize = 58 * baseScale;

      [-1, 1].forEach((dir) => {
        ctx.save();
        ctx.translate(forehead.x + dir * Math.cos(roll) * earOffset, forehead.y + dir * Math.sin(roll) * earOffset);
        ctx.rotate(roll + dir * 0.25);

        // White outer fluffy ear
        ctx.beginPath();
        ctx.moveTo(-earSize * 0.45, 0);
        ctx.lineTo(dir * -earSize * 0.1, -earSize * 1.3);
        ctx.lineTo(earSize * 0.55, 0);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.lineWidth = 4 * baseScale;
        ctx.strokeStyle = '#FB7185';
        ctx.stroke();

        // Pink inner ear
        ctx.beginPath();
        ctx.moveTo(-earSize * 0.25, -earSize * 0.1);
        ctx.lineTo(dir * -earSize * 0.08, -earSize * 1.05);
        ctx.lineTo(earSize * 0.35, -earSize * 0.1);
        ctx.closePath();
        ctx.fillStyle = '#FDA4AF';
        ctx.fill();

        // Little fur tuft
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5 * baseScale;
        ctx.beginPath();
        ctx.moveTo(-earSize * 0.1, -earSize * 0.2);
        ctx.lineTo(-earSize * 0.25, -earSize * 0.35);
        ctx.stroke();

        ctx.restore();
      });

      // 2. Cute Pink Kitty Nose at noseTip
      ctx.save();
      ctx.translate(noseTip.x, noseTip.y);
      ctx.rotate(roll);
      const kSize = 13 * baseScale;
      ctx.beginPath();
      ctx.moveTo(-kSize, -kSize * 0.3);
      ctx.lineTo(kSize, -kSize * 0.3);
      ctx.lineTo(0, kSize * 0.7);
      ctx.closePath();
      ctx.fillStyle = '#F43F5E';
      ctx.fill();
      ctx.lineWidth = 1.5 * baseScale;
      ctx.strokeStyle = '#BE123C';
      ctx.stroke();
      ctx.restore();

      // 3. Dynamic Cat Whiskers on cheeks
      const whiskerLen = 50 * baseScale;
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2.5 * baseScale;
      ctx.lineCap = 'round';

      // Left Cheek Whiskers
      [-0.15, 0, 0.15].forEach((wAngle) => {
        ctx.beginPath();
        ctx.moveTo(leftCheek.x, leftCheek.y);
        ctx.lineTo(
          leftCheek.x - Math.cos(roll + wAngle) * whiskerLen,
          leftCheek.y - Math.sin(roll + wAngle) * whiskerLen
        );
        ctx.stroke();
      });

      // Right Cheek Whiskers
      [-0.15, 0, 0.15].forEach((wAngle) => {
        ctx.beginPath();
        ctx.moveTo(rightCheek.x, rightCheek.y);
        ctx.lineTo(
          rightCheek.x + Math.cos(roll + wAngle) * whiskerLen,
          rightCheek.y + Math.sin(roll + wAngle) * whiskerLen
        );
        ctx.stroke();
      });

      // 4. Soft Kawaii Cheek Blush
      [leftCheek, rightCheek].forEach((cheek) => {
        const blushGrad = ctx.createRadialGradient(
          cheek.x,
          cheek.y,
          0,
          cheek.x,
          cheek.y,
          32 * baseScale
        );
        blushGrad.addColorStop(0, 'rgba(251, 113, 133, 0.45)');
        blushGrad.addColorStop(1, 'rgba(251, 113, 133, 0)');
        ctx.fillStyle = blushGrad;
        ctx.beginPath();
        ctx.arc(cheek.x, cheek.y, 32 * baseScale, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // ----------------------------------------------------
    // 3. TIKTOK Y2K HEART SUNGLASSES
    // ----------------------------------------------------
    case 'tiktok-heart-glasses': {
      ctx.save();
      ctx.translate(noseBridge.x, noseBridge.y);
      ctx.rotate(roll);

      const glassDist = eyeDistPx * 0.52;
      const hSize = 44 * baseScale;

      // Draw Bridge connecting glasses
      ctx.beginPath();
      ctx.moveTo(-glassDist * 0.4, -hSize * 0.1);
      ctx.quadraticCurveTo(0, -hSize * 0.4, glassDist * 0.4, -hSize * 0.1);
      ctx.strokeStyle = '#FACC15'; // Gold metal bridge
      ctx.lineWidth = 3.5 * baseScale;
      ctx.stroke();

      // Helper to draw a heart-shaped lens
      const drawHeartLens = (cx: number, cy: number) => {
        ctx.save();
        ctx.translate(cx, cy);

        // Heart path
        ctx.beginPath();
        const topCurveH = hSize * 0.32;
        ctx.moveTo(0, topCurveH);
        // top left curve
        ctx.bezierCurveTo(0, 0, -hSize * 0.6, 0, -hSize * 0.6, topCurveH);
        // bottom left curve
        ctx.bezierCurveTo(-hSize * 0.6, hSize * 0.65, 0, hSize * 0.85, 0, hSize * 1.15);
        // bottom right curve
        ctx.bezierCurveTo(0, hSize * 0.85, hSize * 0.6, hSize * 0.65, hSize * 0.6, topCurveH);
        // top right curve
        ctx.bezierCurveTo(hSize * 0.6, 0, 0, 0, 0, topCurveH);
        ctx.closePath();

        // Translucent tinted pink lens
        const lensGrad = ctx.createLinearGradient(-hSize * 0.5, -hSize * 0.5, hSize * 0.5, hSize);
        lensGrad.addColorStop(0, 'rgba(244, 63, 94, 0.85)');
        lensGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.7)');
        lensGrad.addColorStop(1, 'rgba(168, 85, 247, 0.85)');
        ctx.fillStyle = lensGrad;
        ctx.fill();

        // Thick rim
        ctx.lineWidth = 4 * baseScale;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        // Glossy Specular Reflection
        ctx.beginPath();
        ctx.ellipse(-hSize * 0.25, topCurveH * 0.9, hSize * 0.18, hSize * 0.08, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();

        ctx.restore();
      };

      // Draw left & right heart lenses
      drawHeartLens(-glassDist, -hSize * 0.5);
      drawHeartLens(glassDist, -hSize * 0.5);

      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 4. TIKTOK GOLDEN BUTTERFLIES (Flapping 3D wings)
    // ----------------------------------------------------
    case 'tiktok-butterflies': {
      // 4 butterflies in orbit around forehead and temples
      const bConfigs = [
        { angleOffset: -0.6, dist: 95, speed: 0.016, scaleMul: 1.1, phase: 0 },
        { angleOffset: -0.2, dist: 125, speed: 0.014, scaleMul: 0.95, phase: 1.2 },
        { angleOffset: 0.25, dist: 120, speed: 0.018, scaleMul: 1.05, phase: 2.5 },
        { angleOffset: 0.65, dist: 90, speed: 0.015, scaleMul: 0.9, phase: 3.8 }
      ];

      bConfigs.forEach((cfg) => {
        const flap = Math.abs(Math.sin(timeMs * cfg.speed + cfg.phase));
        const curAngle = roll + cfg.angleOffset + Math.sin(timeMs * 0.003 + cfg.phase) * 0.15;
        const bx = forehead.x + Math.sin(curAngle) * cfg.dist * baseScale;
        const by = forehead.y - Math.cos(curAngle) * cfg.dist * baseScale * 0.6;
        const bScale = 22 * baseScale * cfg.scaleMul;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(curAngle + 0.3);

        // Wing width scaled by flap motion (3D flutter effect)
        const wingW = bScale * Math.max(0.2, flap);

        // Wings
        ctx.fillStyle = '#FACC15';
        ctx.strokeStyle = '#B45309';
        ctx.lineWidth = 1.5 * baseScale;

        // Left upper & lower wing
        ctx.beginPath();
        ctx.ellipse(-wingW * 0.7, -bScale * 0.4, wingW * 0.7, bScale * 0.5, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(-wingW * 0.5, bScale * 0.3, wingW * 0.5, bScale * 0.35, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Right upper & lower wing
        ctx.beginPath();
        ctx.ellipse(wingW * 0.7, -bScale * 0.4, wingW * 0.7, bScale * 0.5, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(wingW * 0.5, bScale * 0.3, wingW * 0.5, bScale * 0.35, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Center body
        ctx.beginPath();
        ctx.ellipse(0, 0, 2.5 * baseScale, bScale * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#78350F';
        ctx.fill();

        ctx.restore();
      });

      // Golden sparkle stars drifting near eyes and cheeks
      [leftCheek, rightCheek, noseTip, forehead].forEach((anchor, idx) => {
        const starTime = timeMs * 0.004 + idx * 1.5;
        const sparkleR = (5 + Math.sin(starTime) * 3) * baseScale;
        ctx.save();
        ctx.translate(
          anchor.x + Math.sin(starTime * 1.2) * 20 * baseScale,
          anchor.y + Math.cos(starTime * 1.1) * 15 * baseScale
        );
        ctx.rotate(starTime);
        ctx.fillStyle = '#FEF08A';
        ctx.beginPath();
        ctx.moveTo(0, -sparkleR);
        ctx.lineTo(sparkleR * 0.25, -sparkleR * 0.25);
        ctx.lineTo(sparkleR, 0);
        ctx.lineTo(sparkleR * 0.25, sparkleR * 0.25);
        ctx.lineTo(0, sparkleR);
        ctx.lineTo(-sparkleR * 0.25, sparkleR * 0.25);
        ctx.lineTo(-sparkleR, 0);
        ctx.lineTo(-sparkleR * 0.25, -sparkleR * 0.25);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      break;
    }

    // ----------------------------------------------------
    // 5. TIKTOK BOLD GLAMOUR (Winged liner, glossy lips, glow)
    // ----------------------------------------------------
    case 'tiktok-glamour': {
      // 1. Winged Cat Eyeliner on Left & Right Eyes
      const drawWingedLiner = (eye: { x: number; y: number }, isLeft: boolean) => {
        ctx.save();
        ctx.translate(eye.x, eye.y);
        ctx.rotate(roll);
        const dir = isLeft ? -1 : 1;
        const eyeW = 28 * baseScale;

        ctx.strokeStyle = '#09090B';
        ctx.lineWidth = 3.2 * baseScale;
        ctx.lineCap = 'round';

        // Upper eyelid line + cat wing
        ctx.beginPath();
        ctx.moveTo(-dir * eyeW * 0.8, 2 * baseScale);
        ctx.quadraticCurveTo(0, -eyeW * 0.35, dir * eyeW * 0.8, -2 * baseScale);
        ctx.lineTo(dir * (eyeW * 1.35), -eyeW * 0.45); // Sleek wing flick!
        ctx.stroke();

        // Eye Pupil Catchlight Sparkle
        ctx.beginPath();
        ctx.arc(dir * 2 * baseScale, -1 * baseScale, 2.5 * baseScale, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.restore();
      };

      drawWingedLiner(leftEye, true);
      drawWingedLiner(rightEye, false);

      // 2. High-Gloss Lip Tint on Lips
      ctx.save();
      ctx.translate(mouthCenter.x, mouthCenter.y);
      ctx.rotate(roll);

      const lipW = Math.max(25 * baseScale, Math.hypot(mouthRight.x - mouthLeft.x, mouthRight.y - mouthLeft.y) * 0.55);
      const lipH = 16 * baseScale;

      // Full lip contour
      ctx.beginPath();
      ctx.ellipse(0, 0, lipW, lipH, 0, 0, Math.PI * 2);
      const lipGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, lipW);
      lipGrad.addColorStop(0, 'rgba(225, 29, 72, 0.7)');
      lipGrad.addColorStop(0.7, 'rgba(190, 18, 60, 0.55)');
      lipGrad.addColorStop(1, 'rgba(190, 18, 60, 0)');
      ctx.fillStyle = lipGrad;
      ctx.fill();

      // Glossy shine highlight on lower lip
      ctx.beginPath();
      ctx.ellipse(0, 4 * baseScale, lipW * 0.45, 3.5 * baseScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.fill();

      ctx.restore();

      // 3. Sculpted Warm Peach Cheekbone Glow
      [leftCheek, rightCheek].forEach((cheek) => {
        const glow = ctx.createRadialGradient(cheek.x, cheek.y, 0, cheek.x, cheek.y, 40 * baseScale);
        glow.addColorStop(0, 'rgba(251, 146, 60, 0.4)');
        glow.addColorStop(1, 'rgba(251, 146, 60, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cheek.x, cheek.y, 40 * baseScale, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // ----------------------------------------------------
    // 6. TIKTOK KOREAN PEACH BLUSH & STAR FRECKLES
    // ----------------------------------------------------
    case 'tiktok-peach-stars': {
      // 1. Broad Peach Blush spanning cheeks & nose bridge
      const midPoint = {
        x: (leftCheek.x + rightCheek.x) / 2,
        y: (leftCheek.y + rightCheek.y) / 2
      };
      const spanDist = Math.hypot(rightCheek.x - leftCheek.x, rightCheek.y - leftCheek.y) * 0.6;

      ctx.save();
      ctx.translate(midPoint.x, midPoint.y);
      ctx.rotate(roll);

      const spanGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, spanDist);
      spanGrad.addColorStop(0, 'rgba(251, 113, 133, 0.4)');
      spanGrad.addColorStop(0.7, 'rgba(253, 164, 175, 0.25)');
      spanGrad.addColorStop(1, 'rgba(253, 164, 175, 0)');
      ctx.fillStyle = spanGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, spanDist, 28 * baseScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cute tiny star freckles across nose & cheek zone
      const starOffsets = [
        { x: -50, y: -4, size: 4.5, color: '#FACC15' },
        { x: -38, y: 8, size: 3.2, color: '#FFFFFF' },
        { x: -22, y: -2, size: 4, color: '#FACC15' },
        { x: -8, y: 6, size: 3.5, color: '#FFFFFF' },
        { x: 10, y: 5, size: 4.2, color: '#FACC15' },
        { x: 26, y: -4, size: 3.2, color: '#FFFFFF' },
        { x: 42, y: 8, size: 4.5, color: '#FACC15' },
        { x: 54, y: -2, size: 3.8, color: '#FFFFFF' }
      ];

      starOffsets.forEach((st) => {
        const sx = st.x * baseScale;
        const sy = st.y * baseScale;
        const sSize = st.size * baseScale;
        ctx.fillStyle = st.color;
        ctx.beginPath();
        ctx.moveTo(sx, sy - sSize);
        ctx.lineTo(sx + sSize * 0.25, sy - sSize * 0.25);
        ctx.lineTo(sx + sSize, sy);
        ctx.lineTo(sx + sSize * 0.25, sy + sSize * 0.25);
        ctx.lineTo(sx, sy + sSize);
        ctx.lineTo(sx - sSize * 0.25, sy + sSize * 0.25);
        ctx.lineTo(sx - sSize, sy);
        ctx.lineTo(sx - sSize * 0.25, sy - sSize * 0.25);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 7. TIKTOK NEON CYBER DEVIL
    // ----------------------------------------------------
    case 'tiktok-cyber-devil': {
      // Curved glowing neon devil horns at forehead
      const hornOffset = 62 * baseScale;
      const hornH = 68 * baseScale;

      [-1, 1].forEach((dir) => {
        ctx.save();
        ctx.translate(forehead.x + dir * Math.cos(roll) * hornOffset, forehead.y + dir * Math.sin(roll) * hornOffset);
        ctx.rotate(roll + dir * 0.35);

        // Neon outer glow
        ctx.shadowColor = '#DC2626';
        ctx.shadowBlur = 18 * baseScale;

        // Horn curve
        ctx.beginPath();
        ctx.moveTo(-12 * baseScale, 0);
        ctx.quadraticCurveTo(dir * -18 * baseScale, -hornH * 0.6, dir * -35 * baseScale, -hornH);
        ctx.quadraticCurveTo(dir * -5 * baseScale, -hornH * 0.5, 12 * baseScale, 0);
        ctx.closePath();

        const hornGrad = ctx.createLinearGradient(0, 0, 0, -hornH);
        hornGrad.addColorStop(0, '#7F1D1D');
        hornGrad.addColorStop(0.5, '#EF4444');
        hornGrad.addColorStop(1, '#FCA5A5');
        ctx.fillStyle = hornGrad;
        ctx.fill();

        ctx.lineWidth = 2 * baseScale;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        ctx.restore();
      });

      // Dark Goth lip stain
      ctx.save();
      ctx.translate(mouthCenter.x, mouthCenter.y);
      ctx.rotate(roll);
      ctx.beginPath();
      ctx.ellipse(0, 0, 24 * baseScale, 11 * baseScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(136, 19, 55, 0.65)';
      ctx.fill();
      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 8. TIKTOK CYBER ANGEL (Floating halo & crystal tears)
    // ----------------------------------------------------
    case 'tiktok-angel': {
      // Floating glowing halo ring tilted above forehead
      ctx.save();
      const haloDist = 75 * baseScale;
      ctx.translate(forehead.x - Math.sin(roll) * haloDist, forehead.y - Math.cos(roll) * haloDist);
      ctx.rotate(roll);

      // Neon gold halo ring
      ctx.shadowColor = '#FACC15';
      ctx.shadowBlur = 20 * baseScale;

      ctx.beginPath();
      ctx.ellipse(0, 0, 72 * baseScale, 18 * baseScale, 0, 0, Math.PI * 2);
      ctx.lineWidth = 6 * baseScale;
      ctx.strokeStyle = '#FACC15';
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 72 * baseScale, 18 * baseScale, 0, 0, Math.PI * 2);
      ctx.lineWidth = 2.5 * baseScale;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      ctx.restore();

      // Sparkle cross teardrops beneath eyes
      [leftEye, rightEye].forEach((eye) => {
        const tearY = eye.y + 26 * baseScale;
        const tSize = 8 * baseScale;
        ctx.save();
        ctx.translate(eye.x, tearY);
        ctx.fillStyle = '#67E8F9';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 8;
        // 4-point cross
        ctx.beginPath();
        ctx.moveTo(0, -tSize * 1.5);
        ctx.lineTo(tSize * 0.3, -tSize * 0.3);
        ctx.lineTo(tSize * 1.5, 0);
        ctx.lineTo(tSize * 0.3, tSize * 0.3);
        ctx.lineTo(0, tSize * 1.5);
        ctx.lineTo(-tSize * 0.3, tSize * 0.3);
        ctx.lineTo(-tSize * 1.5, 0);
        ctx.lineTo(-tSize * 0.3, -tSize * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      break;
    }

    // ----------------------------------------------------
    // 9. TIKTOK PRINCESS TIARA CROWN
    // ----------------------------------------------------
    case 'tiktok-tiara': {
      ctx.save();
      ctx.translate(forehead.x, forehead.y - 12 * baseScale);
      ctx.rotate(roll);

      const tiaraW = 90 * baseScale;
      const tiaraH = 50 * baseScale;

      // Crown base arc
      ctx.beginPath();
      ctx.moveTo(-tiaraW, 0);
      ctx.quadraticCurveTo(0, -10 * baseScale, tiaraW, 0);
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 4 * baseScale;
      ctx.stroke();

      // Crown spires
      ctx.beginPath();
      ctx.moveTo(-tiaraW * 0.8, -2 * baseScale);
      ctx.lineTo(-tiaraW * 0.5, -tiaraH * 0.6);
      ctx.lineTo(-tiaraW * 0.25, -tiaraH * 0.35);
      ctx.lineTo(0, -tiaraH * 1.05); // Center tallest peak
      ctx.lineTo(tiaraW * 0.25, -tiaraH * 0.35);
      ctx.lineTo(tiaraW * 0.5, -tiaraH * 0.6);
      ctx.lineTo(tiaraW * 0.8, -2 * baseScale);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5 * baseScale;
      ctx.stroke();

      // Gems on spires
      const gemPoints = [
        { x: -tiaraW * 0.5, y: -tiaraH * 0.6 },
        { x: 0, y: -tiaraH * 1.05 },
        { x: tiaraW * 0.5, y: -tiaraH * 0.6 }
      ];

      gemPoints.forEach((gp) => {
        ctx.beginPath();
        ctx.arc(gp.x, gp.y, 5 * baseScale, 0, Math.PI * 2);
        ctx.fillStyle = '#EC4899'; // Ruby gem
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5 * baseScale;
        ctx.stroke();

        // Twinkle lensflare
        ctx.beginPath();
        ctx.arc(gp.x, gp.y, 1.5 * baseScale, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 10. TIKTOK CRYING MEME (Streaming anime tears)
    // ----------------------------------------------------
    case 'tiktok-crying': {
      // Cartoon tears streaming down cheeks
      [leftEye, rightEye].forEach((eye) => {
        const tearW = 18 * baseScale;
        const tearLen = 85 * baseScale;

        ctx.save();
        ctx.translate(eye.x, eye.y + 10 * baseScale);
        ctx.rotate(roll);

        // Flowing tear stream
        ctx.beginPath();
        ctx.moveTo(-tearW / 2, 0);
        ctx.bezierCurveTo(
          -tearW * 1.1,
          tearLen * 0.4,
          -tearW * 0.8,
          tearLen * 0.8,
          0,
          tearLen
        );
        ctx.bezierCurveTo(
          tearW * 0.8,
          tearLen * 0.8,
          tearW * 1.1,
          tearLen * 0.4,
          tearW / 2,
          0
        );
        ctx.closePath();

        const tearGrad = ctx.createLinearGradient(0, 0, 0, tearLen);
        tearGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        tearGrad.addColorStop(1, 'rgba(186, 230, 253, 0.95)');
        ctx.fillStyle = tearGrad;
        ctx.fill();
        ctx.lineWidth = 2 * baseScale;
        ctx.strokeStyle = '#0284C7';
        ctx.stroke();

        // White reflection streak
        ctx.beginPath();
        ctx.moveTo(-tearW * 0.25, 10 * baseScale);
        ctx.lineTo(-tearW * 0.2, tearLen * 0.7);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2.5 * baseScale;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
      });

      // Flushed Red Nose Tip
      ctx.save();
      ctx.translate(noseTip.x, noseTip.y);
      ctx.rotate(roll);
      ctx.beginPath();
      ctx.arc(0, 0, 16 * baseScale, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 63, 94, 0.55)';
      ctx.fill();
      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 11. TIKTOK VINTAGE MUSTACHE & ROUND WIRE SPECS
    // ----------------------------------------------------
    case 'tiktok-mustache': {
      // 1. Curled handlebar mustache right above upper lip
      ctx.save();
      ctx.translate(mouthTop.x, mouthTop.y - 4 * baseScale);
      ctx.rotate(roll);

      const mWidth = 46 * baseScale;
      const mHeight = 16 * baseScale;

      ctx.fillStyle = '#18181B';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Left curl
      ctx.bezierCurveTo(-mWidth * 0.4, -mHeight * 0.8, -mWidth * 0.9, -mHeight * 0.3, -mWidth, -mHeight * 0.8);
      ctx.bezierCurveTo(-mWidth * 0.85, mHeight * 0.6, -mWidth * 0.3, mHeight * 0.8, 0, 2);
      // Right curl
      ctx.bezierCurveTo(mWidth * 0.3, mHeight * 0.8, mWidth * 0.85, mHeight * 0.6, mWidth, -mHeight * 0.8);
      ctx.bezierCurveTo(mWidth * 0.9, -mHeight * 0.3, mWidth * 0.4, -mHeight * 0.8, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // 2. Round Wireframe Vintage Glasses on nose bridge
      ctx.save();
      ctx.translate(noseBridge.x, noseBridge.y);
      ctx.rotate(roll);

      const specDist = eyeDistPx * 0.5;
      const specR = 24 * baseScale;

      // Connecting bridge
      ctx.beginPath();
      ctx.moveTo(-specDist + specR, 0);
      ctx.quadraticCurveTo(0, -8 * baseScale, specDist - specR, 0);
      ctx.strokeStyle = '#D97706'; // Bronze
      ctx.lineWidth = 2.5 * baseScale;
      ctx.stroke();

      // Left & right wire circles
      [-specDist, specDist].forEach((cx) => {
        ctx.beginPath();
        ctx.arc(cx, 0, specR, 0, Math.PI * 2);
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 3 * baseScale;
        ctx.stroke();

        // Subtle glass tint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();

        // Glare line
        ctx.beginPath();
        ctx.moveTo(cx - specR * 0.5, -specR * 0.4);
        ctx.lineTo(cx + specR * 0.4, specR * 0.5);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5 * baseScale;
        ctx.stroke();
      });

      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 12. TIKTOK KIRAKIRA SUPER STARS (Twinkling glitter)
    // ----------------------------------------------------
    case 'tiktok-kirakira': {
      const glitterPoints = [
        { pt: leftCheek, offset: { x: -10, y: -5 }, speed: 0.005, size: 14 },
        { pt: rightCheek, offset: { x: 12, y: -6 }, speed: 0.006, size: 15 },
        { pt: noseTip, offset: { x: 0, y: -4 }, speed: 0.007, size: 12 },
        { pt: forehead, offset: { x: -25, y: 5 }, speed: 0.004, size: 13 },
        { pt: forehead, offset: { x: 25, y: -8 }, speed: 0.0055, size: 14 },
        { pt: leftEye, offset: { x: -20, y: -10 }, speed: 0.008, size: 11 },
        { pt: rightEye, offset: { x: 22, y: -10 }, speed: 0.0075, size: 11 }
      ];

      glitterPoints.forEach((gp) => {
        const starTime = timeMs * gp.speed;
        const currentScale = (0.5 + Math.abs(Math.sin(starTime)) * 0.8) * baseScale;
        const gSize = gp.size * currentScale;

        ctx.save();
        ctx.translate(gp.pt.x + gp.offset.x * baseScale, gp.pt.y + gp.offset.y * baseScale);
        ctx.rotate(starTime);

        // 8-point sparkling diamond star
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FACC15';
        ctx.shadowBlur = 12 * baseScale;

        ctx.beginPath();
        ctx.moveTo(0, -gSize);
        ctx.lineTo(gSize * 0.18, -gSize * 0.18);
        ctx.lineTo(gSize, 0);
        ctx.lineTo(gSize * 0.18, gSize * 0.18);
        ctx.lineTo(0, gSize);
        ctx.lineTo(-gSize * 0.18, gSize * 0.18);
        ctx.lineTo(-gSize, 0);
        ctx.lineTo(-gSize * 0.18, -gSize * 0.18);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });
      break;
    }

    default:
      break;
  }

  ctx.restore();
}
