import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TrekPoint {
  name: string;
  altitude: number;
  netGain: number;
  position: [number, number, number];
}

const trekData: TrekPoint[] = [
  { name: 'Phakding', altitude: 2881, netGain: 21, position: [0, 2.881, 0] },
  { name: 'Namche', altitude: 3324, netGain: 464, position: [15, 3.324, 8] },
  { name: 'Tengboche', altitude: 3694, netGain: 834, position: [28, 3.694, 15] },
  { name: 'Dingboche', altitude: 4156, netGain: 1296, position: [38, 4.156, 22] },
  { name: 'Lobuche', altitude: 4725, netGain: 1865, position: [48, 4.725, 30] },
  { name: 'Gorak Shep', altitude: 5058, netGain: 2198, position: [55, 5.058, 38] },
  { name: 'EBC', altitude: 5281, netGain: 2421, position: [60, 5.281, 42] },
  { name: 'Kala Patthar', altitude: 5515, netGain: 2655, position: [62, 5.515, 48] },
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
    scene.fog = new THREE.FogExp2(0xa0b8d0, 0.008);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.5);
    sunLight.position.set(50, 80, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;
    scene.add(sunLight);

    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x4a5563, 0.5);
    scene.add(hemisphereLight);

    const createDetailedTerrain = () => {
      const terrainGroup = new THREE.Group();
      const segments = 150;
      const size = 120;

      const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
      const vertices = geometry.attributes.position.array;

      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const distanceFromCenter = Math.sqrt(x * x + y * y);

        let elevation = 0;
        elevation += Math.sin(x * 0.1) * 3;
        elevation += Math.cos(y * 0.08) * 2.5;
        elevation += Math.sin(x * 0.03 + y * 0.04) * 8;
        elevation += Math.sin(distanceFromCenter * 0.05) * 10;

        const noise1 = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 2;
        const noise2 = Math.sin(x * 0.5 + y * 0.3) * 0.8;
        elevation += noise1 + noise2;

        const ridgeFactor = Math.abs(Math.sin(x * 0.08)) * 15;
        elevation += ridgeFactor;

        vertices[i + 2] = elevation;
      }

      geometry.computeVertexNormals();

      const createTerrainMaterial = (baseColor: number, roughness: number, metalness: number) => {
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness,
          metalness,
          flatShading: false,
        });
      };

      const forestMaterial = createTerrainMaterial(0x2d5016, 0.95, 0.0);
      const rockMaterial = createTerrainMaterial(0x5a5550, 0.85, 0.1);
      const snowMaterial = createTerrainMaterial(0xf0f4f8, 0.6, 0.15);

      const terrainMesh = new THREE.Mesh(geometry.clone(), forestMaterial);
      terrainMesh.rotation.x = -Math.PI / 2;
      terrainMesh.receiveShadow = true;
      terrainMesh.castShadow = true;
      terrainGroup.add(terrainMesh);

      const rockTerrain = new THREE.Mesh(geometry.clone(), rockMaterial);
      rockTerrain.rotation.x = -Math.PI / 2;
      rockTerrain.position.y = 12;
      rockTerrain.scale.set(0.95, 0.95, 1);
      rockTerrain.receiveShadow = true;
      rockTerrain.castShadow = true;
      terrainGroup.add(rockTerrain);

      const snowTerrain = new THREE.Mesh(geometry.clone(), snowMaterial);
      snowTerrain.rotation.x = -Math.PI / 2;
      snowTerrain.position.y = 25;
      snowTerrain.scale.set(0.8, 0.8, 1.2);
      snowTerrain.receiveShadow = true;
      snowTerrain.castShadow = true;
      terrainGroup.add(snowTerrain);

      for (let i = 0; i < 150; i++) {
        const treeGeometry = new THREE.ConeGeometry(0.3, 2 + Math.random(), 8);
        const tree = new THREE.Mesh(treeGeometry, new THREE.MeshStandardMaterial({
          color: 0x1a4d0f,
          roughness: 0.9
        }));
        tree.position.set(
          (Math.random() - 0.5) * 60,
          0.5 + Math.random() * 2,
          (Math.random() - 0.5) * 60
        );
        tree.castShadow = true;
        terrainGroup.add(tree);
      }

      for (let i = 0; i < 80; i++) {
        const rockGeometry = new THREE.DodecahedronGeometry(0.4 + Math.random() * 0.8, 0);
        const rock = new THREE.Mesh(rockGeometry, new THREE.MeshStandardMaterial({
          color: 0x3a3330,
          roughness: 0.95,
          metalness: 0.05
        }));
        rock.position.set(
          (Math.random() - 0.5) * 70,
          8 + Math.random() * 8,
          (Math.random() - 0.5) * 70
        );
        rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        rock.castShadow = true;
        terrainGroup.add(rock);
      }

      return terrainGroup;
    };

    const terrain = createDetailedTerrain();
    scene.add(terrain);

    const createMountainPeaks = () => {
      const peaksGroup = new THREE.Group();

      for (let i = 0; i < 8; i++) {
        const peakGeometry = new THREE.ConeGeometry(8 + Math.random() * 6, 35 + Math.random() * 25, 6);
        const peakMaterial = new THREE.MeshStandardMaterial({
          color: 0xb8c5d6,
          roughness: 0.8,
          metalness: 0.1,
        });

        const peak = new THREE.Mesh(peakGeometry, peakMaterial);
        const angle = (i / 8) * Math.PI * 2;
        const distance = 70 + Math.random() * 30;

        peak.position.set(
          Math.cos(angle) * distance,
          20 + Math.random() * 10,
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
      const curve = new THREE.CatmullRomCurve3(points);
      const pathPoints = curve.getPoints(200);

      const pathGeometry = new THREE.TubeGeometry(
        curve,
        200,
        0.15,
        8,
        false
      );

      const pathMaterial = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.6,
      });

      const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);

      return { pathMesh, curve, pathPoints };
    };

    const { pathMesh, curve } = createTrekPath();
    scene.add(pathMesh);

    const createClouds = () => {
      const cloudsGroup = new THREE.Group();

      for (let i = 0; i < 30; i++) {
        const cloudGeometry = new THREE.SphereGeometry(3 + Math.random() * 4, 8, 8);
        const cloudMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.6,
          roughness: 1,
        });

        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
          (Math.random() - 0.5) * 150,
          15 + Math.random() * 25,
          (Math.random() - 0.5) * 150
        );
        cloud.scale.set(1 + Math.random(), 0.5 + Math.random() * 0.3, 1 + Math.random());

        cloudsGroup.add(cloud);
      }

      return cloudsGroup;
    };

    const clouds = createClouds();
    scene.add(clouds);

    camera.position.set(0, 60, 80);
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
        if (waypointDisplayTime > 3) {
          animationProgress = 0;
          isShowingWaypoints = false;
          waypointDisplayTime = 0;
          setShowWaypoints(false);
        }
      }

      if (!isShowingWaypoints) {
        const t = Math.min(animationProgress / animationDuration, 1);

        const position = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t);

        const cameraHeight = position.y + 2 + Math.sin(t * Math.PI) * 1.5;
        const cameraDistance = 8 - t * 3;
        const cameraOffset = new THREE.Vector3(
          -tangent.z * cameraDistance,
          cameraHeight,
          tangent.x * cameraDistance
        );

        camera.position.copy(position).add(cameraOffset);
        camera.lookAt(position.x + tangent.x * 5, position.y + 1, position.z + tangent.z * 5);

        const currentPointIndex = Math.min(Math.floor(t * trekData.length), trekData.length - 1);
        setCurrentPoint(currentPointIndex);

        const startAlt = trekData[0].altitude;
        const endAlt = trekData[trekData.length - 1].altitude;
        const interpolatedAlt = Math.floor(startAlt + (endAlt - startAlt) * t);
        setCurrentAltitude(interpolatedAlt);

        const phaseProgress = t * 6;
        if (phaseProgress < 1) {
          scene.fog = new THREE.FogExp2(0xa8d5f2, 0.01);
          scene.background = new THREE.Color(0x87ceeb);
        } else if (phaseProgress < 2) {
          scene.fog = new THREE.FogExp2(0xa0b8d0, 0.012);
          scene.background = new THREE.Color(0x7ab8d9);
        } else if (phaseProgress < 3) {
          scene.fog = new THREE.FogExp2(0x8fa3bc, 0.015);
          scene.background = new THREE.Color(0x6a9ec7);
        } else if (phaseProgress < 4) {
          scene.fog = new THREE.FogExp2(0x7a8a9a, 0.018);
          scene.background = new THREE.Color(0x5a7a9a);
        } else if (phaseProgress < 5) {
          scene.fog = new THREE.FogExp2(0xc8ddf0, 0.02);
          scene.background = new THREE.Color(0x4a7c9e);
        } else {
          scene.fog = new THREE.FogExp2(0xffa07a, 0.008);
          scene.background = new THREE.Color(0xff8c42);
        }
      } else {
        const orbitRadius = 70;
        const orbitSpeed = waypointDisplayTime * 0.5;
        camera.position.set(
          Math.cos(orbitSpeed) * orbitRadius,
          50 + Math.sin(waypointDisplayTime * 2) * 5,
          Math.sin(orbitSpeed) * orbitRadius
        );
        camera.lookAt(30, 15, 25);
      }

      clouds.rotation.y += 0.0003;
      clouds.children.forEach((cloud, index) => {
        cloud.position.x += Math.sin(animationProgress * 0.1 + index) * 0.01;
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
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 border border-slate-700 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Trek Waypoints</h2>
            <div className="grid grid-cols-2 gap-4">
              {trekData.map((point, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50"
                >
                  <p className="text-lg font-bold text-white mb-1">{point.name}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Altitude:</span>
                    <span className="text-white font-semibold">{point.altitude}m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Gain:</span>
                    <span className="text-yellow-400 font-semibold">+{point.netGain}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
