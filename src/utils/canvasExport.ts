import { CapturedPhoto, StripSettings, FrameTheme } from '../types/photobooth';
import { FRAME_THEMES } from '../data/frameThemes';

// Helper to load an image element from dataUrl
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

// Format date nicely based on format option
export function formatPhotoboothDate(timestamp: number, format: StripSettings['dateFormat']): string {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');

  switch (format) {
    case 'korean':
      return `${year}.${month}.${day} ${hours}:${mins}`;
    case 'standard':
      return `${month}/${day}/${year}`;
    case 'minimal':
      return `${year} · ${month} · ${day}`;
    case 'vintage':
      return `'${String(year).slice(2)} ${month} ${day}`;
    default:
      return `${year}.${month}.${day}`;
  }
}

// Get CSS filter string for preview or canvas filter
export function getFilterCssString(filter: StripSettings['filter'], brightness = 100, contrast = 100): string {
  const base = `brightness(${brightness}%) contrast(${contrast}%)`;
  switch (filter) {
    case 'vintage':
      return `${base} sepia(25%) saturate(125%) hue-rotate(-10deg)`;
    case 'noir':
      return `${base} grayscale(100%) contrast(130%)`;
    case 'sepia':
      return `${base} sepia(70%) saturate(110%) brightness(95%)`;
    case 'warm90s':
      return `${base} sepia(15%) saturate(140%) hue-rotate(5deg) contrast(110%)`;
    case 'cyberpunk':
      return `${base} saturate(160%) hue-rotate(180deg) contrast(120%)`;
    case 'pastel':
      return `${base} saturate(90%) brightness(108%) contrast(95%)`;
    case 'filmgrain':
      return `${base} contrast(115%) sepia(10%)`;
    default:
      return base;
  }
}

export async function renderPhotostripToCanvas(
  photos: CapturedPhoto[],
  settings: StripSettings
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const frame = FRAME_THEMES.find((f) => f.id === settings.frameThemeId) || FRAME_THEMES[0];

  // Canvas dimensions based on layout
  let width = 600;
  let height = 1920;

  if (settings.layout === '4-cut-strip') {
    width = 600;
    height = 1920;
  } else if (settings.layout === '3-cut-strip') {
    width = 600;
    height = 1520;
  } else if (settings.layout === '2x2-quad') {
    width = 900;
    height = 1050;
  } else if (settings.layout === 'polaroid') {
    width = 680;
    height = 840;
  } else if (settings.layout === 'duo-wide') {
    width = 640;
    height = 1100;
  }

  canvas.width = width;
  canvas.height = height;

  // 1. Draw Background Frame
  if (frame.isSpecialPattern === 'gradient-sunset') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#FDE68A');
    grad.addColorStop(0.5, '#F472B6');
    grad.addColorStop(1, '#C084FC');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (frame.isSpecialPattern === 'hologram') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E0E7FF');
    grad.addColorStop(0.3, '#FCE7F3');
    grad.addColorStop(0.7, '#CFFAFE');
    grad.addColorStop(1, '#EDE9FE');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.fillStyle = frame.bgHex;
    ctx.fillRect(0, 0, width, height);
  }

  // Special pattern: 35mm film negative sprockets
  if (frame.isSpecialPattern === 'sprockets') {
    ctx.fillStyle = '#18181B';
    const holeW = 18;
    const holeH = 26;
    const gap = 36;
    for (let y = 30; y < height - 40; y += gap) {
      ctx.beginPath();
      ctx.roundRect(14, y, holeW, holeH, 4);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(width - 14 - holeW, y, holeW, holeH, 4);
      ctx.fill();
    }
  }

  // Special pattern: Checkerboard edge
  if (frame.isSpecialPattern === 'checker') {
    const checkSize = 14;
    ctx.fillStyle = '#312E81';
    for (let x = 0; x < width; x += checkSize) {
      for (let y = 0; y < 14; y += checkSize) {
        if ((Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0) {
          ctx.fillRect(x, y, checkSize, checkSize);
        }
      }
      for (let y = height - 14; y < height; y += checkSize) {
        if ((Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0) {
          ctx.fillRect(x, y, checkSize, checkSize);
        }
      }
    }
  }

  // Special pattern: Hearts
  if (frame.isSpecialPattern === 'hearts') {
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#F43F5E';
    for (let x = 20; x < width - 20; x += 35) {
      ctx.fillText('♡', x, 22);
      ctx.fillText('♡', x, height - 15);
    }
  }

  // Special pattern: Grid
  if (frame.isSpecialPattern === 'grid') {
    ctx.strokeStyle = 'rgba(20, 83, 45, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // Pre-load photo image elements
  const loadedImages: HTMLImageElement[] = [];
  for (const photo of photos) {
    try {
      const img = await loadImage(photo.dataUrl);
      loadedImages.push(img);
    } catch (e) {
      console.warn('Failed to load image for canvas export:', e);
    }
  }

  // Filter setup
  ctx.save();
  ctx.filter = getFilterCssString(settings.filter, settings.brightness, settings.contrast);

  // 2. Draw Photos based on layout
  const marginX = frame.isSpecialPattern === 'sprockets' ? 52 : 36;
  const marginTop = 36;
  const photoGap = 20;

  if (settings.layout === '4-cut-strip' || settings.layout === '3-cut-strip') {
    const photoCount = settings.layout === '4-cut-strip' ? 4 : 3;
    const photoW = width - marginX * 2;
    const photoH = settings.layout === '4-cut-strip' ? 380 : 420;

    for (let i = 0; i < photoCount; i++) {
      const img = loadedImages[i];
      const slotY = marginTop + i * (photoH + photoGap);

      ctx.fillStyle = '#222';
      ctx.fillRect(marginX, slotY, photoW, photoH);

      if (img) {
        drawObjectFitCover(ctx, img, marginX, slotY, photoW, photoH);
      }

      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(marginX, slotY, photoW, photoH);
    }
  } else if (settings.layout === '2x2-quad') {
    const gridMargin = 40;
    const cellW = (width - gridMargin * 2 - photoGap) / 2;
    const cellH = 360;

    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const slotX = gridMargin + col * (cellW + photoGap);
      const slotY = marginTop + row * (cellH + photoGap);
      const img = loadedImages[i];

      ctx.fillStyle = '#222';
      ctx.fillRect(slotX, slotY, cellW, cellH);

      if (img) {
        drawObjectFitCover(ctx, img, slotX, slotY, cellW, cellH);
      }

      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(slotX, slotY, cellW, cellH);
    }
  } else if (settings.layout === 'polaroid') {
    const photoW = width - 60;
    const photoH = 580;
    const img = loadedImages[0];

    ctx.fillStyle = '#222';
    ctx.fillRect(30, 36, photoW, photoH);

    if (img) {
      drawObjectFitCover(ctx, img, 30, 36, photoW, photoH);
    }

    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 36, photoW, photoH);
  } else if (settings.layout === 'duo-wide') {
    const photoW = width - marginX * 2;
    const photoH = 430;

    for (let i = 0; i < 2; i++) {
      const slotY = marginTop + i * (photoH + photoGap);
      const img = loadedImages[i];

      ctx.fillStyle = '#222';
      ctx.fillRect(marginX, slotY, photoW, photoH);

      if (img) {
        drawObjectFitCover(ctx, img, marginX, slotY, photoW, photoH);
      }

      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(marginX, slotY, photoW, photoH);
    }
  }

  // Restore filter context for text, stickers, doodles
  ctx.restore();

  // 3. Film Grain overlay if enabled
  if (settings.grainIntensity > 0 || settings.filter === 'filmgrain') {
    const grainAlpha = (settings.grainIntensity || 30) / 300;
    ctx.fillStyle = `rgba(128, 128, 128, ${grainAlpha})`;
    for (let x = 0; x < width; x += 4) {
      for (let y = 0; y < height; y += 4) {
        if (Math.random() > 0.6) {
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  }

  // 4. Header & Footer Typography
  const fontChoice = settings.fontFamily === 'serif' 
    ? 'Fraunces, Georgia, serif' 
    : settings.fontFamily === 'mono' 
      ? 'Space Mono, monospace' 
      : 'Plus Jakarta Sans, sans-serif';

  ctx.textAlign = 'center';
  ctx.fillStyle = frame.textHex;

  const footerAreaY = height - 90;

  if (settings.title) {
    ctx.font = `bold 28px ${fontChoice}`;
    ctx.fillText(settings.title, width / 2, footerAreaY);
  }

  if (settings.subtitle) {
    ctx.font = `500 16px ${fontChoice}`;
    ctx.fillStyle = frame.subtextHex;
    ctx.fillText(settings.subtitle, width / 2, footerAreaY + 30);
  }

  if (settings.showDate) {
    const dateStr = formatPhotoboothDate(Date.now(), settings.dateFormat);
    ctx.font = `600 14px "Space Mono", monospace`;
    ctx.fillStyle = frame.subtextHex;
    ctx.fillText(dateStr, width / 2, footerAreaY + 54);
  }

  // 5. Draw Doodles
  if (settings.doodles && settings.doodles.length > 0) {
    for (const stroke of settings.doodles) {
      if (!stroke.points || stroke.points.length < 2) continue;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = (stroke.size / 100) * width * 0.04;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const firstPt = stroke.points[0];
      ctx.moveTo((firstPt.x / 100) * width, (firstPt.y / 100) * height);

      for (let i = 1; i < stroke.points.length; i++) {
        const pt = stroke.points[i];
        ctx.lineTo((pt.x / 100) * width, (pt.y / 100) * height);
      }
      ctx.stroke();
      ctx.restore();
    }
  }

  // 6. Draw Stickers
  for (const sticker of settings.stickers) {
    ctx.save();
    const posX = (sticker.x / 100) * width;
    const posY = (sticker.y / 100) * height;

    ctx.translate(posX, posY);
    ctx.rotate((sticker.rotation * Math.PI) / 180);

    const baseSize = 44 * (sticker.scale || 1);

    if (sticker.type === 'badge') {
      ctx.font = `bold ${Math.round(18 * (sticker.scale || 1))}px "Space Mono", sans-serif`;
      const textMetrics = ctx.measureText(sticker.symbol);
      const padX = 14 * sticker.scale;
      const padY = 8 * sticker.scale;
      const bw = textMetrics.width + padX * 2;
      const bh = 24 * sticker.scale + padY * 2;

      ctx.fillStyle = '#E11D48';
      ctx.beginPath();
      ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 6);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sticker.symbol, 0, 1);
    } else {
      ctx.font = `${Math.round(baseSize)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sticker.symbol, 0, 0);
    }

    ctx.restore();
  }

  return canvas;
}

function drawObjectFitCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;

  let sX = 0, sY = 0, sW = img.width, sH = img.height;

  if (imgRatio > targetRatio) {
    sW = img.height * targetRatio;
    sX = (img.width - sW) / 2;
  } else {
    sH = img.width / targetRatio;
    sY = (img.height - sH) / 2;
  }

  ctx.drawImage(img, sX, sY, sW, sH, x, y, w, h);
}
