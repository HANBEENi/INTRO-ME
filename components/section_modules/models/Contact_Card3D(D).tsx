import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { initial } from "lodash";

extend({ GridHelper: THREE.GridHelper });

const Icon = ({
  position,
  color,
  textureUrl,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick,
  label,
}: any) => {
  const { gl } = useThree();
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  return (
    <group>
      <mesh
        position={position}
        scale={isHovered ? 1.5 : 1}
        onPointerOver={(e) => {
          onPointerOver(e);
          gl.domElement.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          onPointerOut(e);
          gl.domElement.style.cursor = "default";
        }}
        onClick={onClick}
      >
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color={color} map={texture as any} />
      </mesh>
      {isHovered && (
        <Text
          position={[position[0] - 0.45, position[1] - 0.9, position[2]]}
          fontSize={0.25}
          fontWeight={500}
          letterSpacing={0.05}
          color="#000"
          anchorX="left"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const HowContact = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const fontSize = 0.35;

  const handlePointerOver = (index: number, label: string) => {
    setHoveredIndex(index);
  };
  const handlePointerOut = () => {
    setHoveredIndex(null);
  };

  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };
  const handleOpenEmailForm = () => {
    const recipient = "been.iruda@gmail.com"; // 받는 사람 이메일 주소
    const subject = "문의 사항"; // 이메일 제목
    const body = "여기에 내용을 입력하세요."; // 이메일 본문 내용

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <group position={[-0.5, -1.35, 0]}>
      <Text
        position={[-5, 1.2, 0.3]}
        fontSize={fontSize}
        fontWeight={600}
        letterSpacing={0.05}
        color="#000"
        anchorX="left"
        anchorY="middle"
      >
        Phone
      </Text>
      <Text
        position={[-3.6, 1.2, 0.3]}
        fontSize={fontSize}
        fontWeight={300}
        letterSpacing={0.05}
        color="#000"
        anchorX="left"
        anchorY="middle"
      >
        010 - 9857 - 2619
      </Text>
      <Text
        position={[-5, 0.4, 0.3]}
        fontSize={fontSize}
        fontWeight={600}
        letterSpacing={0.05}
        color="#000"
        anchorX="left"
        anchorY="middle"
      >
        E-mail
      </Text>
      <Text
        position={[-3.6, 0.4, 0.3]}
        fontSize={fontSize}
        fontWeight={300}
        letterSpacing={0.05}
        color="#000"
        anchorX="left"
        anchorY="middle"
      >
        been.iruda@gmail.com
      </Text>
      <group position={[0, 0.1, 0.15]}>
        <Icon
          position={[-4.78, -1, 0]}
          color="#b7ff44"
          textureUrl={"/images/emailIcon.png"}
          isHovered={hoveredIndex === 0}
          onPointerOver={() => handlePointerOver(0, "E-mail")}
          onPointerOut={handlePointerOut}
          onClick={handleOpenEmailForm}
          label="메일 보내기"
        />
        <Icon
          position={[-3.68, -1, 0]}
          color="#ffffff"
          textureUrl={"/images/githubIcon1.png"}
          isHovered={hoveredIndex === 1}
          onPointerOver={() => handlePointerOver(1, "GitHub")}
          onPointerOut={handlePointerOut}
          onClick={() => handleIconClick("https://github.com/HANBEENi")}
          label="깃헙 링크"
        />
        <Icon
          position={[-2.58, -1, 0]}
          color="#8b8b8b"
          textureUrl={"/images/notionIcon.png"}
          isHovered={hoveredIndex === 2}
          onPointerOver={() => handlePointerOver(2, "Notion")}
          onPointerOut={handlePointerOut}
          onClick={() =>
            handleIconClick(
              "https://www.notion.so/51d4c45165fc46b880a046c345df9fd5?pvs=4"
            )
          }
          label="노션 링크"
        />
        <Icon
          position={[-1.48, -1, 0]}
          color="#ffca28"
          textureUrl={"/images/openkakaoIcon.png"}
          isHovered={hoveredIndex === 3}
          onPointerOver={() => handlePointerOver(3, "OpenKakao")}
          onPointerOut={handlePointerOut}
          onClick={() => handleIconClick("https://open.kakao.com/me/beeniruda")}
          label="오픈카카오 바로가기"
        />
      </group>
    </group>
  );
};

const Card = ({ isAction }: any) => {
  const cardRef = useRef<THREE.Group>(null);

  const [rotationActive, setRotationActive] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  // 초기 회전값
  useLayoutEffect(() => {
    if (cardRef.current) {
      cardRef.current.rotation.set(-Math.PI / 2, 0, 0);
    }
  }, []);

  useEffect(() => {
    if (isAction) {
      setRotationActive(true);
      setTime(0);
      if (cardRef.current) {
        cardRef.current.rotation.set(-Math.PI / 2, 0, 0); // 원하는 초기 회전값 설정
      }
    }
  }, [isAction]);

  useFrame((state, delta) => {
    if (!rotationActive) return;
    setTime((prev) => prev + delta);

    // 회전 진행
    setTimeout(() => {
      if (rotationActive && cardRef.current) {
        if (time <= 0.7) {
          cardRef.current.rotation.y -= delta * 1.8; // Y축을 기준으로 회전
        }
        if (time > 0.7 && time < 1) {
          cardRef.current.rotation.y -= delta * 0.05; // Y축을 기준으로 회전
        }
        if (time >= 1 && time < 1.4) {
          cardRef.current.rotation.y -= delta * 0.05; // Y축을 기준으로 회전
          cardRef.current.rotation.x += delta * 1; // X축을 기준으로 회전
        }
        if (time >= 1.4) {
          setRotationActive(true);
          cardRef.current.rotation.x += delta * 1; // X축을 기준으로 회전
          cardRef.current.rotation.y += delta * 1.5;
        }
        if (time >= 2) {
          setRotationActive(false);
          cardRef.current.rotation.set(0, 0, 0);
        }
      }
    }, 1000);
    // 회전 끝나고 제자리 위치
    if (!rotationActive && cardRef.current) {
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
      <Text
        position={[-5.5, 2.3, 0.3]}
        fontSize={0.5}
        letterSpacing={0.05}
        fontWeight={500}
        maxWidth={10}
        color="#000"
        anchorX="left"
        anchorY="middle"
      >
        Kim HanBeen
      </Text>
      <Text
        position={[-5.5, 1.5, 0.3]}
        fontSize={0.38}
        letterSpacing={0.05}
        fontWeight={600}
        maxWidth={10}
        color="#000"
        anchorX="left"
        anchorY="middle"
      >
        Frontend Developer
      </Text>
      <HowContact />
      {/* <mesh position={[0, -4.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 0.5]}/>
        <meshBasicMaterial
          color="#fff"
          opacity={0.1}
          transparent={true}
        />
      </mesh> */}
    </group>
  );
};

const Dark_Card3D = ({ isAction }: any) => {
  const controlRef = useRef<any>(null);
  const [isHandleEnd, setIsHandleEnd] = useState<boolean>(false);
  const preCameraPosition = useRef<[number, number, number]>([0, 0, 0]);

  const handleEndDrag = useCallback(
    async (cameraPosition: [number, number, number]) => {
      if (controlRef.current) {
        setIsHandleEnd(true);
        // controlRef.current.reset(); // 카메라 상태를 초기화
        controlRef.current.object.position.set(...cameraPosition); // 카메라 위치 설정
        controlRef.current.update(); // 카메라 업데이트
      }
    },
    []
  );

  // 화면 크기에 따른 카메라 거리 설정
  const CameraController = () => {
    const { camera, size } = useThree();

    useEffect(() => {
      const aspect = size.width / size.height;
      const distance = aspect > 1 ? 11.5 : 11.5 * (1 / aspect);
      camera.position.set(0, 0, distance);
      setIsHandleEnd(false);
      const cameraPosition: [number, number, number] = [0, 0, distance];
      preCameraPosition.current = cameraPosition; // 초기 카메라 위치 저장
      handleEndDrag(cameraPosition);
    }, [size, camera, isHandleEnd]);

    return null;
  };

  return (
    // <Canvas camera={{ fov: 50, position: getCameraPosition() }} color={'#fff'}>
    <Canvas>
      <CameraController />
      <ambientLight intensity={8} />
      <directionalLight intensity={15.0} position={[-5, 3, 4.5]} />
      <directionalLight intensity={15.0} position={[-5, -3, 4.5]} />
      <Card isAction={isAction} />
      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        onEnd={() => handleEndDrag(preCameraPosition.current)}
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
