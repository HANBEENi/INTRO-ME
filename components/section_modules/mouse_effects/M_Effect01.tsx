
/**
 * 마우스 이펙트 적용하기
 * 
 * Three.js를 이용하여 그래픽 선형 마우스 이펙트 생성하기
 * 반응형에 따라 마우스 이펙트 크기 및 위치 조정 필요함
 */

// 컬러셋 고민
/**
 * firstColor, lastColor
 * [1] #000, #000
 * [2] #00ffc3, #008969
 * [3] #555555, #000
 */

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const M_Effect01: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef(new THREE.Vector3());
  const prevMousePosition = useRef(new THREE.Vector3());
  
  const firstColor = '#555555';
  const lastColor = '#000';

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(13, window.innerWidth / window.innerHeight, 0.5, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current!.appendChild(renderer.domElement);

    const particleMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(firstColor), transparent: true });
    const particleGeometry = new THREE.PlaneGeometry(0.05, 0.001);
    const particles: THREE.Mesh[] = [];

    const addParticle = (x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      mesh.position.set(x, y, z);
      particles.push(mesh);
      scene.add(mesh);
    };

    // Line을 그리기 위한 Material과 Geometry를 설정합니다.
    const material = new THREE.LineBasicMaterial({ color: lastColor });
    const points = [];
    for (let i = 0; i < 100; i++) {
      points.push(new THREE.Vector3());
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    const onMouseMove = (event: MouseEvent) => {

      prevMousePosition.current.copy(mousePosition.current);

      // 마우스 스크린 좌표를 3D 공간 좌표로 변환
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // 마우스 위치를 3D 공간으로 변환
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      addParticle(pos.x, pos.y, pos.z);
      mousePosition.current.copy(vector);

      // 새 위치 계산
      const newPos = camera.position.clone().add(dir.multiplyScalar(distance));

      // 이전 위치와 새 위치 사이에 선 추가
      const pointsBetween = 30; //추가 할 선 수
      for (let i = 1; i <= pointsBetween; i++){
        const factor = i / pointsBetween;
        const x = prevMousePosition.current.x + (newPos.x - prevMousePosition.current.x) * factor;
        const y = prevMousePosition.current.y + (newPos.y - prevMousePosition.current.y) * factor;
        const z = prevMousePosition.current.z + (newPos.z - prevMousePosition.current.z) * factor;
        addParticle(x, y, z);
      }
      prevMousePosition.current.copy(newPos);
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particles.forEach((particle, i) => {
        (particle.material as THREE.MeshBasicMaterial).opacity *= 0.96;
        particle.scale?.multiplyScalar(1.05);

        // 회전 업데이트
        particle.rotation.x += 0.02;
        particle.rotation.y += 0.01;

        if ((particle.material as THREE.MeshBasicMaterial).opacity < 0.01) {
          scene.remove(particle);
          particles.splice(i, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      particles.forEach(particle => scene.remove(particle));
      if(mountRef.current){
        mountRef.current!.removeChild(renderer.domElement);
      }
    };
  }, []);

  

  return <Layout ref={mountRef}/>;
};

export default M_Effect01;

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;