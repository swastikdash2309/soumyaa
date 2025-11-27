import { useEffect, useRef, useState } from 'react';

interface TrekPoint {
  name: string;
  altitude: number;
  netGain: number;
  position: [number, number, number];
}

const trekData: TrekPoint[] = [
  { name: 'Phakding', altitude: 2881, netGain: 21, position: [0, 0.5, 0] },
  { name: 'Namche', altitude: 3324, netGain: 464, position: [2, 1.2, 1] },
  { name: 'Tengboche', altitude: 3694, netGain: 834, position: [4, 1.8, 2] },
  { name: 'Dingboche', altitude: 4156, netGain: 1296, position: [5.5, 2.5, 3.5] },
  { name: 'Lobuche', altitude: 4725, netGain: 1865, position: [7, 3.5, 5] },
  { name: 'Gorak Shep', altitude: 5058, netGain: 2198, position: [8, 4.2, 6.5] },
  { name: 'EBC', altitude: 5281, netGain: 2421, position: [9, 4.8, 7.5] },
  { name: 'Kala Patthar', altitude: 5515, netGain: 2655, position: [10, 5.8, 9] },
];

export function MountainTrekAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationProgress = 0;
    let currentSegment = 0;

    const drawMountainBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(0.4, '#1a2744');
      gradient.addColorStop(1, '#2d3e5f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 80; i++) {
        const x = (Math.sin(i * 0.3) * canvas.width) / 2 + canvas.width / 2;
        const y = canvas.height - (i * canvas.height) / 100 - Math.sin(i * 0.5) * 60;
        const width = canvas.width * 0.3 + Math.cos(i * 0.4) * 150;
        const height = (canvas.height * 0.6) / (i + 1);

        const mountainGrad = ctx.createLinearGradient(x, y, x, y + height);
        mountainGrad.addColorStop(0, '#e8f4ff');
        mountainGrad.addColorStop(0.3, '#94a3b8');
        mountainGrad.addColorStop(1, '#475569');

        ctx.fillStyle = mountainGrad;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - width / 2, canvas.height);
        ctx.lineTo(x + width / 2, canvas.height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawTerrain = () => {
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        const yOffset = canvas.height * 0.3 + i * 15;
        for (let x = 0; x < canvas.width; x += 20) {
          const noise = Math.sin(x * 0.01 + i * 0.5) * 10;
          const y = yOffset + noise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawPath = (progress: number) => {
      const pathY = canvas.height * 0.65;
      const spacing = canvas.width / (trekData.length + 1);

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#475569';
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      trekData.forEach((point, i) => {
        const x = spacing * (i + 1);
        const y = pathY - (point.altitude - 2800) * 0.08;
        if (i === 0) ctx.moveTo(x, y);
        else {
          const prevPoint = trekData[i - 1];
          const prevX = spacing * i;
          const prevY = pathY - (prevPoint.altitude - 2800) * 0.08;
          const cpX = (x + prevX) / 2;
          const cpY = (y + prevY) / 2 - 30;
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      });
      ctx.stroke();
      ctx.setLineDash([]);

      const completedSegments = Math.floor(progress);
      const segmentProgress = progress - completedSegments;

      ctx.lineWidth = 5;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#f59e0b');
      gradient.addColorStop(1, '#fbbf24');
      ctx.strokeStyle = gradient;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;

      ctx.beginPath();
      for (let i = 0; i <= completedSegments && i < trekData.length; i++) {
        const x = spacing * (i + 1);
        const y = pathY - (trekData[i].altitude - 2800) * 0.08;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevPoint = trekData[i - 1];
          const prevX = spacing * i;
          const prevY = pathY - (prevPoint.altitude - 2800) * 0.08;
          const cpX = (x + prevX) / 2;
          const cpY = (y + prevY) / 2 - 30;
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      }

      if (completedSegments < trekData.length - 1 && segmentProgress > 0) {
        const currentX = spacing * (completedSegments + 1);
        const currentY = pathY - (trekData[completedSegments].altitude - 2800) * 0.08;
        const nextX = spacing * (completedSegments + 2);
        const nextY = pathY - (trekData[completedSegments + 1].altitude - 2800) * 0.08;

        const cpX = (nextX + currentX) / 2;
        const cpY = (nextY + currentY) / 2 - 30;

        const t = segmentProgress;
        const x = (1 - t) * (1 - t) * currentX + 2 * (1 - t) * t * cpX + t * t * nextX;
        const y = (1 - t) * (1 - t) * currentY + 2 * (1 - t) * t * cpY + t * t * nextY;

        ctx.quadraticCurveTo(cpX, cpY, x, y);
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      trekData.forEach((point, i) => {
        const x = spacing * (i + 1);
        const y = pathY - (point.altitude - 2800) * 0.08;

        if (i <= completedSegments) {
          ctx.fillStyle = '#fbbf24';
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 3;
        } else {
          ctx.fillStyle = '#475569';
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 2;
        }

        ctx.beginPath();
        ctx.arc(x, y, i === completedSegments ? 10 : 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (i === completedSegments) {
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.4;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        if (i <= completedSegments || i === completedSegments + 1) {
          ctx.fillStyle = i <= completedSegments ? '#e2e8f0' : '#64748b';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(point.name, x, y - 25);

          ctx.font = '11px Arial';
          ctx.fillStyle = i <= completedSegments ? '#cbd5e1' : '#475569';
          ctx.fillText(`${point.altitude}m`, x, y - 10);
        }
      });
    };

    const drawInfoCard = () => {
      if (currentSegment >= trekData.length) return;

      const point = trekData[currentSegment];
      const cardWidth = 280;
      const cardHeight = 160;
      const x = canvas.width - cardWidth - 40;
      const y = 40;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x, y, cardWidth, cardHeight, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('CURRENT LOCATION', x + 20, y + 30);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 32px Arial';
      ctx.fillText(point.name, x + 20, y + 65);

      ctx.fillStyle = '#64748b';
      ctx.font = '10px Arial';
      ctx.fillText('ALTITUDE', x + 20, y + 95);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`${point.altitude}m`, x + 20, y + 118);

      ctx.fillStyle = '#64748b';
      ctx.font = '10px Arial';
      ctx.fillText('NET GAIN', x + 160, y + 95);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`+${point.netGain}m`, x + 160, y + 118);

      const progressPercent = ((currentSegment + 1) / trekData.length) * 100;
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect(x + 20, y + 135, cardWidth - 40, 8, 4);
      ctx.fill();

      const progressGradient = ctx.createLinearGradient(x + 20, 0, x + 20 + (cardWidth - 40) * (progressPercent / 100), 0);
      progressGradient.addColorStop(0, '#f59e0b');
      progressGradient.addColorStop(1, '#fbbf24');
      ctx.fillStyle = progressGradient;
      ctx.beginPath();
      ctx.roundRect(x + 20, y + 135, (cardWidth - 40) * (progressPercent / 100), 8, 4);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawMountainBackground();
      drawTerrain();
      drawPath(animationProgress);
      drawInfoCard();

      animationProgress += 0.012;

      if (animationProgress > trekData.length - 1) {
        animationProgress = 0;
        currentSegment = 0;
      } else {
        currentSegment = Math.floor(animationProgress);
      }

      setCurrentPoint(currentSegment);
      setProgress(animationProgress);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
        <p className="text-xs uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
          EVEREST BASE CAMP TREK
        </p>
      </div>
    </div>
  );
}
