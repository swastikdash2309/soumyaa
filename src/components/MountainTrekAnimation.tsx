import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TrekPoint {
  name: string;
  altitude: number;
  netGain: number;
  position: [number, number, number];
}

const trekData: TrekPoint[] = [
  { name: 'Phakding', altitude: 2881, netGain: 21, position: [0, 0, 0] },
  { name: 'Namche', altitude: 3324, netGain: 464, position: [0, 0, 0] },
  { name: 'Tengboche', altitude: 3694, netGain: 834, position: [0, 0, 0] },
  { name: 'Dingboche', altitude: 4156, netGain: 1296, position: [0, 0, 0] },
  { name: 'Lobuche', altitude: 4725, netGain: 1865, position: [0, 0, 0] },
  { name: 'Gorak Shep', altitude: 5058, netGain: 2198, position: [0, 0, 0] },
  { name: 'EBC', altitude: 5281, netGain: 2421, position: [0, 0, 0] },
  { name: 'Kala Patthar', altitude: 5515, netGain: 2655, position: [0, 0, 0] },
];

export function MountainTrekAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAltitude, setCurrentAltitude] = useState(2881);
  const [showWaypoints, setShowWaypoints] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.FogExp2(0xa0b8d0, 0.003);

    const camera = new THREE.PerspectiveCamera(
      65,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      3000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    const createSmoothSnowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 256, 256);

      for (let i = 0; i < 800; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const radius = Math.random() * 1.5;
        const brightness = 245 + Math.floor(Math.random() * 10);
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + 3}, 0.3)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(8, 8);
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
      return texture;
    };

    const createSmoothRockTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 256, 256);

      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const size = Math.random() * 1.5;
        const shade = Math.floor(Math.random() * 30) + 100;
        ctx.fillStyle = `rgba(${shade}, ${shade - 5}, ${shade - 8}, 0.2)`;
        ctx.fillRect(x, y, size, size);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(6, 6);
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
      return texture;
    };

    const createSmoothGrassTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#3d5a2f';
      ctx.fillRect(0, 0, 256, 256);

      for (let i = 0; i < 1200; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const size = Math.random() * 1.5;
        const green = Math.floor(Math.random() * 25) + 55;
        ctx.fillStyle = `rgba(${green - 15}, ${green}, ${green - 20}, 0.2)`;
        ctx.fillRect(x, y, size, size);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(10, 10);
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
      return texture;
    };

    const snowTexture = createSmoothSnowTexture();
    const rockTexture = createSmoothRockTexture();
    const grassTexture = createSmoothGrassTexture();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    sunLight.position.set(200, 300, 100);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 1500;
    sunLight.shadow.camera.left = -300;
    sunLight.shadow.camera.right = 300;
    sunLight.shadow.camera.top = 300;
    sunLight.shadow.camera.bottom = -300;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x4a5563, 0.8);
    scene.add(hemisphereLight);

    const createMassiveMountain = () => {
      const segments = 180;
      const size = 400;
      const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
      const vertices = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];

        const distanceFromCenter = Math.sqrt(x * x + y * y);
        const normalizedDistance = distanceFromCenter / (size / 2);

        let height = 0;

        const mainPeakInfluence = Math.max(0, 1 - normalizedDistance * 0.8);
        height += Math.pow(mainPeakInfluence, 1.5) * 110;

        const ridgeX = Math.abs(Math.sin(x * 0.02)) * Math.exp(-normalizedDistance * 0.5) * 25;
        const ridgeY = Math.abs(Math.cos(y * 0.025)) * Math.exp(-normalizedDistance * 0.5) * 20;
        height += ridgeX + ridgeY;

        height += Math.sin(x * 0.08) * Math.cos(y * 0.08) * Math.exp(-normalizedDistance * 0.8) * 10;
        height += Math.sin(x * 0.15) * Math.cos(y * 0.12) * Math.exp(-normalizedDistance) * 5;

        const noise = (Math.sin(x * 0.3) * Math.cos(y * 0.3) + Math.sin(x * 0.5) * Math.cos(y * 0.5)) * 2.5;
        height += noise * Math.exp(-normalizedDistance * 0.5);

        vertices[i + 2] = Math.max(0, height);
      }

      geometry.computeVertexNormals();

      const mountainGroup = new THREE.Group();

      const grassMaterial = new THREE.MeshStandardMaterial({
        map: grassTexture,
        roughness: 0.9,
        metalness: 0.0,
        flatShading: false,
      });

      const rockMaterial = new THREE.MeshStandardMaterial({
        map: rockTexture,
        roughness: 0.85,
        metalness: 0.05,
        flatShading: false,
      });

      const snowMaterial = new THREE.MeshStandardMaterial({
        map: snowTexture,
        roughness: 0.4,
        metalness: 0.2,
        flatShading: false,
      });

      const grassLayer = new THREE.Mesh(geometry.clone(), grassMaterial);
      grassLayer.rotation.x = -Math.PI / 2;
      grassLayer.receiveShadow = true;
      grassLayer.castShadow = false;
      mountainGroup.add(grassLayer);

      const rockGeometry = geometry.clone();
      const rockVertices = rockGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rockVertices.length; i += 3) {
        rockVertices[i + 2] = Math.max(0, rockVertices[i + 2] - 8);
      }
      rockGeometry.computeVertexNormals();

      const rockLayer = new THREE.Mesh(rockGeometry, rockMaterial);
      rockLayer.rotation.x = -Math.PI / 2;
      rockLayer.position.y = 8;
      rockLayer.receiveShadow = true;
      rockLayer.castShadow = false;
      mountainGroup.add(rockLayer);

      const snowGeometry = geometry.clone();
      const snowVertices = snowGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < snowVertices.length; i += 3) {
        snowVertices[i + 2] = Math.max(0, snowVertices[i + 2] - 22);
      }
      snowGeometry.computeVertexNormals();

      const snowLayer = new THREE.Mesh(snowGeometry, snowMaterial);
      snowLayer.rotation.x = -Math.PI / 2;
      snowLayer.position.y = 22;
      snowLayer.receiveShadow = true;
      snowLayer.castShadow = false;
      mountainGroup.add(snowLayer);

      return { mountainGroup, geometry: geometry.clone() };
    };

    const { mountainGroup, geometry: mountainGeometry } = createMassiveMountain();
    scene.add(mountainGroup);

    const getHeightAtPosition = (x: number, z: number): number => {
      const size = 400;
      const segments = 180;
      const vertices = mountainGeometry.attributes.position.array as Float32Array;

      const normalizedX = (x + size / 2) / size;
      const normalizedZ = (z + size / 2) / size;

      if (normalizedX < 0 || normalizedX > 1 || normalizedZ < 0 || normalizedZ > 1) {
        return 0;
      }

      const gridX = normalizedX * segments;
      const gridZ = normalizedZ * segments;

      const x0 = Math.floor(gridX);
      const z0 = Math.floor(gridZ);
      const x1 = Math.min(x0 + 1, segments);
      const z1 = Math.min(z0 + 1, segments);

      const tx = gridX - x0;
      const tz = gridZ - z0;

      const getVertex = (ix: number, iz: number) => {
        const index = (iz * (segments + 1) + ix) * 3;
        if (index >= 0 && index < vertices.length) {
          return vertices[index + 2];
        }
        return 0;
      };

      const h00 = getVertex(x0, z0);
      const h10 = getVertex(x1, z0);
      const h01 = getVertex(x0, z1);
      const h11 = getVertex(x1, z1);

      const h0 = h00 * (1 - tx) + h10 * tx;
      const h1 = h01 * (1 - tx) + h11 * tx;
      const height = h0 * (1 - tz) + h1 * tz;

      return height + 0.5;
    };

    const createTrekPath = () => {
      const numPoints = 80;
      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;

        const angle = t * Math.PI * 1.35 - Math.PI * 0.675;
        const radius = 78 - t * 58;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const terrainHeight = getHeightAtPosition(x, z);
        const y = terrainHeight + 0.55;

        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
      const refinedPoints = curve.getPoints(600);

      for (let i = 0; i < refinedPoints.length; i++) {
        const point = refinedPoints[i];
        const terrainHeight = getHeightAtPosition(point.x, point.z);
        point.y = terrainHeight + 0.55;
      }

      const finalCurve = new THREE.CatmullRomCurve3(refinedPoints, false, 'catmullrom', 0.2);

      const pathGeometry = new THREE.TubeGeometry(finalCurve, 600, 0.2, 12, false);
      const pathMaterial = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.3,
        roughness: 0.3,
        metalness: 0.7,
      });

      const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);
      pathMesh.castShadow = true;

      const waypointMarkers: THREE.Mesh[] = [];
      const waypointSpacing = Math.floor(refinedPoints.length / (trekData.length - 1));

      trekData.forEach((point, index) => {
        const pointIndex = Math.min(index * waypointSpacing, refinedPoints.length - 1);
        const pos = refinedPoints[pointIndex];
        point.position = [pos.x, pos.y, pos.z];

        const markerGeometry = new THREE.SphereGeometry(0.7, 16, 16);
        const markerMaterial = new THREE.MeshStandardMaterial({
          color: 0xff5722,
          emissive: 0xff5722,
          emissiveIntensity: 1.0,
          metalness: 0.5,
          roughness: 0.3,
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(pos.x, pos.y, pos.z);
        marker.castShadow = true;

        const poleGeometry = new THREE.CylinderGeometry(0.08, 0.08, 3.5, 8);
        const poleMaterial = new THREE.MeshStandardMaterial({
          color: 0x222222,
          metalness: 0.8,
          roughness: 0.2,
        });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.set(pos.x, pos.y + 1.75, pos.z);
        pole.castShadow = true;

        waypointMarkers.push(marker, pole);
      });

      return { pathMesh, curve: finalCurve, waypointMarkers };
    };

    const { pathMesh, curve, waypointMarkers } = createTrekPath();
    scene.add(pathMesh);
    waypointMarkers.forEach(marker => scene.add(marker));

    const createSnowParticles = () => {
      const particleCount = 3000;
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 350;
        positions[i * 3 + 1] = Math.random() * 140 + 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 350;

        velocities[i * 3] = (Math.random() - 0.5) * 0.3;
        velocities[i * 3 + 1] = -Math.random() * 0.2 - 0.08;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.3,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);

      return { particles, velocities };
    };

    const { particles: snowParticles, velocities: snowVelocities } = createSnowParticles();
    scene.add(snowParticles);

    const createClouds = () => {
      const cloudsGroup = new THREE.Group();

      for (let i = 0; i < 35; i++) {
        const cloudGeometry = new THREE.SphereGeometry(4 + Math.random() * 6, 12, 12);
        const cloudMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.35 + Math.random() * 0.15,
          roughness: 1,
        });

        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
          (Math.random() - 0.5) * 280,
          35 + Math.random() * 50,
          (Math.random() - 0.5) * 280
        );
        cloud.scale.set(1.8 + Math.random(), 0.7 + Math.random() * 0.3, 1.8 + Math.random());

        cloudsGroup.add(cloud);
      }

      return cloudsGroup;
    };

    const clouds = createClouds();
    scene.add(clouds);

    for (let i = 0; i < 250; i++) {
      const treeHeight = 2.5 + Math.random() * 2.5;
      const treeGeometry = new THREE.ConeGeometry(0.4, treeHeight, 8);
      const treeMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a4d0f,
        roughness: 0.9,
      });
      const tree = new THREE.Mesh(treeGeometry, treeMaterial);

      const angle = Math.random() * Math.PI * 2;
      const distance = 55 + Math.random() * 75;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const terrainHeight = getHeightAtPosition(x, z);

      if (terrainHeight < 25) {
        tree.position.set(x, terrainHeight + treeHeight / 2, z);
        tree.castShadow = true;
        scene.add(tree);
      }
    }

    camera.position.set(0, 5, 30);
    camera.lookAt(0, 0, 0);

    let animationProgress = 0;
    const animationDuration = 20;
    let waypointDisplayTime = 0;
    let isShowingWaypoints = false;

    const smoothCamera = {
      position: new THREE.Vector3(),
      target: new THREE.Vector3(),
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      const deltaTime = 1 / 60;
      animationProgress += deltaTime;

      const positions = snowParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += snowVelocities[i * 3] * 0.4;
        positions[i * 3 + 1] += snowVelocities[i * 3 + 1];
        positions[i * 3 + 2] += snowVelocities[i * 3 + 2] * 0.4;

        if (positions[i * 3 + 1] < 0) {
          positions[i * 3] = (Math.random() - 0.5) * 350;
          positions[i * 3 + 1] = 140;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 350;
        }
      }
      snowParticles.geometry.attributes.position.needsUpdate = true;

      if (animationProgress > animationDuration && !isShowingWaypoints) {
        isShowingWaypoints = true;
        waypointDisplayTime = 0;
        setShowWaypoints(true);
      }

      if (isShowingWaypoints) {
        waypointDisplayTime += deltaTime;

        const zoomProgress = Math.min(waypointDisplayTime / 2, 1);
        const easeProgress = 1 - Math.pow(1 - zoomProgress, 3);

        const startPos = curve.getPointAt(1);
        const targetPos = new THREE.Vector3(
          startPos.x,
          startPos.y + 20 + easeProgress * 90,
          startPos.z + 25 + easeProgress * 15
        );
        const targetLook = new THREE.Vector3(0, 45, 0);

        smoothCamera.position.lerp(targetPos, 0.05);
        smoothCamera.target.lerp(targetLook, 0.05);

        camera.position.copy(smoothCamera.position);
        camera.lookAt(smoothCamera.target);

        if (waypointDisplayTime > 3) {
          animationProgress = 0;
          isShowingWaypoints = false;
          waypointDisplayTime = 0;
          setShowWaypoints(false);
        }
      } else {
        const t = Math.min(animationProgress / animationDuration, 1);
        const easedT = t * t * (3 - 2 * t);

        const position = curve.getPointAt(easedT);
        const tangent = curve.getTangentAt(easedT);

        const cameraDistance = 11 - easedT * 4;
        const cameraHeight = 4.5 + easedT * 2.5;

        const targetCamPos = new THREE.Vector3(
          position.x - tangent.z * cameraDistance,
          position.y + cameraHeight,
          position.z + tangent.x * cameraDistance
        );

        const lookAhead = 9;
        const targetLookAt = new THREE.Vector3(
          position.x + tangent.x * lookAhead,
          position.y + 2.5,
          position.z + tangent.z * lookAhead
        );

        smoothCamera.position.lerp(targetCamPos, 0.08);
        smoothCamera.target.lerp(targetLookAt, 0.08);

        camera.position.copy(smoothCamera.position);
        camera.lookAt(smoothCamera.target);

        const startAlt = trekData[0].altitude;
        const endAlt = trekData[trekData.length - 1].altitude;
        const interpolatedAlt = Math.floor(startAlt + (endAlt - startAlt) * easedT);
        setCurrentAltitude(interpolatedAlt);

        const phaseProgress = easedT * 6;
        if (phaseProgress < 1) {
          scene.fog = new THREE.FogExp2(0xa8d5f2, 0.005);
          scene.background = new THREE.Color(0x87ceeb);
        } else if (phaseProgress < 2) {
          scene.fog = new THREE.FogExp2(0xa0b8d0, 0.006);
          scene.background = new THREE.Color(0x7ab8d9);
        } else if (phaseProgress < 3) {
          scene.fog = new THREE.FogExp2(0x8fa3bc, 0.008);
          scene.background = new THREE.Color(0x6a9ec7);
        } else if (phaseProgress < 4) {
          scene.fog = new THREE.FogExp2(0x7a8a9a, 0.01);
          scene.background = new THREE.Color(0x5a7a9a);
        } else if (phaseProgress < 5) {
          scene.fog = new THREE.FogExp2(0xc8ddf0, 0.011);
          scene.background = new THREE.Color(0x4a7c9e);
        } else {
          scene.fog = new THREE.FogExp2(0xffa07a, 0.004);
          scene.background = new THREE.Color(0xff8c42);
          sunLight.color.setHex(0xffb380);
        }
      }

      clouds.rotation.y += 0.00008;
      clouds.children.forEach((cloud, index) => {
        cloud.position.x += Math.sin(animationProgress * 0.08 + index) * 0.008;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      grassTexture.dispose();
      rockTexture.dispose();
      snowTexture.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[700px] rounded-xl overflow-hidden shadow-2xl">
      <div ref={containerRef} className="w-full h-full" />

      {!showWaypoints && (
        <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md rounded-lg px-6 py-4 border border-slate-700/50">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Current Elevation
          </p>
          <p className="text-4xl font-bold text-white mb-2">
            {currentAltitude}m
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1 w-32 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300"
                style={{ width: `${((currentAltitude - 2881) / (5515 - 2881)) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">
              {Math.round(((currentAltitude - 2881) / (5515 - 2881)) * 100)}%
            </span>
          </div>
        </div>
      )}

      {showWaypoints && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 space-y-3">
          {trekData.map((point, index) => (
            <div
              key={index}
              className="bg-slate-900/90 backdrop-blur-md rounded-lg px-4 py-2 border border-slate-700/70 flex items-center gap-3 min-w-[280px]"
            >
              <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{point.name}</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-gray-400">
                    Alt: <span className="text-white font-semibold">{point.altitude}m</span>
                  </span>
                  <span className="text-gray-400">
                    Gain: <span className="text-yellow-400 font-semibold">+{point.netGain}m</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
