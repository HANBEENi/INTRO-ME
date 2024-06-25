import React, { useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

function ThreeDText() {
  const { scene } = useGLTF('/models/title3d.glb');
  const texture = new THREE.TextureLoader().load('/images/smoke14.png');
  const ref = useRef<THREE.Object3D>();

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
          if ((material as THREE.MeshStandardMaterial).map !== undefined) {
            (material as THREE.MeshStandardMaterial).map = texture;
            material.needsUpdate = true;
          }
        });
      } else {
        if ((mesh.material as THREE.MeshStandardMaterial).map !== undefined) {
          (mesh.material as THREE.MeshStandardMaterial).map = texture;
          (mesh.material as THREE.MeshStandardMaterial).needsUpdate = true;
        }
      }
    }
  });
  
  return <primitive ref={ref} object={scene} position={[0,-0.05,0]}/>;
}

export default function Scene() {

    const controlRef = useRef<any>(null);

    const handleEndDrag = useCallback(async() => {
        if (controlRef.current) {
            controlRef.current.reset(); // 카메라 상태를 초기화
            setTimeout(()=>{
                controlRef.current.reset();
            }, 500);
        }
    }, []);

    return (
        <Layout>
            <Canvas camera={{fov: 0.19, position: [0, 0, 30]}}>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[1, 10, 1]}/>
            <OrbitControls 
                ref={controlRef}
                enableZoom={false}
                onEnd={handleEndDrag}
                maxPolarAngle={Math.PI / 2.1} // 수직 회전의 최대 각도 제한
                minPolarAngle={Math.PI / 2.9} // 수직 회전의 최소 각도 제한
                maxAzimuthAngle={0.2} // 수평 회전의 최대 각도 제한
                minAzimuthAngle={-0.2} // 수평 회전의 최소 각도 제한
            />
            <ThreeDText />
            </Canvas>
        </Layout>
    );
}

const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 1005;
`;