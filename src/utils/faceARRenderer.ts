import { TrackedFace } from './faceTracker';

export interface FaceFilterDef {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  category: 'beauty' | 'cute' | 'trendy' | 'funny';
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
    name: 'น้องหมาขนฟูลิ้นห้อย (Golden Puppy)',
    tagline: 'หูหมานุ่มนิ่มดุ๊กดิ๊กบนหัว + จมูกดำเงา + อ้าปากลิ้นห้อยสมจริง!',
    icon: '🐶',
    category: 'cute'
  },
  {
    id: 'tiktok-cat',
    name: 'แมวเหมียวคาวาอี้โบว์ชมพู (Neko Kitty)',
    tagline: 'หูแมวฟูติดโบว์ชมพู + หนวดแมว + จมูกหัวใจ + แก้มบลัช',
    icon: '🐱',
    category: 'cute'
  },
  {
    id: 'tiktok-heart-glasses',
    name: 'แว่นหัวใจ Y2K เลนส์เจลลี่ (Heart Shades)',
    tagline: 'แว่นหัวใจใสสีชมพูประกายเงาสวย เกาะดั้งจมูกเอียงตามดวงตา',
    icon: '🕶️',
    category: 'trendy'
  },
  {
    id: 'tiktok-butterflies',
    name: 'ผีเสื้อทองคำบินรอบหัว (Fairy Butterflies)',
    tagline: 'ผีเสื้อสีทอง 3D กระพือปีกบินรอบหน้า + ละอองดาวระยิบระยับ',
    icon: '🦋',
    category: 'trendy'
  },
  {
    id: 'teddy-bear',
    name: 'หมีน้อยเท็ดดี้เกาหลี (Teddy Bear)',
    tagline: 'หูหมีเท็ดดี้นุ่มฟูบนหัว + จมูกหมีคาวาอี้ + แก้มกลมชมพู',
    icon: '🧸',
    category: 'cute'
  },
  {
    id: 'tiktok-angel',
    name: 'แองเจิลวงแหวนทองคำ (Golden Angel)',
    tagline: 'วงแหวนนางฟ้าลอยเหนือหัวตามมุมเอียง + หยดน้ำตาดาวคริสตัล',
    icon: '👼',
    category: 'trendy'
  },
  {
    id: 'tiktok-tiara',
    name: 'มงกุฎเจ้าหญิงคริสตัล (Princess Tiara)',
    tagline: 'มงกุฎเพชรส่องประกายระยิบระยับ สวมโค้งบนแนวหน้าผาก',
    icon: '👑',
    category: 'beauty'
  },
  {
    id: 'tiktok-crying',
    name: 'ร้องไห้น้ำตานองการ์ตูน (Crying Meme)',
    tagline: 'น้ำตาการ์ตูนประกายใสไหลพรากสมจริงสองข้างแก้ม + จมูกแดงงอแง',
    icon: '😭',
    category: 'funny'
  },
  {
    id: 'tiktok-kirakira',
    name: 'KiraKira ประกายเพชรไอจี (IG Sparkles)',
    tagline: 'ประกายดาวเพชร 8 แฉก หมุนวิบวับทั่วจุดไฮไลต์บนใบหน้า',
    icon: '✨',
    category: 'trendy'
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

// Master rendering function for Face AR Filters with accurate local transform
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

  // Transform key points to screen pixels
  const leftEye = toPx(face.leftEye);
  const rightEye = toPx(face.rightEye);
  const eyeCenter = toPx(face.eyeCenter);
  const noseBridge = toPx(face.noseBridge);
  const noseTip = toPx(face.noseTip);
  const forehead = toPx(face.forehead);
  const chin = toPx(face.chin);
  const leftCheek = toPx(face.leftCheek);
  const rightCheek = toPx(face.rightCheek);
  const mouthCenter = toPx(face.mouthCenter);
  const mouthTop = toPx(face.mouthTop);
  const mouthBottom = toPx(face.mouthBottom);
  const mouthLeft = toPx(face.mouthLeft);
  const mouthRight = toPx(face.mouthRight);

  // When mirrored, head roll flips
  const roll = isMirrored ? -face.angle : face.angle;
  const eyeDistPx = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
  const faceHeightPx = Math.hypot(chin.x - forehead.x, chin.y - forehead.y);
  const baseScale = Math.max(0.4, Math.min(2.5, eyeDistPx / 110));

  // Natural top crown of the head (above forehead hairline)
  // In screen space, head points upward by distance 0.18 * faceHeightPx along head axis
  const crownDistance = faceHeightPx * 0.22;
  const headCrown = {
    x: forehead.x + Math.sin(roll) * crownDistance * 0.2,
    y: forehead.y - Math.cos(roll) * crownDistance
  };

  ctx.save();

  switch (filterId) {
    // ----------------------------------------------------
    // 1. TIKTOK FLUFFY GOLDEN PUPPY (With reactive tongue!)
    // ----------------------------------------------------
    case 'tiktok-dog': {
      // 1. Floppy Golden Puppy Ears anchored to headCrown
      ctx.save();
      ctx.translate(headCrown.x, headCrown.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      const earSpacing = 72;
      const earW = 54;
      const earH = 88;
      const earBounce = Math.sin(timeMs * 0.006) * 4;

      // Draw Left Puppy Ear
      ctx.save();
      ctx.translate(-earSpacing, -10 + earBounce);
      ctx.rotate(-0.35 + Math.sin(timeMs * 0.005) * 0.08);

      // White die-cut outline
      ctx.beginPath();
      ctx.ellipse(0, earH / 2, earW / 2 + 5, earH / 2 + 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Outer brown furry ear
      ctx.beginPath();
      ctx.ellipse(0, earH / 2, earW / 2, earH / 2, 0, 0, Math.PI * 2);
      const leftEarGrad = ctx.createLinearGradient(0, 0, 0, earH);
      leftEarGrad.addColorStop(0, '#B45309');
      leftEarGrad.addColorStop(0.6, '#D97706');
      leftEarGrad.addColorStop(1, '#92400E');
      ctx.fillStyle = leftEarGrad;
      ctx.fill();

      // Inner pink ear flap
      ctx.beginPath();
      ctx.ellipse(2, earH / 2 + 6, earW / 3.2, earH / 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDA4AF';
      ctx.fill();
      ctx.restore();

      // Draw Right Puppy Ear
      ctx.save();
      ctx.translate(earSpacing, -10 - earBounce);
      ctx.rotate(0.35 - Math.cos(timeMs * 0.005) * 0.08);

      // White die-cut outline
      ctx.beginPath();
      ctx.ellipse(0, earH / 2, earW / 2 + 5, earH / 2 + 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Outer brown furry ear
      ctx.beginPath();
      ctx.ellipse(0, earH / 2, earW / 2, earH / 2, 0, 0, Math.PI * 2);
      const rightEarGrad = ctx.createLinearGradient(0, 0, 0, earH);
      rightEarGrad.addColorStop(0, '#B45309');
      rightEarGrad.addColorStop(0.6, '#D97706');
      rightEarGrad.addColorStop(1, '#92400E');
      ctx.fillStyle = rightEarGrad;
      ctx.fill();

      // Inner pink ear flap
      ctx.beginPath();
      ctx.ellipse(-2, earH / 2 + 6, earW / 3.2, earH / 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FDA4AF';
      ctx.fill();
      ctx.restore();

      ctx.restore();

      // 2. Cute Shiny Black Puppy Nose at noseTip
      ctx.save();
      ctx.translate(noseTip.x, noseTip.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      const nW = 24;
      const nH = 17;

      // White sticker rim
      ctx.beginPath();
      ctx.ellipse(0, 0, nW + 3, nH + 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Black shiny nose body
      ctx.beginPath();
      ctx.ellipse(0, 0, nW, nH, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#18181B';
      ctx.fill();

      // Glossy shine curve
      ctx.beginPath();
      ctx.ellipse(-nW * 0.35, -nH * 0.25, nW * 0.35, nH * 0.22, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();

      // Cute whisker freckle dots
      ctx.fillStyle = '#52525B';
      [-1, 1].forEach((dir) => {
        const dx = dir * (nW * 1.5);
        ctx.beginPath();
        ctx.arc(dx, 4, 2.2, 0, Math.PI * 2);
        ctx.arc(dx + dir * 6, -2, 2.2, 0, Math.PI * 2);
        ctx.arc(dx + dir * 5, 10, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 3. Reactive Cartoon Tongue (Animates out when mouth is open!)
      const isMouthOpen = face.mouthOpenRatio > 0.08;
      const tongueAnim = isMouthOpen ? Math.min(1, face.mouthOpenRatio * 2.8) : 0;

      if (tongueAnim > 0.05) {
        ctx.save();
        ctx.translate(mouthBottom.x, mouthBottom.y);
        ctx.rotate(roll);
        ctx.scale(baseScale, baseScale);

        const tW = 32 * tongueAnim;
        const tLen = (52 + Math.sin(timeMs * 0.015) * 4) * tongueAnim;

        // White border
        ctx.beginPath();
        ctx.moveTo(-tW / 2 - 3, 0);
        ctx.bezierCurveTo(-tW / 2 - 3, tLen * 0.6, -tW * 0.2, tLen + 4, 0, tLen + 4);
        ctx.bezierCurveTo(tW * 0.2, tLen + 4, tW / 2 + 3, tLen * 0.6, tW / 2 + 3, 0);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Pink tongue
        ctx.beginPath();
        ctx.moveTo(-tW / 2, 0);
        ctx.bezierCurveTo(-tW / 2, tLen * 0.6, -tW * 0.2, tLen, 0, tLen);
        ctx.bezierCurveTo(tW * 0.2, tLen, tW / 2, tLen * 0.6, tW / 2, 0);
        ctx.closePath();
        const tGrad = ctx.createLinearGradient(0, 0, 0, tLen);
        tGrad.addColorStop(0, '#FB7185');
        tGrad.addColorStop(0.7, '#F43F5E');
        tGrad.addColorStop(1, '#BE123C');
        ctx.fillStyle = tGrad;
        ctx.fill();

        // Crease
        ctx.beginPath();
        ctx.moveTo(0, 3);
        ctx.lineTo(0, tLen * 0.72);
        ctx.strokeStyle = '#9F1239';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.restore();
      }
      break;
    }

    // ----------------------------------------------------
    // 3. KAWAII NEKO KITTY (แมวเหมียวสุดคิ้วท์ + โบว์ชมพู)
    // ----------------------------------------------------
    case 'tiktok-cat': {
      // 1. Fluffy White Kitty Ears with Satin Pink Bows at headCrown
      ctx.save();
      ctx.translate(headCrown.x, headCrown.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      const catEarSpacing = 68;
      const catEarH = 65;
      const catEarW = 55;

      [-1, 1].forEach((dir) => {
        ctx.save();
        ctx.translate(dir * catEarSpacing, -18);
        ctx.rotate(dir * 0.28);

        // White die-cut outline
        ctx.beginPath();
        ctx.moveTo(-catEarW * 0.5, 0);
        ctx.lineTo(dir * -catEarW * 0.08, -catEarH * 1.15);
        ctx.lineTo(catEarW * 0.5, 0);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 8;
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.fill();

        // Kitty Ear Fluff
        ctx.beginPath();
        ctx.moveTo(-catEarW * 0.45, 0);
        ctx.lineTo(dir * -catEarW * 0.08, -catEarH * 1.1);
        ctx.lineTo(catEarW * 0.45, 0);
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Soft pink inner ear
        ctx.beginPath();
        ctx.moveTo(-catEarW * 0.26, -2);
        ctx.lineTo(dir * -catEarW * 0.08, -catEarH * 0.9);
        ctx.lineTo(catEarW * 0.26, -2);
        ctx.closePath();
        ctx.fillStyle = '#FDA4AF';
        ctx.fill();

        // Cute Pink Satin Bow at ear base!
        ctx.save();
        ctx.translate(0, -6);
        ctx.scale(0.5, 0.5);
        ctx.fillStyle = '#F43F5E';
        // Left loop
        ctx.beginPath();
        ctx.ellipse(-14, 0, 14, 10, -0.2, 0, Math.PI * 2);
        ctx.fill();
        // Right loop
        ctx.beginPath();
        ctx.ellipse(14, 0, 14, 10, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // Knot
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#BE123C';
        ctx.fill();
        ctx.restore();

        ctx.restore();
      });

      ctx.restore();

      // 2. Cute Heart-shaped Kitty Nose at noseTip
      ctx.save();
      ctx.translate(noseTip.x, noseTip.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      ctx.beginPath();
      ctx.moveTo(-11, -3);
      ctx.lineTo(11, -3);
      ctx.lineTo(0, 9);
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6;
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.fillStyle = '#FB7185';
      ctx.fill();

      ctx.restore();

      // 3. Delicate Whiskers on cheeks
      const whiskerLen = 48 * baseScale;
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 2.2 * baseScale;
      ctx.lineCap = 'round';

      // Left Cheek Whiskers
      [-0.14, 0, 0.14].forEach((wAngle) => {
        ctx.beginPath();
        ctx.moveTo(leftCheek.x, leftCheek.y);
        ctx.lineTo(
          leftCheek.x - Math.cos(roll + wAngle) * whiskerLen,
          leftCheek.y - Math.sin(roll + wAngle) * whiskerLen
        );
        ctx.stroke();
      });

      // Right Cheek Whiskers
      [-0.14, 0, 0.14].forEach((wAngle) => {
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
        const bGrad = ctx.createRadialGradient(cheek.x, cheek.y, 0, cheek.x, cheek.y, 34 * baseScale);
        bGrad.addColorStop(0, 'rgba(251, 113, 133, 0.45)');
        bGrad.addColorStop(1, 'rgba(251, 113, 133, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(cheek.x, cheek.y, 34 * baseScale, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // ----------------------------------------------------
    // 4. Y2K HEART SUNGLASSES (แว่นหัวใจเลนส์ใสสะท้อนเงา)
    // ----------------------------------------------------
    case 'tiktok-heart-glasses': {
      ctx.save();
      ctx.translate(noseBridge.x, noseBridge.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      const glassSpacing = (eyeDistPx / baseScale) * 0.52;
      const hSize = 42;

      // Golden metal wire bridge
      ctx.beginPath();
      ctx.moveTo(-glassSpacing * 0.45, -hSize * 0.1);
      ctx.quadraticCurveTo(0, -hSize * 0.38, glassSpacing * 0.45, -hSize * 0.1);
      ctx.strokeStyle = '#FACC15';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Helper to draw realistic heart lens
      const drawHeartLens = (cx: number) => {
        ctx.save();
        ctx.translate(cx, -hSize * 0.45);

        // Heart contour
        ctx.beginPath();
        const topH = hSize * 0.3;
        ctx.moveTo(0, topH);
        ctx.bezierCurveTo(0, 0, -hSize * 0.62, 0, -hSize * 0.62, topH);
        ctx.bezierCurveTo(-hSize * 0.62, hSize * 0.68, 0, hSize * 0.88, 0, hSize * 1.18);
        ctx.bezierCurveTo(0, hSize * 0.88, hSize * 0.62, hSize * 0.68, hSize * 0.62, topH);
        ctx.bezierCurveTo(hSize * 0.62, 0, 0, 0, 0, topH);
        ctx.closePath();

        // Translucent jelly pink/violet gradient
        const lensGrad = ctx.createLinearGradient(-hSize * 0.5, -hSize * 0.5, hSize * 0.5, hSize);
        lensGrad.addColorStop(0, 'rgba(244, 63, 94, 0.75)');
        lensGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.6)');
        lensGrad.addColorStop(1, 'rgba(168, 85, 247, 0.75)');
        ctx.fillStyle = lensGrad;
        ctx.fill();

        // White rim
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3.8;
        ctx.stroke();

        // Glossy Specular shine streak
        ctx.beginPath();
        ctx.ellipse(-hSize * 0.24, topH * 0.85, hSize * 0.18, hSize * 0.08, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        ctx.restore();
      };

      drawHeartLens(-glassSpacing);
      drawHeartLens(glassSpacing);

      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 5. GOLDEN BUTTERFLIES (ผีเสื้อทองคำบินรอบหัว)
    // ----------------------------------------------------
    case 'tiktok-butterflies': {
      // Orbiting butterflies centered around headCrown
      const bConfigs = [
        { angleOffset: -0.65, dist: 90, speed: 0.015, scaleMul: 1.1, phase: 0 },
        { angleOffset: -0.22, dist: 120, speed: 0.013, scaleMul: 0.95, phase: 1.4 },
        { angleOffset: 0.22, dist: 115, speed: 0.017, scaleMul: 1.05, phase: 2.7 },
        { angleOffset: 0.68, dist: 85, speed: 0.014, scaleMul: 0.9, phase: 4.1 }
      ];

      bConfigs.forEach((cfg) => {
        const flap = Math.abs(Math.sin(timeMs * cfg.speed + cfg.phase));
        const curAngle = roll + cfg.angleOffset + Math.sin(timeMs * 0.003 + cfg.phase) * 0.12;
        const bx = headCrown.x + Math.sin(curAngle) * cfg.dist * baseScale;
        const by = headCrown.y - Math.cos(curAngle) * cfg.dist * baseScale * 0.55;
        const bScale = 22 * baseScale * cfg.scaleMul;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(curAngle + 0.3);

        const wingW = bScale * Math.max(0.18, flap);

        // Glow
        ctx.shadowColor = '#FACC15';
        ctx.shadowBlur = 10;

        // Left upper & lower wing
        ctx.fillStyle = '#FDE047';
        ctx.strokeStyle = '#B45309';
        ctx.lineWidth = 1.5;

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

        // Butterfly body
        ctx.beginPath();
        ctx.ellipse(0, 0, 2.2, bScale * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#78350F';
        ctx.fill();

        ctx.restore();
      });

      // Twinkling golden star dust near cheeks and eyes
      [leftCheek, rightCheek, forehead].forEach((anchor, idx) => {
        const starTime = timeMs * 0.005 + idx * 2;
        const sparkleR = (5 + Math.sin(starTime) * 3) * baseScale;
        ctx.save();
        ctx.translate(
          anchor.x + Math.sin(starTime * 1.3) * 22 * baseScale,
          anchor.y + Math.cos(starTime * 1.1) * 16 * baseScale
        );
        ctx.rotate(starTime);
        ctx.fillStyle = '#FEF08A';
        ctx.shadowColor = '#FACC15';
        ctx.shadowBlur = 8;
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
    // 6. TEDDY BEAR CUTE EARS (หมีน้อยเท็ดดี้เกาหลี)
    // ----------------------------------------------------
    case 'teddy-bear': {
      // Round fluffy teddy ears on headCrown
      ctx.save();
      ctx.translate(headCrown.x, headCrown.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      const bearSpacing = 68;
      const bearR = 30;

      [-1, 1].forEach((dir) => {
        ctx.save();
        ctx.translate(dir * bearSpacing, -18);

        // White sticker outline
        ctx.beginPath();
        ctx.arc(0, 0, bearR + 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Teddy brown ear
        ctx.beginPath();
        ctx.arc(0, 0, bearR, 0, Math.PI * 2);
        ctx.fillStyle = '#B45309';
        ctx.fill();

        // Inner cream circle
        ctx.beginPath();
        ctx.arc(0, 0, bearR * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = '#FDE68A';
        ctx.fill();

        ctx.restore();
      });

      ctx.restore();

      // Cute teddy button nose at noseTip
      ctx.save();
      ctx.translate(noseTip.x, noseTip.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#78350F';
      ctx.fill();

      // Heart shine
      ctx.beginPath();
      ctx.arc(-4, -3, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      // Rosy round cheeks
      [leftCheek, rightCheek].forEach((chk) => {
        const bGrad = ctx.createRadialGradient(chk.x, chk.y, 0, chk.x, chk.y, 30 * baseScale);
        bGrad.addColorStop(0, 'rgba(251, 113, 133, 0.45)');
        bGrad.addColorStop(1, 'rgba(251, 113, 133, 0)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(chk.x, chk.y, 30 * baseScale, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    // ----------------------------------------------------
    // 6. GOLDEN ANGEL HALO & WINGS (แองเจิลวงแหวนทองคำ)
    // ----------------------------------------------------
    case 'tiktok-angel': {
      // Golden floating halo tilted above headCrown
      ctx.save();
      ctx.translate(headCrown.x, headCrown.y - 45 * baseScale);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      ctx.shadowColor = '#FACC15';
      ctx.shadowBlur = 22;

      ctx.beginPath();
      ctx.ellipse(0, 0, 72, 17, 0, 0, Math.PI * 2);
      ctx.lineWidth = 6.5;
      ctx.strokeStyle = '#FACC15';
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 72, 17, 0, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      ctx.restore();

      // Crystal teardrop sparkle crosses below eyes
      [leftEye, rightEye].forEach((eye) => {
        const tearY = eye.y + 26 * baseScale;
        const tSize = 7.5 * baseScale;
        ctx.save();
        ctx.translate(eye.x, tearY);
        ctx.fillStyle = '#67E8F9';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 8;
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
    // 10. PRINCESS CRYSTAL TIARA (มงกุฎเจ้าหญิงคริสตัล)
    // ----------------------------------------------------
    case 'tiktok-tiara': {
      ctx.save();
      ctx.translate(forehead.x, forehead.y - 8 * baseScale);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);

      const tiaraW = 86;
      const tiaraH = 46;

      // Tiara Base curve
      ctx.beginPath();
      ctx.moveTo(-tiaraW, 0);
      ctx.quadraticCurveTo(0, -9, tiaraW, 0);
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Tiara Peaks
      ctx.beginPath();
      ctx.moveTo(-tiaraW * 0.8, -2);
      ctx.lineTo(-tiaraW * 0.5, -tiaraH * 0.6);
      ctx.lineTo(-tiaraW * 0.25, -tiaraH * 0.35);
      ctx.lineTo(0, -tiaraH * 1.05);
      ctx.lineTo(tiaraW * 0.25, -tiaraH * 0.35);
      ctx.lineTo(tiaraW * 0.5, -tiaraH * 0.6);
      ctx.lineTo(tiaraW * 0.8, -2);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Sparkling gems
      const gemPoints = [
        { x: -tiaraW * 0.5, y: -tiaraH * 0.6 },
        { x: 0, y: -tiaraH * 1.05 },
        { x: tiaraW * 0.5, y: -tiaraH * 0.6 }
      ];

      gemPoints.forEach((gp) => {
        ctx.beginPath();
        ctx.arc(gp.x, gp.y, 5.2, 0, Math.PI * 2);
        ctx.fillStyle = '#EC4899';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(gp.x, gp.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 11. CARTOON CRYING MEME (น้ำตานองสุดปั่น)
    // ----------------------------------------------------
    case 'tiktok-crying': {
      [leftEye, rightEye].forEach((eye) => {
        ctx.save();
        ctx.translate(eye.x, eye.y + 10 * baseScale);
        ctx.rotate(roll);
        ctx.scale(baseScale, baseScale);

        const tearW = 18;
        const tearLen = 82;

        ctx.beginPath();
        ctx.moveTo(-tearW / 2, 0);
        ctx.bezierCurveTo(-tearW * 1.1, tearLen * 0.4, -tearW * 0.8, tearLen * 0.8, 0, tearLen);
        ctx.bezierCurveTo(tearW * 0.8, tearLen * 0.8, tearW * 1.1, tearLen * 0.4, tearW / 2, 0);
        ctx.closePath();

        const tearGrad = ctx.createLinearGradient(0, 0, 0, tearLen);
        tearGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        tearGrad.addColorStop(1, 'rgba(186, 230, 253, 0.95)');
        ctx.fillStyle = tearGrad;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0284C7';
        ctx.stroke();

        // White reflection highlight
        ctx.beginPath();
        ctx.moveTo(-tearW * 0.25, 10);
        ctx.lineTo(-tearW * 0.2, tearLen * 0.7);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
      });

      // Sniffly red nose tip
      ctx.save();
      ctx.translate(noseTip.x, noseTip.y);
      ctx.rotate(roll);
      ctx.scale(baseScale, baseScale);
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.fill();
      ctx.restore();
      break;
    }

    // ----------------------------------------------------
    // 12. KIRAKIRA IG SPARKLES (ประกายเพชรไอจีวิบวับ)
    // ----------------------------------------------------
    case 'tiktok-kirakira': {
      const glitterPoints = [
        { pt: leftCheek, offset: { x: -8, y: -5 }, speed: 0.005, size: 14 },
        { pt: rightCheek, offset: { x: 10, y: -6 }, speed: 0.006, size: 15 },
        { pt: noseTip, offset: { x: 0, y: -4 }, speed: 0.007, size: 12 },
        { pt: forehead, offset: { x: -22, y: 5 }, speed: 0.004, size: 13 },
        { pt: forehead, offset: { x: 22, y: -8 }, speed: 0.0055, size: 14 },
        { pt: leftEye, offset: { x: -18, y: -8 }, speed: 0.008, size: 11 },
        { pt: rightEye, offset: { x: 18, y: -8 }, speed: 0.0075, size: 11 }
      ];

      glitterPoints.forEach((gp) => {
        const starTime = timeMs * gp.speed;
        const currentScale = (0.5 + Math.abs(Math.sin(starTime)) * 0.8) * baseScale;
        const gSize = gp.size * currentScale;

        ctx.save();
        ctx.translate(gp.pt.x + gp.offset.x * baseScale, gp.pt.y + gp.offset.y * baseScale);
        ctx.rotate(starTime);

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
