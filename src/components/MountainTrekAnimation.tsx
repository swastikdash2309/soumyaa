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
  { name: 'Namche', altitude: 3324, netGain: 464, position: [20, 4.5, 15] },
  { name: 'Tengboche', altitude: 3694, netGain: 834, position: [35, 8.5, 25] },
  { name: 'Dingboche', altitude: 4156, netGain: 1296, position: [50, 13, 35] },
  { name: 'Lobuche', altitude: 4725, netGain: 1865, position: [65, 19, 45] },
  { name: 'Gorak Shep', altitude: 5058, netGain: 2198, position: [75, 22, 52] },
  { name: 'EBC', altitude: 5281, netGain: 2421, position: [82, 24.5, 58] },
  { name: 'Kala Patthar', altitude: 5515, netGain: 2655, position: [88, 27, 65] },
];

export function MountainTrekAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAltitude, setCurrentAltitude] = useState(2881);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [showWaypoints, setShowWaypoints] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.FogExp2(0xa0b8d0, 0.006);

    const camera = new THREE.PerspectiveCamera(
      70,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    containerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    const createRockTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 3;
        const shade = Math.floor(Math.random() * 60) + 60;
        ctx.fillStyle = `rgb(${shade}, ${shade - 10}, ${shade - 15})`;
        ctx.fillRect(x, y, size, size);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(8, 8);
      return texture;
    };

    const createSnowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#f0f4f8';
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 2;
        const brightness = Math.floor(Math.random() * 40) + 215;
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 5})`;
        ctx.fillRect(x, y, size, size);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(10, 10);
      return texture;
    };

    const createGrassTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#2d5016';
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 2;
        const green = Math.floor(Math.random() * 40) + 40;
        ctx.fillStyle = `rgb(${green - 20}, ${green}, ${green - 30})`;
        ctx.fillRect(x, y, size, size);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(12, 12);
      return texture;
    };

    const rockTexture = createRockTexture();
    const snowTexture = createSnowTexture();
    const grassTexture = createGrassTexture();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2);
    sunLight.position.set(100, 150, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 1000;
    sunLight.shadow.camera.left = -150;
    sunLight.shadow.camera.right = 150;
    sunLight.shadow.camera.top = 150;
    sunLight.shadow.camera.bottom = -150;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x4a5563, 0.6);
    scene.add(hemisphereLight);

    const rimLight = new THREE.DirectionalLight(0xffa07a, 0.8);
    rimLight.position.set(-50, 50, -50);
    scene.add(rimLight);

    const createDetailedTerrain = () => {
      const terrainGroup = new THREE.Group();
      const segments = 200;
      const size = 150;

      const createTerrainLayer = (
        heightMultiplier: number,
        baseHeight: number,
        material: THREE.Material,
        steepness: number
      ) => {
        const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
        const vertices = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < vertices.length; i += 3) {
          const x = vertices[i];
          const y = vertices[i + 1];
          const distanceFromCenter = Math.sqrt(x * x + y * y);

          let elevation = baseHeight;

          elevation += Math.pow(Math.abs(x) / size, steepness) * heightMultiplier * 15;
          elevation += Math.pow(Math.abs(y) / size, steepness) * heightMultiplier * 12;

          elevation += Math.sin(x * 0.08) * heightMultiplier * 3;
          elevation += Math.cos(y * 0.06) * heightMultiplier * 2.5;
          elevation += Math.sin(x * 0.03 + y * 0.04) * heightMultiplier * 6;

          const noise1 = Math.sin(x * 0.2) * Math.cos(y * 0.2) * heightMultiplier * 2;
          const noise2 = Math.sin(x * 0.5 + y * 0.3) * heightMultiplier * 1.5;
          elevation += noise1 + noise2;

          const ridgeFactor = Math.abs(Math.sin(x * 0.08)) * heightMultiplier * 8;
          elevation += ridgeFactor;

          vertices[i + 2] = elevation;
        }

        geometry.computeVertexNormals();

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        return mesh;
      };

      const forestMaterial = new THREE.MeshStandardMaterial({
        map: grassTexture,
        roughness: 0.95,
        metalness: 0.0,
      });

      const rockMaterial = new THREE.MeshStandardMaterial({
        map: rockTexture,
        roughness: 0.9,
        metalness: 0.05,
        bumpMap: rockTexture,
        bumpScale: 0.5,
      });

      const snowMaterial = new THREE.MeshStandardMaterial({
        map: snowTexture,
        roughness: 0.4,
        metalness: 0.2,
        bumpMap: snowTexture,
        bumpScale: 0.3,
      });

      const forestTerrain = createTerrainLayer(0.8, 0, forestMaterial, 1.2);
      terrainGroup.add(forestTerrain);

      const rockTerrain = createTerrainLayer(1.5, 8, rockMaterial, 1.5);
      terrainGroup.add(rockTerrain);

      const snowTerrain = createTerrainLayer(2.2, 20, snowMaterial, 1.8);
      terrainGroup.add(snowTerrain);

      for (let i = 0; i < 200; i++) {
        const treeHeight = 2.5 + Math.random() * 2;
        const treeGeometry = new THREE.ConeGeometry(0.4, treeHeight, 8);
        const treeMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a4d0f,
          roughness: 0.95,
        });
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);

        const angle = Math.random() * Math.PI * 2;
        const distance = 10 + Math.random() * 40;
        tree.position.set(
          Math.cos(angle) * distance,
          treeHeight / 2,
          Math.sin(angle) * distance
        );
        tree.castShadow = true;
        terrainGroup.add(tree);
      }

      for (let i = 0; i < 120; i++) {
        const rockGeometry = new THREE.DodecahedronGeometry(0.5 + Math.random() * 1.2, 1);
        const rockMat = new THREE.MeshStandardMaterial({
          color: 0x3a3330,
          roughness: 0.95,
          metalness: 0.05,
        });
        const rock = new THREE.Mesh(rockGeometry, rockMat);

        const angle = Math.random() * Math.PI * 2;
        const distance = 15 + Math.random() * 60;
        rock.position.set(
          Math.cos(angle) * distance,
          10 + Math.random() * 15,
          Math.sin(angle) * distance
        );
        rock.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        rock.castShadow = true;
        terrainGroup.add(rock);
      }

      return terrainGroup;
    };

    const terrain = createDetailedTerrain();
    scene.add(terrain);

    const createMountainPeaks = () => {
      const peaksGroup = new THREE.Group();

      for (let i = 0; i < 12; i++) {
        const peakHeight = 40 + Math.random() * 35;
        const peakGeometry = new THREE.ConeGeometry(10 + Math.random() * 8, peakHeight, 7);
        const peakMaterial = new THREE.MeshStandardMaterial({
          map: i % 2 === 0 ? snowTexture : rockTexture,
          roughness: 0.85,
          metalness: 0.1,
        });

        const peak = new THREE.Mesh(peakGeometry, peakMaterial);
        const angle = (i / 12) * Math.PI * 2;
        const distance = 90 + Math.random() * 40;

        peak.position.set(
          Math.cos(angle) * distance,
          peakHeight / 2 + 15,
          Math.sin(angle) * distance
        );

        peak.rotation.y = Math.random() * Math.PI;
        peak.castShadow = true;
        peak.receiveShadow = true;

        peaksGroup.add(peak);
      }

      return peaksGroup;
    };

    const mountainPeaks = createMountainPeaks();
    scene.add(mountainPeaks);

    const createTrekPath = () => {
      const points = trekData.map(point => new THREE.Vector3(...point.position));
      const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.3);

      const pathGeometry = new THREE.TubeGeometry(curve, 300, 0.2, 12, false);
      const pathMaterial = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.2,
        roughness: 0.2,
        metalness: 0.7,
      });

      const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);

      const waypointMarkers: THREE.Mesh[] = [];
      trekData.forEach((point, index) => {
        const markerGeometry = new THREE.SphereGeometry(0.6, 16, 16);
        const markerMaterial = new THREE.MeshStandardMaterial({
          color: 0xff5722,
          emissive: 0xff5722,
          emissiveIntensity: 0.8,
          metalness: 0.5,
          roughness: 0.3,
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(...point.position);
        marker.castShadow = true;

        const poleGeometry = new THREE.CylinderGeometry(0.08, 0.08, 3, 8);
        const poleMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.2,
        });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.set(point.position[0], point.position[1] + 1.5, point.position[2]);
        pole.castShadow = true;

        waypointMarkers.push(marker, pole);
      });

      return { pathMesh, curve, waypointMarkers };
    };

    const { pathMesh, curve, waypointMarkers } = createTrekPath();
    scene.add(pathMesh);
    waypointMarkers.forEach(marker => scene.add(marker));

    const createClouds = () => {
      const cloudsGroup = new THREE.Group();

      for (let i = 0; i < 40; i++) {
        const cloudGeometry = new THREE.SphereGeometry(4 + Math.random() * 5, 12, 12);
        const cloudMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
          roughness: 1,
        });

        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
          (Math.random() - 0.5) * 200,
          20 + Math.random() * 30,
          (Math.random() - 0.5) * 200
        );
        cloud.scale.set(1.5 + Math.random(), 0.6 + Math.random() * 0.4, 1.5 + Math.random());

        cloudsGroup.add(cloud);
      }

      return cloudsGroup;
    };

    const clouds = createClouds();
    scene.add(clouds);

    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    let animationProgress = 0;
    const animationDuration = 20;
    let waypointDisplayTime = 0;
    let isShowingWaypoints = false;

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

      if (animationProgress > animationDuration && !isShowingWaypoints) {
        isShowingWaypoints = true;
        waypointDisplayTime = 0;
        setShowWaypoints(true);
      }

      if (isShowingWaypoints) {
        waypointDisplayTime += deltaTime;

        const zoomProgress = Math.min(waypointDisplayTime / 1, 1);
        const easeProgress = 1 - Math.pow(1 - zoomProgress, 3);

        const startPos = curve.getPointAt(1);
        const targetX = 44;
        const targetY = 60;
        const targetZ = 40;

        camera.position.x = startPos.x + (targetX - startPos.x) * easeProgress;
        camera.position.y = startPos.y + 10 + (targetY - startPos.y - 10) * easeProgress;
        camera.position.z = startPos.z + 10 + (targetZ - startPos.z - 10) * easeProgress;

        const lookAtX = 44;
        const lookAtY = 13.5;
        const lookAtZ = 32;
        camera.lookAt(lookAtX, lookAtY, lookAtZ);

        if (waypointDisplayTime > 3) {
          animationProgress = 0;
          isShowingWaypoints = false;
          waypointDisplayTime = 0;
          setShowWaypoints(false);
        }
      } else {
        const t = Math.min(animationProgress / animationDuration, 1);

        const position = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t);

        const cameraHeight = 4 + Math.sin(t * Math.PI * 0.5) * 2;
        const cameraDistance = 10 - t * 4;

        const offsetX = -tangent.z * cameraDistance;
        const offsetY = cameraHeight;
        const offsetZ = tangent.x * cameraDistance;

        camera.position.set(
          position.x + offsetX,
          position.y + offsetY,
          position.z + offsetZ
        );

        const lookAheadDistance = 8;
        camera.lookAt(
          position.x + tangent.x * lookAheadDistance,
          position.y + 2,
          position.z + tangent.z * lookAheadDistance
        );

        const currentPointIndex = Math.min(Math.floor(t * trekData.length), trekData.length - 1);
        setCurrentPoint(currentPointIndex);

        const startAlt = trekData[0].altitude;
        const endAlt = trekData[trekData.length - 1].altitude;
        const interpolatedAlt = Math.floor(startAlt + (endAlt - startAlt) * t);
        setCurrentAltitude(interpolatedAlt);

        const phaseProgress = t * 6;
        if (phaseProgress < 1) {
          scene.fog = new THREE.FogExp2(0xa8d5f2, 0.008);
          scene.background = new THREE.Color(0x87ceeb);
        } else if (phaseProgress < 2) {
          scene.fog = new THREE.FogExp2(0xa0b8d0, 0.01);
          scene.background = new THREE.Color(0x7ab8d9);
        } else if (phaseProgress < 3) {
          scene.fog = new THREE.FogExp2(0x8fa3bc, 0.012);
          scene.background = new THREE.Color(0x6a9ec7);
        } else if (phaseProgress < 4) {
          scene.fog = new THREE.FogExp2(0x7a8a9a, 0.014);
          scene.background = new THREE.Color(0x5a7a9a);
        } else if (phaseProgress < 5) {
          scene.fog = new THREE.FogExp2(0xc8ddf0, 0.016);
          scene.background = new THREE.Color(0x4a7c9e);
        } else {
          scene.fog = new THREE.FogExp2(0xffa07a, 0.006);
          scene.background = new THREE.Color(0xff8c42);
          sunLight.color.setHex(0xffb380);
        }
      }

      clouds.rotation.y += 0.0002;
      clouds.children.forEach((cloud, index) => {
        cloud.position.x += Math.sin(animationProgress * 0.1 + index) * 0.008;
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
