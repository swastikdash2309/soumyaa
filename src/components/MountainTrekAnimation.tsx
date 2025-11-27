import { useEffect, useRef, useState } from 'react';

interface TrekPoint {
  name: string;
  altitude: number;
  netGain: number;
}

const trekData: TrekPoint[] = [
  { name: 'Phakding', altitude: 2881, netGain: 21 },
  { name: 'Namche', altitude: 3324, netGain: 464 },
  { name: 'Tengboche', altitude: 3694, netGain: 834 },
  { name: 'Dingboche', altitude: 4156, netGain: 1296 },
  { name: 'Lobuche', altitude: 4725, netGain: 1865 },
  { name: 'Gorak Shep', altitude: 5058, netGain: 2198 },
  { name: 'EBC', altitude: 5281, netGain: 2421 },
  { name: 'Kala Patthar', altitude: 5515, netGain: 2655 },
];

export function MountainTrekAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPhase, setCurrentPhase] = useState('aerial');
  const [currentPoint, setCurrentPoint] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
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

    let time = 0;
    const phases = ['aerial', 'forest', 'mid-elevation', 'rocky', 'glacier', 'summit'];
    let phaseIndex = 0;
    let phaseProgress = 0;

    const createMountainPeaks = (count: number) => {
      const peaks = [];
      for (let i = 0; i < count; i++) {
        peaks.push({
          x: (i / count) * canvas.width * 1.5,
          baseHeight: 0.3 + Math.random() * 0.4,
          width: 200 + Math.random() * 300,
          snowLine: 0.3 + Math.random() * 0.2,
          offset: Math.random() * 100,
        });
      }
      return peaks;
    };

    let mountainPeaks = createMountainPeaks(12);

    const drawSky = (phase: string, time: number) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

      if (phase === 'summit') {
        gradient.addColorStop(0, '#ff6b35');
        gradient.addColorStop(0.3, '#ff8c42');
        gradient.addColorStop(0.6, '#ffa07a');
        gradient.addColorStop(1, '#87ceeb');
      } else if (phase === 'glacier') {
        gradient.addColorStop(0, '#1e3a5f');
        gradient.addColorStop(0.5, '#2d5a7b');
        gradient.addColorStop(1, '#4a7c9e');
      } else if (phase === 'rocky' || phase === 'mid-elevation') {
        gradient.addColorStop(0, '#2c5f8d');
        gradient.addColorStop(0.5, '#4a90c9');
        gradient.addColorStop(1, '#87ceeb');
      } else {
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(0.6, '#a8d5f2');
        gradient.addColorStop(1, '#d4ebf7');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 0.6;
      for (let i = 0; i < 50; i++) {
        const x = ((time * 0.5 + i * 50) % (canvas.width + 200)) - 100;
        const y = (i * 15) % canvas.height;
        const size = 60 + Math.sin(time * 0.001 + i) * 30;

        const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = cloudGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawMountainRange = (phase: string, time: number, cameraY: number) => {
      const horizon = canvas.height * (0.4 + cameraY);

      for (let layer = 0; layer < 5; layer++) {
        const depth = layer / 5;
        const parallax = 1 - depth * 0.7;

        ctx.globalAlpha = 0.3 + depth * 0.7;

        mountainPeaks.forEach((peak, i) => {
          const x = peak.x - time * parallax * 20 + peak.offset;
          if (x < -peak.width || x > canvas.width + peak.width) return;

          const baseY = horizon + layer * 50;
          const peakHeight = canvas.height * peak.baseHeight * (1 - depth * 0.3);
          const topY = baseY - peakHeight;

          const mountainGradient = ctx.createLinearGradient(x, topY, x, baseY);

          if (phase === 'summit' || phase === 'glacier') {
            mountainGradient.addColorStop(0, depth > 0.6 ? '#f0f4f8' : '#e8eef5');
            mountainGradient.addColorStop(peak.snowLine, depth > 0.6 ? '#b8c5d6' : '#8fa3bc');
            mountainGradient.addColorStop(1, depth > 0.6 ? '#5a6b7d' : '#3d4f63');
          } else if (phase === 'rocky' || phase === 'mid-elevation') {
            mountainGradient.addColorStop(0, depth > 0.6 ? '#d4dce6' : '#c2cdd9');
            mountainGradient.addColorStop(peak.snowLine, depth > 0.6 ? '#8a9aa8' : '#6d7e8f');
            mountainGradient.addColorStop(1, depth > 0.6 ? '#4a5563' : '#2f3a45');
          } else {
            mountainGradient.addColorStop(0, depth > 0.6 ? '#b8c9d6' : '#a0b5c7');
            mountainGradient.addColorStop(0.6, depth > 0.6 ? '#6b7f8f' : '#4d6170');
            mountainGradient.addColorStop(1, depth > 0.6 ? '#3d4a56' : '#2a3640');
          }

          ctx.fillStyle = mountainGradient;
          ctx.beginPath();
          ctx.moveTo(x - peak.width / 2, baseY);

          const segments = 20;
          for (let s = 0; s <= segments; s++) {
            const t = s / segments;
            const xPos = x - peak.width / 2 + t * peak.width;
            const ruggedness = Math.sin(t * Math.PI * 8 + peak.offset) * (peakHeight * 0.05);
            const yPos = baseY - Math.sin(t * Math.PI) * peakHeight + ruggedness;
            ctx.lineTo(xPos, yPos);
          }

          ctx.lineTo(x + peak.width / 2, baseY);
          ctx.closePath();
          ctx.fill();

          if (depth > 0.5 && (phase === 'summit' || phase === 'glacier')) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - 20, topY + 30);
            ctx.lineTo(x, topY);
            ctx.lineTo(x + 20, topY + 30);
            ctx.stroke();
          }
        });
      }
      ctx.globalAlpha = 1;
    };

    const drawTerrain = (phase: string, time: number) => {
      const groundY = canvas.height * 0.7;

      const terrainGradient = ctx.createLinearGradient(0, groundY - 100, 0, canvas.height);

      if (phase === 'forest') {
        terrainGradient.addColorStop(0, '#2d5016');
        terrainGradient.addColorStop(0.5, '#1a3d0f');
        terrainGradient.addColorStop(1, '#0f2408');
      } else if (phase === 'mid-elevation') {
        terrainGradient.addColorStop(0, '#5a4a3a');
        terrainGradient.addColorStop(0.5, '#3d3028');
        terrainGradient.addColorStop(1, '#2a1f18');
      } else if (phase === 'rocky') {
        terrainGradient.addColorStop(0, '#6d6660');
        terrainGradient.addColorStop(0.5, '#4a4440');
        terrainGradient.addColorStop(1, '#2d2a28');
      } else if (phase === 'glacier' || phase === 'summit') {
        terrainGradient.addColorStop(0, '#e8f4ff');
        terrainGradient.addColorStop(0.5, '#c8ddf0');
        terrainGradient.addColorStop(1, '#a0b8d0');
      } else {
        terrainGradient.addColorStop(0, '#8b7355');
        terrainGradient.addColorStop(1, '#5d4a3a');
      }

      ctx.fillStyle = terrainGradient;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 10) {
        const wave = Math.sin((x + time * 0.5) * 0.01) * 20;
        const noise = Math.sin((x + time) * 0.03) * 10;
        ctx.lineTo(x, groundY + wave + noise);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      if (phase === 'forest' || phase === 'mid-elevation') {
        ctx.globalAlpha = 0.7;
        for (let i = 0; i < 30; i++) {
          const treeX = ((i * 100 + time * 2) % (canvas.width + 200)) - 100;
          const treeY = groundY + Math.sin(treeX * 0.01) * 20;
          const treeHeight = 60 + Math.sin(i) * 30;

          if (phase === 'forest') {
            ctx.fillStyle = '#1a3d0f';
          } else {
            ctx.fillStyle = i % 3 === 0 ? '#3d3028' : 'transparent';
            if (ctx.fillStyle === 'transparent') continue;
          }

          ctx.beginPath();
          ctx.moveTo(treeX, treeY);
          ctx.lineTo(treeX - 15, treeY - treeHeight);
          ctx.lineTo(treeX + 15, treeY - treeHeight);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#0f2408';
          ctx.fillRect(treeX - 3, treeY - 20, 6, 20);
        }
        ctx.globalAlpha = 1;
      }

      if (phase === 'rocky' || phase === 'glacier') {
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < 40; i++) {
          const rockX = ((i * 80 + time * 3) % (canvas.width + 150)) - 75;
          const rockY = groundY + Math.sin(rockX * 0.02) * 15;
          const rockSize = 10 + Math.random() * 20;

          ctx.fillStyle = phase === 'rocky' ? '#3a3330' : '#d0e0f0';
          ctx.beginPath();
          ctx.arc(rockX, rockY, rockSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    };

    const drawTrekPath = (time: number, progress: number) => {
      const baseY = canvas.height * 0.7;
      const pathLength = canvas.width * 0.8;
      const startX = canvas.width * 0.1;

      ctx.strokeStyle = 'rgba(100, 100, 120, 0.3)';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();

      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const x = startX + pathLength * t;
        const elevation = Math.pow(t, 1.8) * 200;
        const wave = Math.sin(t * Math.PI * 3) * 30;
        const y = baseY - elevation + wave;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      const gradient = ctx.createLinearGradient(startX, baseY, startX + pathLength, baseY - 200);
      gradient.addColorStop(0, '#fbbf24');
      gradient.addColorStop(1, '#f59e0b');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 6;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 20;
      ctx.lineCap = 'round';

      ctx.beginPath();
      for (let i = 0; i <= progress * 100; i++) {
        const t = i / 100;
        const x = startX + pathLength * t;
        const elevation = Math.pow(t, 1.8) * 200;
        const wave = Math.sin(t * Math.PI * 3) * 30;
        const y = baseY - elevation + wave;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      const currentT = progress;
      const currentX = startX + pathLength * currentT;
      const currentElevation = Math.pow(currentT, 1.8) * 200;
      const currentWave = Math.sin(currentT * Math.PI * 3) * 30;
      const currentY = baseY - currentElevation + currentWave;

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 20 + Math.sin(time * 0.005) * 5, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawElevationMarkers = (currentAltitude: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${currentAltitude}m`, canvas.width / 2, 50);

      ctx.font = '12px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('ELEVATION', canvas.width / 2, 70);
    };

    const drawAtmosphere = (phase: string, time: number) => {
      if (phase === 'glacier' || phase === 'summit') {
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 30; i++) {
          const x = ((time * 4 + i * 50) % (canvas.width + 100)) - 50;
          const y = (i * 30 + Math.sin(time * 0.002 + i) * 50) % canvas.height;
          const size = 3 + Math.random() * 4;

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      const fogGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
      fogGradient.addColorStop(0, 'rgba(200, 220, 240, 0)');
      fogGradient.addColorStop(1, 'rgba(200, 220, 240, 0.2)');
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
    };

    const animate = () => {
      time += 1;
      phaseProgress += 0.0008;

      if (phaseProgress >= 1) {
        phaseProgress = 0;
        phaseIndex = (phaseIndex + 1) % phases.length;
        if (phaseIndex === 0) {
          mountainPeaks = createMountainPeaks(12);
        }
      }

      const currentPhase = phases[phaseIndex];
      const overallProgress = (phaseIndex + phaseProgress) / phases.length;
      const currentPointIndex = Math.min(Math.floor(overallProgress * trekData.length), trekData.length - 1);
      const currentAltitude = trekData[currentPointIndex].altitude;

      setCurrentPhase(currentPhase);
      setCurrentPoint(currentPointIndex);

      const cameraY = Math.sin(phaseProgress * Math.PI) * 0.1;

      drawSky(currentPhase, time);
      drawMountainRange(currentPhase, time, cameraY);
      drawTerrain(currentPhase, time);
      drawTrekPath(time, overallProgress);
      drawAtmosphere(currentPhase, time);
      drawElevationMarkers(currentAltitude);

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

  const getPhaseLabel = (phase: string) => {
    const labels: { [key: string]: string } = {
      aerial: 'Aerial Overview',
      forest: 'Lower Elevation Forest',
      'mid-elevation': 'Mid-Elevation Transition',
      rocky: 'Rocky High-Mountain',
      glacier: 'Glacier Region',
      summit: 'Summit Ascent',
    };
    return labels[phase] || phase;
  };

  return (
    <div className="relative w-full h-[700px] rounded-xl overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full" />

      <div className="absolute top-6 left-6 bg-slate-900/70 backdrop-blur-md rounded-lg px-5 py-3 border border-slate-700/50">
        <p className="text-xs uppercase tracking-widest text-gray-300 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
          Trek Phase
        </p>
        <p className="text-sm font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
          {getPhaseLabel(currentPhase)}
        </p>
      </div>

      <div className="absolute bottom-6 left-6 bg-slate-900/70 backdrop-blur-md rounded-lg px-5 py-3 border border-slate-700/50">
        <p className="text-xs uppercase tracking-widest text-gray-300 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
          Current Waypoint
        </p>
        <p className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
          {trekData[currentPoint].name}
        </p>
        <div className="flex gap-4 text-xs">
          <div>
            <span className="text-gray-400">Alt: </span>
            <span className="text-white font-semibold">{trekData[currentPoint].altitude}m</span>
          </div>
          <div>
            <span className="text-gray-400">Gain: </span>
            <span className="text-yellow-400 font-semibold">+{trekData[currentPoint].netGain}m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
