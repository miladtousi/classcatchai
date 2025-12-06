import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function FoxModel({ isWaving = false }: { isWaving?: boolean }) {
  const { scene } = useGLTF("/models/fox-avatar.glb");
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Subtle rotation when waving
      if (isWaving) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        // Slow idle rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFC857" />
        
        <Suspense fallback={<LoadingFallback />}>
          <FoxModel isWaving={isWaving} />
          <Environment preset="sunset" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4}
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/fox-avatar.glb");
