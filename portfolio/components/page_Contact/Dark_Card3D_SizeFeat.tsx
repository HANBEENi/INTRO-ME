import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree} from '@react-three/fiber';
import { MeshReflectorMaterial, OrbitControls, RoundedBox, Text } from '@react-three/drei';
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
    <group position={[-0.5, -1.35, 0]}>
      <Text position={[-5, 1.2, 0.3]} fontSize={fontSize} fontWeight={600} letterSpacing={0.05} color="#000" anchorX="left" anchorY="middle">
        Phone
      </Text>
      <Text position={[-3.6, 1.2, 0.3]} fontSize={fontSize} fontWeight={300} letterSpacing={0.05} color="#000" anchorX="left" anchorY="middle">
        010 - 0000 - 0000
      </Text>
      <Text position={[-5, 0.4, 0.3]} fontSize={fontSize} fontWeight={600} letterSpacing={0.05} color="#000" anchorX="left" anchorY="middle">
        E-mail
      </Text>
      <Text position={[-3.6, 0.4, 0.3]} fontSize={fontSize} fontWeight={300} letterSpacing={0.05} color="#000" anchorX="left" anchorY="middle">
        email@email.com
      </Text>
      <group position={[0, 0.1, 0.15]}>
        <Icon 
          position={[-4.78, -1, 0]} 
          color="#b7ff44" 
          textureUrl={'/images/emailIcon.png'}
          isHovered={hoveredIndex === 0}
          onPointerOver={()=>handlePointerOver(0)}
          onPointerOut={handlePointerOut}
        />
        <Icon 
          position={[-3.68, -1, 0]} 
          color="#ffffff" 
          textureUrl={'/images/githubIcon1.png'}
          isHovered={hoveredIndex === 1}
          onPointerOver={()=>handlePointerOver(1)}
          onPointerOut={handlePointerOut}
        />
        <Icon 
          position={[-2.58, -1, 0]} 
          color="#8b8b8b" 
          textureUrl={'/images/notionIcon.png'}
          isHovered={hoveredIndex === 2}
          onPointerOver={()=>handlePointerOver(2)}
          onPointerOut={handlePointerOut}
        />
        <Icon 
          position={[-1.48, -1, 0]} 
          color="#ffca28" 
          textureUrl={'/images/openkakaoIcon.png'}
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

  const [rotationActive, setRotationActive] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  // 초기 회전값
  useLayoutEffect(() => {
    if (cardRef.current) {
      cardRef.current.rotation.set(-Math.PI/2, 0, 0);
    }
  }, []);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);

    // 회전 진행
    setTimeout(() => {
      if (rotationActive && cardRef.current) {
        if (time <= 0.7){
          cardRef.current.rotation.y -= delta * 1.8; // Y축을 기준으로 회전
        }
        if (time>0.7 && time<1){
          cardRef.current.rotation.y -= delta * 0.05; // Y축을 기준으로 회전
        }
        if (time>=1 && time<1.4){
          cardRef.current.rotation.y -= delta * 0.05; // Y축을 기준으로 회전
          cardRef.current.rotation.x += delta * 1; // X축을 기준으로 회전
        }
        if (time >= 1.4){
          setRotationActive(true);
          cardRef.current.rotation.x += delta * 1; // X축을 기준으로 회전
          cardRef.current.rotation.y += (delta) * 1.5;
        }
        if (time >= 2){
          setRotationActive(false);
        }
      }
    },1000);
    // 회전 끝나고 제자리 위치
    if(!rotationActive && cardRef.current){
      cardRef.current.rotation.set(0, 0, 0);
    }
  });

  return (
    <group ref={cardRef} position={[0, 0, 0]}>
      <RoundedBox 
        args={[13.5, 7.5, 0.2]} 
        radius={0.2} 
        smoothness={4} 
        position={[0, 0, 0]}
      >
        <MeshReflectorMaterial
          color="#fff"
          roughness={0.2}
          metalness={0.5}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          mixContrast={1}
          depthScale={1}
          minDepthThreshold={0.85}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          reflectorOffset={0.02}
          mirror={0.8}
        />
      </RoundedBox>
      <Text position={[-5.5, 2.3, 0.3]} fontSize={0.5} letterSpacing={0.05} fontWeight={500} maxWidth={10} color="#000" anchorX="left" anchorY="middle">
        Name
      </Text>
      <Text position={[-5.5, 1.5, 0.3]} fontSize={0.38} letterSpacing={0.05} fontWeight={600} maxWidth={10} color="#000" anchorX="left" anchorY="middle">
        Frontend Developer
      </Text>
      <HowContact />
      <mesh position={[0, -4.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 0.5]}/>
        <meshBasicMaterial
          color="#fff"
          opacity={0.15}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

const Dark_Card3D = () => {

  const controlRef = useRef<any>(null);
 
  const handleEndDrag = useCallback(async() => {
    if (controlRef.current) {

      controlRef.current.reset(); // 카메라 상태를 초기화
    }
  }, []);

  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 11.5]}} color={'#fff'}>
      <ambientLight intensity={8} />
      <directionalLight intensity={15.0} position={[-5, 3, 4.5]} />
      <directionalLight intensity={15.0} position={[-5, -3, 4.5]} />
      <Card/>
      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        onEnd={handleEndDrag}
        enableDamping={false}
        maxPolarAngle={Math.PI} // 수직 회전의 최대 각도 제한
        minPolarAngle={0} // 수직 회전의 최소 각도 제한
        maxAzimuthAngle={Math.PI / 3} // 수평 회전의 최대 각도 제한
        minAzimuthAngle={-Math.PI / 3} // 수평 회전의 최소 각도 제한
      />
    </Canvas>
  );
};

export default Dark_Card3D;