import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree} from '@react-three/fiber';
import { MeshReflectorMaterial, OrbitControls, Reflector, RoundedBox, Text, meshBounds } from '@react-three/drei';
import * as THREE from 'three';

extend({GridHelper: THREE.GridHelper});

const Icon = ({ position, color, textureUrl, isHovered, onPointerOver, onPointerOut }:any) => {
    const { gl } = useThree();
    const texture = useLoader(THREE.TextureLoader, textureUrl);

  return (
    <mesh 
      position={position} 
      scale={isHovered ? 1.5 : 1}
      onPointerOver={(e)=>{
        onPointerOver(e);
        gl.domElement.style.cursor = 'pointer';
      }}
      onPointerOut={(e)=>{
        onPointerOut(e);
        gl.domElement.style.cursor = 'default';
      }}
    >
      <circleGeometry args={[0.35, 32]} />
      <meshBasicMaterial color={color} map={texture as any}/>
    </mesh>
  );
};

const HowContact = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const fontSize = 0.35;

  const handlePointerOver = (index: number) => {
    setHoveredIndex(index);
  };
  const handlePointerOut = () => {
    setHoveredIndex(null);
  };

  return (
    <group position={[0, -1.5, 0.3]}>
      <Text position={[-5, 1.3, 0]} fontSize={fontSize} color="#fff" anchorX="left" anchorY="middle">
        Phone
      </Text>
      <Text position={[-3.7, 1.3, 0]} fontSize={fontSize} color="#fff" anchorX="left" anchorY="middle">
        010 - 9857 - 2619
      </Text>
      <Text position={[-5, 0.4, 0]} fontSize={fontSize} color="#fff" anchorX="left" anchorY="middle">
        E-mail
      </Text>
      <Text position={[-3.7, 0.4, 0]} fontSize={fontSize} color="#fff" anchorX="left" anchorY="middle">
        gksqls0507@gmail.com
      </Text>
      <group position={[0, 0, 0]}>
        <Icon 
          position={[-4.78, -1, 0]} 
          color="#ffca28" 
          textureUrl={'/images/openkakaoIcon.png'}
          isHovered={hoveredIndex === 0}
          onPointerOver={()=>handlePointerOver(0)}
          onPointerOut={handlePointerOut}
        />
        <Icon 
          position={[-3.78, -1, 0]} 
          color="#fff" 
          textureUrl={'/images/githubIcon.png'}
          isHovered={hoveredIndex === 1}
          onPointerOver={()=>handlePointerOver(1)}
          onPointerOut={handlePointerOut}
        />
        <Icon 
          position={[-2.78, -1, 0]} 
          color="#fff" 
          textureUrl={'/images/notionIcon.png'}
          isHovered={hoveredIndex === 2}
          onPointerOver={()=>handlePointerOver(2)}
          onPointerOut={handlePointerOut}
        />
        <Icon 
          position={[-1.78, -1, 0]} 
          color="#ffffff" 
          textureUrl={'/images/gmailIcon.png'}
          isHovered={hoveredIndex === 3}
          onPointerOver={()=>handlePointerOver(3)}
          onPointerOut={handlePointerOut}
        />
      </group>
    </group>
  );
}



const Card = () => {
  const cardRef = useRef<THREE.Group>(null);

  return (
    <group ref={cardRef} position={[0, 1.2, 0]}>
      <RoundedBox args={[14, 7.5, 0.1]} radius={0.3} smoothness={6} position={[0, 0, 0]}>
        <MeshReflectorMaterial
          color="#242424"
          roughness={0.1}
          metalness={1}
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          mixContrast={1}
          depthScale={1}
          minDepthThreshold={0.85}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          reflectorOffset={0.02}
          mirror={0.5}
        />
      </RoundedBox>
      <Text position={[-5, 2.5, 0.3]} fontSize={0.5} maxWidth={10} color="white" anchorX="left" anchorY="middle">
        김한빈
      </Text>
      <Text position={[-5, 1.5, 0.3]} fontSize={0.38} maxWidth={10} color="white" anchorX="left" anchorY="middle">
        Frontend Developer
      </Text>
      <HowContact />
      <Reflector
        resolution={1024}
        args={[14, 0.5]}
        mirror={0}
        blur={[200, 500]}
        mixBlur={0.6}
        mixStrength={0.5}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -4.5, 0]}
      />
    </group>
  );
};

const Card3D = () => {

  const controlRef = useRef<any>(null);
 
  const handleEndDrag = useCallback(async() => {
    if (controlRef.current) {

      controlRef.current.reset(); // 카메라 상태를 초기화

      // controlRef.current.object.rotation.set(0, 0, 0);
      // controlRef.current.target.set(0, 0, 0);
      // controlRef.current.object.position.set(0, 0, 8.5);
      controlRef.current.update();

    }
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 8.5]}} color={'#fff'}>
      <ambientLight intensity={1.0} />
      <pointLight intensity={8.5} position={[-35, 5, 10]} />
      <directionalLight intensity={1.0} position={[5, 5, 5]} />
      <Card/>
      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        onEnd={handleEndDrag}
        // enableDamping={false}
      />
    </Canvas>
  );
};

export default Card3D;