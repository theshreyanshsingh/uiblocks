"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import texture from "@/app/(helpers)/list_assets/world.jpg";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";

const EarthGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountNode = mountRef.current;
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000015);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountNode.clientWidth / mountNode.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    mountNode.appendChild(renderer.domElement);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(texture.src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    });

    // Create Earth with proper material settings
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 10,
      specular: new THREE.Color(0x333333),
      combine: THREE.MultiplyOperation,
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Balanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 3, 5);
    scene.add(mainLight);

    // Subtle fill light from the opposite side
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, -3, -5);
    scene.add(fillLight);

    // Improved atmosphere effect
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 0.15) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Enhanced starfield with custom shader for twinkling
    const starGeometry = new THREE.BufferGeometry();
    const starVertices: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position; // Pass position to fragment shader
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 2.0;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vPosition; // Receive position from vertex shader
        void main() {
          float twinkle = sin(uTime + vPosition.x * 100.0) * 0.5 + 0.5; // Use vPosition instead of position
          gl_FragColor = vec4(1.0, 1.0, 1.0, twinkle * 1.0); // Increased opacity for more glow
        }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Post-processing for glow effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Bloom pass for Earth (increased glow)
    const earthBloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // Increased strength for more glow
      0.4, // Increased radius for broader glow
      0.4 // Lower threshold for more sensitivity
    );
    composer.addPass(earthBloomPass);

    // Bloom pass for stars (increased glow)

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      starMaterial.uniforms.uTime.value = time; // Update star twinkling

      earth.rotation.y += 0.001;
      atmosphere.rotation.y += 0.001;
      composer.render();
    };

    // Handle window resizing
    const handleResize = () => {
      const width = mountNode!.clientWidth;
      const height = mountNode!.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    // Handle mouse wheel for zoom
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      camera.position.z += event.deltaY * 0.05;
      camera.position.z = Math.max(5, Math.min(50, camera.position.z)); // Limit zoom range
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleWheel, { passive: false });
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

const MainEarthGlobe: React.FC = () => {
  return (
    <div className="w-full h-1/2 overflow-hidden rounded-xl">
      <EarthGlobe />
    </div>
  );
};

export default MainEarthGlobe;
