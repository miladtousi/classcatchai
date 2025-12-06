import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function CharacterModel({ isWaving = false }: { isWaving?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/fox-avatar.glb");
  const { actions, names } = useAnimations(animations, group);
  
  useEffect(() => {
    // Play the first animation if available
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      
      // Subtle rotation
      if (isWaving) {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.15;
      } else {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }
    }
  });

  return (
    <group ref={group} position={[0, -0.6, 0]} scale={0.014}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#E86D4A" />
    </mesh>
  );
}

interface FoxAvatarProps {
  isWaving?: boolean;
  className?: string;
}

export function FoxAvatar({ isWaving = false, className = "" }: FoxAvatarProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.3, 3.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#FDF8F4"]} />
        <fog attach="fog" args={["#FDF8F4", 6, 18]} />
        
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#FFC857" />
        
        <Suspense fallback={<LoadingFallback />}>
          <CharacterModel isWaving={isWaving} />
          <ContactShadows
            position={[0, -0.85, 0]} 
            opacity={0.5} 
            scale={5} 
            blur={2.5} 
            far={4}
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/fox-avatar.glb");
